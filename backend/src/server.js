import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import testRoute from "./routes/test.route.js";
import productRoute from "./routes/product.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
const frontendDistPath = path.resolve(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
);
app.use(express.static(frontendDistPath));

// API routes
app.use("/api/test", testRoute);
app.use("/api/product", productRoute);

// For any other request that doesn't match API, serve the index.html file
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
