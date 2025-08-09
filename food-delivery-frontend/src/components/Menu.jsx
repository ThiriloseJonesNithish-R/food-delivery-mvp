import React, { useEffect, useState } from "react";
import axios from "axios";

function Menu({ onAddToCart }) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/menu`)
      .then(res => setMenuItems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
    }}>
      <h2 style={{ marginBottom: "16px" }}>🍽️ Menu</h2>
      {menuItems.map(item => (
        <div key={item._id} style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 0",
          borderBottom: "1px solid #eee"
        }}>
          <div>
            <p style={{ margin: "0", fontWeight: "500" }}>{item.name}</p>
            <small style={{ color: "#666" }}>₹{item.price}</small>
          </div>
          <button onClick={() => onAddToCart(item)}>Add</button>
        </div>
      ))}
    </div>
  );
}

export default Menu;
