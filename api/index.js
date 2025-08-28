import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "../routes/auth.js";
import productRoutes from "../routes/product.js";
import userRoutes from "../routes/user.js";


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "E-commerce API is running 🚀 on Vercel" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);

// MongoDB connect (once only)
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is not set!");
    await mongoose.connect(uri);
    isConnected = true;
    console.log("✅ MongoDB connected (Vercel)");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
};

// Export handler for Vercel
export default async function handler(req, res) {
  await connectDB();
  return app(req, res); // Express يتصرف في الطلب
}
