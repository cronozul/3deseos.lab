import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('3deseos_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('3deseos_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productKey, quantity = 1, options = {}) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.productKey === productKey && 
        JSON.stringify(item.options || {}) === JSON.stringify(options)
      );
      
      if (existingItem) {
        return prevCart.map(item =>
          (item.productKey === productKey && JSON.stringify(item.options || {}) === JSON.stringify(options))
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { productKey, quantity, options }];
    });
  };

  const removeFromCart = (productKey) => {
    setCart(prevCart => prevCart.filter(item => item.productKey !== productKey));
  };

  const updateQuantity = (productKey, quantity) => {
    if (quantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.productKey === productKey ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
