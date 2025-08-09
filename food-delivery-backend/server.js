const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true
}));

app.use(express.json());

const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/auth");

app.use("/menu", menuRoutes);
app.use("/order", orderRoutes);
app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log("Server running on port", process.env.PORT);
    });
  })
  .catch(err => console.error("MongoDB connection failed:", err));
