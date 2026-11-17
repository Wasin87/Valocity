import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_COUPONS } from '../data/seedData';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('velocity_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('velocity_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn("Localstorage cart error:", e);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        const itemImage = Array.isArray(product.images) ? product.images[0] : product.image || '';
        return [...prevCart, {
          id: product.id,
          title: product.title,
          price: product.price,
          image: itemImage,
          category: product.category || 'General',
          brand: product.brand || '',
          quantity: quantity,
          type: product.category === 'Supercar' || product.category === 'SUV' || product.category === 'Sports' || product.category === 'Luxury Sedan' || product.category === 'Electric' || product.category === 'Motorcycle' ? 'vehicle' : 'tech'
        }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    setCouponError('');
    const cleanCode = code.trim().toUpperCase();
    const found = INITIAL_COUPONS.find(c => c.code === cleanCode && c.active);
    if (found) {
      setCoupon(found);
      return { success: true, discountPercent: found.discountPercent };
    } else {
      setCouponError('Invalid or expired coupon code');
      return { success: false, error: 'Invalid or expired coupon code' };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponError('');
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = coupon ? (subtotal * coupon.discountPercent) / 100 : 0;
  const shippingFee = cart.length > 0 ? 150 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      coupon,
      couponError,
      applyCoupon,
      removeCoupon,
      subtotal,
      discountAmount,
      shippingFee,
      grandTotal,
      totalItemsCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
