import React, { useState } from "react";
import axios from "axios";

function Cart({ cartItems, onClearCart }) {
  const [loading, setLoading] = useState(false);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ You must be logged in to place an order.");
      window.location.href = "/login";
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/order`, {
        items: cartItems,
        totalPrice: total
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("✅ Order placed!");
      onClearCart();
    } catch (err) {
      console.error("Order Error:", err.response?.data || err.message);
      alert("❌ Failed to place order: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
    }}>
      <h2>🛒 Cart</h2>
      {cartItems.length === 0 ? (
        <p style={{ color: "#888", textAlign: "center" }}>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cartItems.map((item, index) => (
              <li key={index} style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px"
              }}>
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <hr />
          <p style={{ fontWeight: "bold" }}>Total: ₹{total}</p>
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            style={{
              backgroundColor: loading ? "#aaa" : "#28a745",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "10px"
            }}
          >
            {loading ? "⏳ Placing Order..." : "✅ Place Order"}
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
