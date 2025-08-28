import express from "express";
import Product from "../models/Product.js";
import { auth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Create product (admin)
router.post("/", auth, requireAdmin, async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    if (!name || price == null || stock == null) {
      return res.status(400).json({ error: "name, price, stock are required." });
    }
    const product = await Product.create({ name, description, price, stock });
    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// List products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;