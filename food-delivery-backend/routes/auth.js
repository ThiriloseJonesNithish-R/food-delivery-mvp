const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ userId: newUser._id }, "secret123", { expiresIn: "1h" });

    res.status(201).json({ 
      message: "User created",
      userId: newUser._id,
      name: newUser.name,
      token // ✅ Send token back
    });
  } catch (err) {
    res.status(500).json({ message: "Error signing up", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, "secret123", { expiresIn: "1h" });

    res.json({ token, userId: user._id, name: user.name });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
});

module.exports = router;
