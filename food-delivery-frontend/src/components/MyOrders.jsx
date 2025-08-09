import React, { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/order/my`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err.message);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (!localStorage.getItem("token")) {
    return (
      <p style={{ textAlign: "center", color: "#777" }}>
        🔒 Please log in to view your orders.
      </p>
    );
  }

  const formatDateTime = (dateString) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString("en-IN", options);
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        maxWidth: "600px",
        margin: "0 auto",
        marginTop: "30px",
      }}
    >
      <h2>📦 My Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p style={{ color: "#888" }}>You haven’t placed any orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            style={{
              borderBottom: "1px solid #eee",
              marginBottom: "15px",
              paddingBottom: "10px",
            }}
          >
            <p>
              <strong>🗓️ Placed:</strong> {formatDateTime(order.createdAt)}
            </p>
            <ul>
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.name} × {item.quantity} – ₹
                  {item.price * item.quantity}
                </li>
              ))}
            </ul>
            <p>
              <strong>Total:</strong> ₹{order.totalPrice}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
