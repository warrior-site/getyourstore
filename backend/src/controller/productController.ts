import type { Request, Response, NextFunction } from "express";
import { db } from "../db/index.js";
import { products } from "../db/schema.js";
import { and, desc, eq } from "drizzle-orm";
import { getLocalUser } from "../lib/user.js";

export async function listProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const cat = typeof req.query.category === "string" ? req.query.category.trim() : "";

    const activeOnly = eq(products.active, true);
    const whereClause = cat ? and(activeOnly, eq(products.category, cat)) : activeOnly;

    let rows = await db
      .select()
      .from(products)
      .where(whereClause)
      .orderBy(desc(products.createdAt));
    // cast req to any to satisfy getLocalUser parameter typing
    const user = getLocalUser(req as any);
    if ((await user).role !== "retailer") {
      // remove retailer-only price from each product before sending
      rows = rows.map((r) => {
        const copy: any = { ...r };
        delete copy.priceCents_retailer;
        return copy;
      });
    }

    res.json({ products: rows });
  } catch (e) {
    next(e);
  }
}

export async function getCategories(_req: Request, res: Response, next: NextFunction) {
  try {
    const rows = await db
      .select({ category: products.category })
      .from(products)
      .where(eq(products.active, true));

    const categories = [...new Set(rows.map((r) => r.category))].sort((a, b) => a.localeCompare(b));

    res.json({ categories });
  } catch (e) {
    next(e);
  }
}

export async function getProductBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const [row] = await db
      .select()
      .from(products)
      .where(eq(products.slug, req.params.slug as string))
      .limit(1);

    if (!row || !row.active) return res.status(404).json({ error: "Not found" });

    // 🔐 Check user role and filter retailer price if not a retailer
    const user = getLocalUser(req as any);
    if ((await user).role !== "retailer") {
      const copy: any = { ...row };
      delete copy.priceCents_retailer;
      return res.json({ product: copy });
    }

    res.json({ product: row });
  } catch (e) {
    next(e);
  }
}