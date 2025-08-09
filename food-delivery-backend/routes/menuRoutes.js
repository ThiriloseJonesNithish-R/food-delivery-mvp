const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// GET /menu
router.get("/", async (req, res) => {
  console.log("✅ [GET] /menu");
  try {
    const items = await MenuItem.find();
    console.log("📦 Menu Items Fetched:", items.length);
    res.json(items);
  } catch (err) {
    console.error("❌ Error fetching menu:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /menu
router.post("/", async (req, res) => {
  console.log("✅ [POST] /menu - Body:", req.body);
  try {
    const newItem = new MenuItem(req.body);
    const savedItem = await newItem.save();
    console.log("🆕 Menu Item Saved:", savedItem);
    res.status(201).json(savedItem);
  } catch (err) {
    console.error("❌ Error adding menu item:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
