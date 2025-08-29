import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import dotenv from "dotenv";

import { connectDB } from "../lib/db.js";
import authRoutes from "../routes/auth.js";
import productRoutes from "../routes/product.js";
import userRoutes from "../routes/user.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "E-commerce API running 🚀" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);

// Wrap Express for Vercel
const handler = async (req, res) => {
  await connectDB();
  return serverless(app)(req, res);
};

export default handler;
