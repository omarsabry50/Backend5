import express from "express";
import User from "../models/User.js";
import Product from "../models/Product.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Get profile basic (for demo)
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

// Add to cart (create or increment)
router.post("/cart", auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) return res.status(400).json({ error: "productId is required." });
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found." });

    const user = await User.findById(req.userId);
    const item = user.cart.find(i => i.product.toString() === productId);
    if (item) {
      item.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }
    await user.save();
    const populated = await user.populate("cart.product");
    return res.json(populated.cart);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Get cart
router.get("/cart", auth, async (req, res) => {
  const user = await User.findById(req.userId).populate("cart.product");
  res.json(user.cart);
});

// Add to wishlist (no duplicates)
router.post("/wishlist", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ error: "productId is required." });
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found." });

    const user = await User.findById(req.userId);
    const exists = user.wishlist.some(p => p.toString() === productId);
    if (!exists) user.wishlist.push(productId);
    await user.save();
    const populated = await user.populate("wishlist");
    return res.json(populated.wishlist);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Get wishlist
router.get("/wishlist", auth, async (req, res) => {
  const user = await User.findById(req.userId).populate("wishlist");
  res.json(user.wishlist);
});

export default router;