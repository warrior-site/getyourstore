import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import {clerkMiddleware} from "@clerk/express"
import {clerkWebhookHandler} from "./webhooks/clerk.js"
import keepAlive from "./lib/cron.js"
import meRouter from "./routes/meRouter.js"
import productRouter from "./routes/productRouter.js"
import chekoutRouter from "./routes/checkoutRouter.js";
import { polarWebhookHandler } from "./webhooks/polar.js";
import * as Sentry from "@sentry/node";
import { sentryClerkUserMiddleware } from "./middleware/sentryClerkUser.js";
import adminRouter from "./routes/adminRouter.js";
import orderRouter from "./routes/orderRouter.js";

import fs from "node:fs";
import path from "node:path";
import streamRouter from "./routes/streamRouter.js"


dotenv.config()
const app = express()


const rawJson = express.raw({type:"application/json",limit:"1mb"})

app.post("/webhook/clerk",rawJson,(req,res)=>{
    void clerkWebhookHandler(req,res);
})
app.post("/webhooks/polar", rawJson, (req, res) => {
  void polarWebhookHandler(req, res);
});

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())
app.use(sentryClerkUserMiddleware);


app.use("/api/me", meRouter)
app.use("/api/products", productRouter)
app.use("/api/stream", streamRouter)
app.use("/api/checkout", chekoutRouter);
app.use("/api/admin", adminRouter);
app.use("/api/orders", orderRouter);


app.get("/health",(_req,res)=>{
    res.status(200).send("OK");
})

const publicDir = path.join(process.cwd(), "public");
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*any}", (req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      next();
      return;
    }

    if (req.path.startsWith("/api") || req.path.startsWith("/webhooks")) {
      next();
      return;
    }

    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}


Sentry.setupExpressErrorHandler(app);

app.use(
  (_err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const sentryId = (res as express.Response & { sentry?: string }).sentry;

    res.status(500).json({
      error: "Internal server error",
      ...(sentryId !== undefined && { sentryId }),
    });
  },
);


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
    if(process.env.NODE_ENV === "production") keepAlive.start();
})