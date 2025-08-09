const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ double check this path

// ✅ POST /order — Place a new order
router.post("/", authMiddleware, async (req, res) => {
  console.log("✅ [POST] /order - Body:", req.body);

  try {
    const { items, totalPrice } = req.body;

    const newOrder = new Order({
      items,
      totalPrice,
      user: req.user.userId, // Associate with user
    });

    const savedOrder = await newOrder.save();
    console.log("📦 Order Saved:", savedOrder);
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("❌ Error placing order:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET /order/my — Get all orders of the logged-in user
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err.message);
    res.status(500).json({ error: "Server error fetching orders" });
  }
});

module.exports = router;
