import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = Number(process.env.PORT || 4000);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

app.disable("x-powered-by");
app.get("/api/health", (_request, response) => response.json({ ok: true }));
app.use(express.static(dist, { index: false, maxAge: "1h" }));
app.get("*path", (_request, response) =>
  response.sendFile(path.join(dist, "index.html")),
);

app.listen(port, "0.0.0.0", () => {
  console.log(`Invitation draft available on port ${port}`);
});
