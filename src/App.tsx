/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import ScrollProgress from './components/layout/ScrollProgress';
import Toast from './components/common/Toast';

import Home from './pages/Home';
import Cars from './pages/Cars';
import Technology from './pages/Technology';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Admin from './pages/Admin';

interface ToastState {
  message: string;
  type?: 'success' | 'error';
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryParam = searchParams.get('category') || '';
    const searchParam = searchParams.get('search') || '';

    // PDP Routing for /cars/:id
    if (currentPath.startsWith('/cars/')) {
      const carId = currentPath.replace('/cars/', '');
      return <ProductDetails id={carId} type="car" onNavigate={navigate} setToast={setToast} />;
    }

    // PDP Routing for /technology/:id
    if (currentPath.startsWith('/technology/')) {
      const techId = currentPath.replace('/technology/', '');
      return <ProductDetails id={techId} type="tech" onNavigate={navigate} setToast={setToast} />;
    }

    switch (currentPath) {
      case '/cars':
        return <Cars onNavigate={navigate} initialCategory={categoryParam} initialSearch={searchParam} />;
      case '/technology':
        return <Technology onNavigate={navigate} />;
      case '/checkout':
        return <Checkout onNavigate={navigate} setToast={setToast} />;
      case '/wishlist':
        return <Wishlist onNavigate={navigate} />;
      case '/auth':
        return <Auth onNavigate={navigate} setToast={setToast} />;
      case '/dashboard':
        return <Dashboard onNavigate={navigate} />;
      case '/about':
        return <About onNavigate={navigate} />;
      case '/contact':
        return <Contact setToast={setToast} />;
      case '/faq':
        return <FAQ />;
      case '/admin':
        return <Admin onNavigate={navigate} setToast={setToast} />;
      case '/':
      default:
        return <Home onNavigate={navigate} setToast={setToast} />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="min-h-screen bg-[#0B0B0D] text-[#F5F4F0] flex flex-col font-sans selection:bg-[#C5A878]/30 selection:text-[#C5A878] transition-colors duration-300">
              <ScrollProgress />
              <Navbar onNavigate={navigate} currentPath={currentPath} />
              
              <main className="flex-1">
                {renderCurrentPage()}
              </main>

              <CartDrawer onNavigate={navigate} />
              <Footer onNavigate={navigate} />

              {toast && (
                <Toast
                  message={toast.message}
                  type={toast.type}
                  onClose={() => setToast(null)}
                />
              )}
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
