import React, { useState, useEffect } from "react";
import Menu from "./components/Menu.jsx";
import Cart from "./components/Cart.jsx";
import Navbar from "./components/Navbar.jsx";
import MyOrders from "./components/MyOrders.jsx";
import NotLoggedIn from "./components/NotLoggedIn.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  // Listen for localStorage changes (even from other tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const clearCart = () => setCartItems([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // instant update
    clearCart();
    navigate("/login");
  };

  // Call this after successful login in your Login component
  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true); // instant update
    navigate("/");
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Menu onAddToCart={addToCart} />
              {isLoggedIn ? (
                <Cart cartItems={cartItems} onClearCart={clearCart} />
              ) : (
                <NotLoggedIn />
              )}
            </>
          }
        />
        <Route
          path="/orders"
          element={isLoggedIn ? <MyOrders /> : <NotLoggedIn />}
        />
      </Routes>
    </div>
  );
}

export default App;
