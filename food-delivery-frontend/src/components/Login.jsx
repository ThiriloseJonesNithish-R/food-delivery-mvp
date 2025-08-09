import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name); // ✅ store user name
      alert("✅ Login successful!");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert("❌ Login failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input type="email" placeholder="📧 Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
        <input type="password" placeholder="🔒 Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
        <button type="submit" disabled={loading} style={{
          ...styles.button,
          backgroundColor: loading ? "#ccc" : "#007bff",
          cursor: loading ? "not-allowed" : "pointer"
        }}>
          {loading ? "Logging in..." : "🔐 Login"}
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Don't have an account? <Link to="/signup">Sign up here</Link>
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

export default Login;
