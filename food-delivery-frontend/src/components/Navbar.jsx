import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ isLoggedIn, onLogout }) {
  const location = useLocation();
  const isOnLoginOrSignup =
    location.pathname === "/login" || location.pathname === "/signup";

  // ✅ Read username from localStorage
  const username = localStorage.getItem("name");

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "1.8rem", color: "#007bff" }}>🍔 Foodie</h2>

      {isLoggedIn ? (
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {/* 👋 Greeting */}
          <span style={{ fontWeight: "bold", color: "#333" }}>
            {username ? `Hello, ${username}` : "Welcome!"}
          </span>

          <Link to="/">Home</Link>
          <Link to="/orders">My Orders</Link>

          <button
            onClick={onLogout}
            style={{
              backgroundColor: "#dc3545",
              border: "none",
              color: "white",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      ) : !isOnLoginOrSignup ? (
        <div style={{ display: "flex", gap: "12px" }}>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      ) : null}
    </nav>
  );
}

export default Navbar;
