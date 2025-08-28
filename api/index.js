// api/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import serverless from "serverless-http";

import authRoutes from "../routes/auth.js";
import productRoutes from "../routes/product.js";
import userRoutes from "../routes/user.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "E-commerce API running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);

let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is not set!");
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
};

const handler = async (req, res) => {
  await connectDB();
  return serverless(app)(req, res);
};

export default handler;
