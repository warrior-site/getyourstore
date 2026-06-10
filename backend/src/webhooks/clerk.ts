import type { Request, Response } from "express"
import dotenv from "dotenv"
import { verifyWebhook } from "@clerk/backend/webhooks"
import { parseRole } from "../lib/roles.js";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";
dotenv.config()

export async function clerkWebhookHandler(req: Request, res: Response) {

    try {
        if (!process.env.CLERK_WEBHOOK_SECRET) {
            return res.status(500).json({ error: "Missing webhook secret" })
        }

        const payLoad = req.body instanceof Buffer ? req.body.toString("utf8") : req.body

        const request = new Request("https://internal/webhooks/clerk", {
            method: "post",
            headers: new Headers(req.headers as HeadersInit),
            body: payLoad
        });

        const evt = await verifyWebhook(request, { signingSecret: process.env.CLERK_WEBHOOK_SECRET })

        if (evt.type === "user.created" || evt.type === "user.updated") {
            const u = evt.data

            const email =
                u.email_addresses?.find((e) => e.id === u.primary_email_address_id)?.email_address ??
                u.email_addresses?.[0]?.email_address ??
                "";

            const displayName =
                [u.first_name, u.last_name].filter(Boolean).join(" ") || u.username || "Unknown";

            const role = parseRole(u.public_metadata?.role);

            await db
                .insert(users)
                .values({
                    clerkUserId: u.id,
                    email,
                    displayName,
                    role,
                })
                .onConflictDoUpdate({
                    target: users.clerkUserId,
                    set: { email, displayName, role, updatedAt: new Date() },
                });
        }
        if (evt.type === "user.deleted") {
            const id = evt.data.id;
            if (id) {
                await db.delete(users).where(eq(users.clerkUserId, id));
            }
        }

        res.json({ ok: true });

    } catch (error) {

        // Bad signature, malformed payload, or DB error — do not leak details to the client.
    console.error("Clerk webhook error", error);
    res.status(400).json({ error: "Invalid webhook" });
    }
}