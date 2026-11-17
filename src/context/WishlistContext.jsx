import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('velocity_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('velocity_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Localstorage wishlist error:", e);
    }
  }, [wishlist]);

  const toggleWishlist = (item) => {
    setWishlist(prev => {
      const exists = prev.some(w => w.id === item.id);
      if (exists) {
        return prev.filter(w => w.id !== item.id);
      } else {
        const itemImage = Array.isArray(item.images) ? item.images[0] : item.image || '';
        return [...prev, {
          id: item.id,
          title: item.title,
          price: item.price,
          image: itemImage,
          category: item.category || 'General',
          brand: item.brand || '',
          type: item.horsepower ? 'vehicle' : 'tech',
          addedAt: new Date().toISOString()
        }];
      }
    });
  };

  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      toggleWishlist,
      isInWishlist,
      removeFromWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
