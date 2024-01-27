import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";

import { randomImageUrl } from "@/utils";

const app = new Hono();

app.use("/docs/*", serveStatic({ root: "./" }));
app.use("/static/*", serveStatic({ root: "./" }));

// Mount Builtin Middleware
app.use("*", poweredBy());
app.use("*", logger());

// Add X-Response-Time header
app.use("*", async (c, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  c.header("X-Response-Time", `${ms}ms`);
});

// Custom Not Found Message
app.notFound((c) => {
  return c.text("404 Not Found", 404);
});

// Error handling
app.onError((err, c) => {
  console.error(`${err}`);
  return c.text("Error Message", 500);
});

// Define routes
app.get("/", async (c) => {
  // Here, you would return your HTML content
  return c.html("<h1>Welcome to the Random Image Generator</h1>");
});

app.get("/random-image", (c) => {
  const result = randomImageUrl();
  return c.redirect(result.url);
});

app.get("/random-image-url", (c) => {
  const result = randomImageUrl();
  return c.json(result);
});

export default app;
