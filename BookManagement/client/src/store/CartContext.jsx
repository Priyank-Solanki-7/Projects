import React, { useState, useEffect } from "react";
import { CartContext } from "./cartContextValue";

function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error("Failed to parse cart from localStorage", err);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Failed to write cart to localStorage", err);
    }
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const key = String(item._id || item.id || item.key || "");
      if (!key) {
        // fallback: push as-is
        return [...prev, { ...item, quantity: item.quantity || 1 }];
      }

      const found = prev.find((p) => String(p._id || p.id || p.key) === key);
      if (found) {
        return prev.map((p) =>
          String(p._id || p.id || p.key) === key
            ? { ...p, quantity: (p.quantity || 1) + (item.quantity || 1) }
            : p
        );
      }

      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((p) =>
        String(p._id || p.id || p.key) === String(id) ? { ...p, quantity } : p
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) =>
      prev.filter((p) => String(p._id || p.id || p.key) !== String(id))
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
