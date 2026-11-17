import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { ShoppingBag, Heart, Search, User, ShieldCheck, LogOut, Menu, X, Car, Smartphone, ChevronDown, Sparkles, ArrowRight, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import Logo from '../common/Logo';

export default function Navbar({ onNavigate, currentPath = '/' }) {
  const { isDark, toggleTheme } = useTheme();
  const { user, isAdmin, logout } = useAuth();
  const { setIsCartOpen, totalItemsCount } = useCart();
  const { wishlist } = useWishlist();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMegaMenu, setActiveMegaMenu] = useState(null); // 'collections' | null

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`/cars?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? isDark
              ? 'bg-[#0B0B0D]/90 backdrop-blur-xl border-b border-[#242426]/80 py-3.5 shadow-2xl' 
              : 'bg-white/95 backdrop-blur-xl border-b border-[#D4AF37]/25 py-3.5 shadow-md'
            : isDark
              ? 'bg-gradient-to-b from-[#0B0B0D]/90 via-[#0B0B0D]/40 to-transparent py-6'
              : 'bg-gradient-to-b from-white/95 via-white/50 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            
            {/* Zone 1: Luxury Logo */}
            <a 
              href="/"
              onClick={(e) => { e.preventDefault(); onNavigate('/'); }}
              className="group flex items-center whitespace-nowrap shrink-0 transition-transform duration-300 hover:scale-[1.02]"
            >
              <Logo size="sm" showTagline={false} />
            </a>

            {/* Zone 2: Minimalist Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A7A9AC]">
              
              <a 
                href="/cars" 
                onClick={(e) => { e.preventDefault(); onNavigate('/cars'); }}
                className={`relative py-1 transition-colors duration-200 hover:text-[#F5F4F0] whitespace-nowrap shrink-0 ${
                  currentPath === '/cars' 
                    ? isDark ? 'text-[#D4AF37] font-bold' : 'text-[#85570D] font-bold' 
                    : ''
                }`}
              >
                Cars
                {currentPath === '/cars' && (
                  <motion.div layoutId="navUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8860B]" />
                )}
              </a>

              <a 
                href="/technology" 
                onClick={(e) => { e.preventDefault(); onNavigate('/technology'); }}
                className={`relative py-1 transition-colors duration-200 hover:text-[#F5F4F0] whitespace-nowrap shrink-0 ${
                  currentPath === '/technology' 
                    ? isDark ? 'text-[#D4AF37] font-bold' : 'text-[#85570D] font-bold' 
                    : ''
                }`}
              >
                Technology
                {currentPath === '/technology' && (
                  <motion.div layoutId="navUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8860B]" />
                )}
              </a>

              {/* Collections with Mega Menu Trigger */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('collections')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button 
                  onClick={() => onNavigate('/cars')}
                  className="flex items-center gap-1.5 py-1 text-[#A7A9AC] hover:text-[#F5F4F0] transition-colors whitespace-nowrap shrink-0 tracking-[0.2em]"
                >
                  Collections <ChevronDown className="w-3 h-3 text-[#B8860B]" />
                </button>

                {/* Animated Luxury Mega Menu */}
                <AnimatePresence>
                  {activeMegaMenu === 'collections' && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-[540px]"
                    >
                      <div className="bg-[#171719]/95 backdrop-blur-2xl border border-[#242426] rounded-2xl p-5 shadow-2xl grid grid-cols-2 gap-3 text-left">
                        
                        <div 
                          onClick={() => { setActiveMegaMenu(null); onNavigate('/cars?category=Supercar'); }}
                          className="p-3.5 rounded-xl bg-[#0B0B0D]/70 border border-[#242426]/70 hover:border-[#B8860B]/50 hover:bg-[#242426]/40 cursor-pointer transition-all group"
                        >
                          <div className="flex items-center justify-between text-[#B8860B] text-[10px] font-mono tracking-widest font-bold">
                            <span>SUPERCAR & GT</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                          <h4 className="text-sm font-bold text-[#F5F4F0] font-display mt-1">V12 & Twin-Turbo Icons</h4>
                          <p className="text-[11px] text-[#A7A9AC] font-light mt-0.5">Porsche GT3 RS, Ferrari SF90, Revuelto</p>
                        </div>

                        <div 
                          onClick={() => { setActiveMegaMenu(null); onNavigate('/cars?category=Electric'); }}
                          className="p-3.5 rounded-xl bg-[#0B0B0D]/70 border border-[#242426]/70 hover:border-[#B8860B]/50 hover:bg-[#242426]/40 cursor-pointer transition-all group"
                        >
                          <div className="flex items-center justify-between text-[#B8860B] text-[10px] font-mono tracking-widest font-bold">
                            <span>THE ELECTRIC ERA</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                          <h4 className="text-sm font-bold text-[#F5F4F0] font-display mt-1">High-Torque EVs</h4>
                          <p className="text-[11px] text-[#A7A9AC] font-light mt-0.5">Tesla Cybertruck, Rimac, Taycan</p>
                        </div>

                        <div 
                          onClick={() => { setActiveMegaMenu(null); onNavigate('/cars?category=SUV'); }}
                          className="p-3.5 rounded-xl bg-[#0B0B0D]/70 border border-[#242426]/70 hover:border-[#B8860B]/50 hover:bg-[#242426]/40 cursor-pointer transition-all group"
                        >
                          <div className="flex items-center justify-between text-[#B8860B] text-[10px] font-mono tracking-widest font-bold">
                            <span>EXECUTIVE FLEET</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                          <h4 className="text-sm font-bold text-[#F5F4F0] font-display mt-1">Luxury SUVs & Sedans</h4>
                          <p className="text-[11px] text-[#A7A9AC] font-light mt-0.5">Mercedes-AMG G63 Mansory, M5</p>
                        </div>

                        <div 
                          onClick={() => { setActiveMegaMenu(null); onNavigate('/technology'); }}
                          className="p-3.5 rounded-xl bg-[#0B0B0D]/70 border border-[#242426]/70 hover:border-[#B8860B]/50 hover:bg-[#242426]/40 cursor-pointer transition-all group"
                        >
                          <div className="flex items-center justify-between text-[#B8860B] text-[10px] font-mono tracking-widest font-bold">
                            <span>FLAGSHIP TECH</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                          <h4 className="text-sm font-bold text-[#F5F4F0] font-display mt-1">Apple & Hasselblad Pro</h4>
                          <p className="text-[11px] text-[#A7A9AC] font-light mt-0.5">Desert Titanium 16 Pro, M4 Max, X2D</p>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a 
                href="/about" 
                onClick={(e) => { e.preventDefault(); onNavigate('/about'); }}
                className={`relative py-1 transition-colors duration-200 hover:text-[#F5F4F0] whitespace-nowrap shrink-0 ${
                  currentPath === '/about' 
                    ? isDark ? 'text-[#D4AF37] font-bold' : 'text-[#85570D] font-bold' 
                    : ''
                }`}
              >
                About
                {currentPath === '/about' && (
                  <motion.div layoutId="navUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8860B]" />
                )}
              </a>

            </nav>

            {/* Zone 3: Actions (Theme Toggle, Search, Wishlist, Bag, Account) */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
              
              {/* White / Dark Mode Toggle Button (Sun / Moon) */}
              <button
                onClick={toggleTheme}
                className="relative p-2.5 text-[#A7A9AC] hover:text-[#B8860B] transition-all rounded-xl hover:bg-[#171719] border border-transparent hover:border-[#242426] cursor-pointer group flex items-center justify-center"
                title={isDark ? "Switch to White Mode" : "Switch to Dark Mode"}
                aria-label={isDark ? "Switch to White Mode" : "Switch to Dark Mode"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5"
                    >
                      <Sun className="w-4 h-4 text-[#D4AF37] group-hover:rotate-45 transition-transform" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, scale: 0.6, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: -90, scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5"
                    >
                      <Moon className="w-4 h-4 text-[#85570D] group-hover:-rotate-12 transition-transform" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 text-[#A7A9AC] hover:text-[#B8860B] transition-colors rounded-xl hover:bg-[#171719] border border-transparent hover:border-[#242426]"
                title="Search Automotive & Tech"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Wishlist Icon */}
              <button
                onClick={() => onNavigate('/wishlist')}
                className="relative p-2.5 text-[#A7A9AC] hover:text-[#B8860B] transition-colors rounded-xl hover:bg-[#171719] border border-transparent hover:border-[#242426]"
                title="Wishlist Registry"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#B8860B] text-[#FFFFFF] font-bold text-[9px] font-mono rounded-full flex items-center justify-center shadow-md">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 text-[#A7A9AC] hover:text-[#B8860B] transition-colors rounded-xl hover:bg-[#171719] border border-transparent hover:border-[#242426]"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItemsCount > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#B8860B] text-[#FFFFFF] font-bold text-[9px] font-mono rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(184,134,11,0.85)]">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full border border-[#242426] hover:border-[#C5A878]/60 bg-[#171719]/80 transition-all"
                  title="VIP Account"
                >
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#242426] flex items-center justify-center text-[#C5A878]">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      className="absolute right-0 mt-2.5 w-60 rounded-2xl bg-[#171719] border border-[#242426] shadow-2xl py-2.5 z-50 text-xs"
                    >
                      {user ? (
                        <>
                          <div className="px-4 py-2 border-b border-[#242426]">
                            <p className="font-semibold text-[#F5F4F0] truncate">{user.displayName || 'VIP Client'}</p>
                            <p className="text-[10px] text-[#A7A9AC] font-mono truncate">{user.email}</p>
                          </div>
                          
                          <button
                            onClick={() => { setIsUserMenuOpen(false); onNavigate('/dashboard'); }}
                            className="w-full text-left px-4 py-2.5 text-[#A7A9AC] hover:bg-[#242426] hover:text-[#C5A878] flex items-center gap-2 transition-colors"
                          >
                            <User className="w-4 h-4 text-[#C5A878]" /> Client Dashboard
                          </button>

                          {isAdmin && (
                            <button
                              onClick={() => { setIsUserMenuOpen(false); onNavigate('/admin'); }}
                              className="w-full text-left px-4 py-2.5 text-[#C5A878] hover:bg-[#C5A878]/10 font-medium flex items-center gap-2 transition-colors"
                            >
                              <ShieldCheck className="w-4 h-4 text-[#C5A878]" /> Executive Control Panel
                            </button>
                          )}

                          <button
                            onClick={() => { setIsUserMenuOpen(false); logout(); }}
                            className="w-full text-left px-4 py-2.5 text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 border-t border-[#242426] mt-1 transition-colors"
                          >
                            <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                        </>
                      ) : (
                        <div className="p-3.5 text-center">
                          <p className="text-[11px] text-[#A7A9AC] mb-3">Sign in to access VIP supercar allocations & orders</p>
                          <button
                            onClick={() => { setIsUserMenuOpen(false); onNavigate('/auth'); }}
                            className="w-full py-2.5 px-4 bg-gradient-to-r from-[#C5A878] via-[#E0C79B] to-[#C5A878] text-[#0B0B0D] font-extrabold rounded-xl text-[10px] uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
                          >
                            VIP Sign In / Register
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-[#A7A9AC] hover:text-[#F5F4F0]"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-[#0B0B0D]/98 border-b border-[#242426] overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4 text-xs font-semibold uppercase tracking-wider">
                <a 
                  href="/cars" 
                  onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); onNavigate('/cars'); }}
                  className="flex items-center gap-3 text-[#F5F4F0] hover:text-[#C5A878] py-2"
                >
                  <Car className="w-4 h-4 text-[#C5A878]" /> Cars Marketplace
                </a>
                <a 
                  href="/technology" 
                  onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); onNavigate('/technology'); }}
                  className="flex items-center gap-3 text-[#F5F4F0] hover:text-[#C5A878] py-2"
                >
                  <Smartphone className="w-4 h-4 text-[#C5A878]" /> Technology Store
                </a>
                <a 
                  href="/about" 
                  onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); onNavigate('/about'); }}
                  className="block text-[#A7A9AC] hover:text-[#C5A878] py-2"
                >
                  About Velocity
                </a>
                <a 
                  href="/contact" 
                  onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); onNavigate('/contact'); }}
                  className="block text-[#A7A9AC] hover:text-[#C5A878] py-2"
                >
                  Contact Concierge
                </a>
                <a 
                  href="/faq" 
                  onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); onNavigate('/faq'); }}
                  className="block text-[#A7A9AC] hover:text-[#C5A878] py-2"
                >
                  Client FAQ
                </a>

                {/* Mobile White / Dark Mode Toggle Button */}
                <div className="pt-3 border-t border-[#242426]">
                  <button
                    onClick={() => { toggleTheme(); }}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl bg-[#171719] border border-[#242426] text-xs font-mono text-[#F5F4F0]"
                  >
                    <span className="flex items-center gap-2">
                      {isDark ? <Sun className="w-4 h-4 text-[#C5A878]" /> : <Moon className="w-4 h-4 text-[#9C7A3C]" />}
                      <span>{isDark ? 'Switch to White Mode' : 'Switch to Dark Mode'}</span>
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#C5A878]">
                      {isDark ? 'Dark Active' : 'White Active'}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Animated Full-Screen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0B0B0D]/95 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 text-[#A7A9AC] hover:text-[#F5F4F0] p-2 transition-colors"
            >
              <X className="w-7 h-7" />
            </button>
            <div className="w-full max-w-2xl space-y-4">
              <div className="flex items-center justify-center gap-2 text-xs uppercase font-mono tracking-[0.25em] text-[#C5A878]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Search Luxury Automotive & Hardware Fleet</span>
              </div>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Porsche, Ferrari, G63, Hasselblad, iPhone 16..."
                  autoFocus
                  className="w-full bg-[#171719] border-2 border-[#242426] focus:border-[#C5A878] rounded-2xl px-6 py-5 text-lg text-[#F5F4F0] placeholder-[#A7A9AC]/50 outline-none shadow-2xl transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-gradient-to-r from-[#C5A878] to-[#A88B57] text-[#0B0B0D] font-bold text-xs uppercase tracking-wider rounded-xl transition-all hover:brightness-110"
                >
                  Search
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
