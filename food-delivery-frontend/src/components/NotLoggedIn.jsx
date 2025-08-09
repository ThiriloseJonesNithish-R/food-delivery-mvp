import React from "react";

function NotLoggedIn() {
  return (
    <div style={{
      textAlign: "center",
      marginTop: "40px",
      padding: "20px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
    }}>
      <h2>🚫 You're not logged in!</h2>
      <p>Please log in to access this page.</p>
    </div>
  );
}

export default NotLoggedIn;
