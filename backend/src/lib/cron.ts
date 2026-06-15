import { CronJob } from "cron";
import http from "node:http";
import https from "node:https";

console.log("Cron file loaded");

const job = new CronJob("*/10 * * * *", function () {
  console.log("Cron triggered");

  const base = process.env.FRONTEND_URL;

  if (!base) {
    console.log("No FRONTEND_URL found");
    return;
  }

  const url = new URL("/health", base).href;
  console.log("Requesting:", url);

  const client = url.startsWith("https:") ? https : http;

  client
    .get(url, (res) => {
      console.log("Response status:", res.statusCode);
    })
    .on("error", (e) => console.error("Error:", e));
});

export default job;