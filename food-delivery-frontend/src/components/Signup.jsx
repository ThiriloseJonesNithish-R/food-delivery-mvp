import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
        name,
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name); // ✅ store user name
      alert("✅ Signup successful!");
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message;

      if (msg === "User already exists") {
        alert("User already exists. Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        console.error("Signup error:", err.response?.data || err.message);
        alert("❌ Signup failed: " + (msg || err.message));
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      <form onSubmit={handleSignup} style={styles.form}>
        <input type="text" placeholder="👤 Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
        <input type="email" placeholder="📧 Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
        <input type="password" placeholder="🔒 Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
        <button type="submit" style={{ ...styles.button, backgroundColor: "#007bff" }}>✅ Sign Up</button>
      </form>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

const styles = {
  container: { display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px", margin: "40px auto", padding: "20px", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "10px", border: "1px solid #ccc", borderRadius: "6px" },
  button: { padding: "10px", border: "none", borderRadius: "6px", color: "#fff" }
};

export default Signup;
