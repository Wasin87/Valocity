import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, ShieldCheck } from 'lucide-react';

export default function CartDrawer({ onNavigate }) {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    coupon, 
    couponError, 
    applyCoupon, 
    removeCoupon,
    subtotal, 
    discountAmount, 
    shippingFee, 
    grandTotal 
  } = useCart();

  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    onNavigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-[#0B0B0D]/85 backdrop-blur-md z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#171719] border-l border-[#242426] z-50 flex flex-col shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#242426] flex items-center justify-between bg-[#0B0B0D]/50">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#C5A878]" />
                <h3 className="font-display font-bold text-lg text-[#F5F4F0]">Shopping Bag</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-[#A7A9AC] hover:text-[#F5F4F0] rounded-xl hover:bg-[#242426] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-[#A7A9AC] py-12">
                  <div className="w-16 h-16 rounded-full bg-[#242426] flex items-center justify-center mb-4 text-[#A7A9AC]/50">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="font-semibold text-[#F5F4F0]">Your bag is currently empty</p>
                  <p className="text-xs text-[#A7A9AC] mt-1 max-w-xs font-light">
                    Explore our luxury automotive inventory or cutting-edge technology catalog.
                  </p>
                  <button
                    onClick={() => { setIsCartOpen(false); onNavigate('/cars'); }}
                    className="mt-6 px-5 py-2.5 bg-[#242426] hover:bg-[#242426]/80 text-[#C5A878] text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-[#242426] hover:border-[#C5A878]/50"
                  >
                    Browse Supercars
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div 
                    key={item.id}
                    className="flex gap-4 p-3.5 rounded-2xl bg-[#0B0B0D]/70 border border-[#242426] items-center"
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-20 h-20 object-cover rounded-xl border border-[#242426] shrink-0 bg-[#0B0B0D]"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-mono text-[#C5A878] uppercase tracking-widest">{item.category}</span>
                      <h4 className="text-sm font-semibold text-[#F5F4F0] truncate leading-tight font-display">{item.title}</h4>
                      <p className="text-sm font-mono text-[#C5A878] font-bold mt-1">
                        ${item.price?.toLocaleString()}
                      </p>

                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-[#242426] rounded-lg bg-[#171719] px-2 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-[#A7A9AC] hover:text-[#F5F4F0] p-0.5"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-mono font-semibold text-[#F5F4F0] w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-[#A7A9AC] hover:text-[#F5F4F0] p-0.5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#A7A9AC] hover:text-rose-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#242426] bg-[#0B0B0D]/90 space-y-4">
                
                {/* Coupon Form */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-[#A7A9AC] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. VELOCITY10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#171719] border border-[#242426] rounded-xl text-xs text-[#F5F4F0] placeholder-[#A7A9AC]/50 outline-none focus:border-[#C5A878]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#242426] hover:bg-[#242426]/80 text-[#C5A878] font-bold text-xs rounded-xl transition-all border border-[#242426] hover:border-[#C5A878]/50"
                  >
                    Apply
                  </button>
                </form>

                {coupon && (
                  <div className="flex items-center justify-between text-xs text-[#C5A878] bg-[#C5A878]/10 px-3 py-2 rounded-xl border border-[#C5A878]/30 font-mono">
                    <span>Code <strong>{coupon.code}</strong> Applied ({coupon.discountPercent}% Off)</span>
                    <button onClick={removeCoupon} className="text-[#A7A9AC] hover:text-[#F5F4F0] text-xs underline">Remove</button>
                  </div>
                )}

                {couponError && (
                  <p className="text-xs text-rose-400 font-mono">{couponError}</p>
                )}

                {/* Subtotal Calculation */}
                <div className="space-y-1.5 text-xs text-[#A7A9AC] pt-2 border-t border-[#242426] font-mono">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#F5F4F0]">${subtotal.toLocaleString()}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#C5A878]">
                      <span>Discount</span>
                      <span>-${discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Insured Enclosed Transport</span>
                    <span className="text-[#F5F4F0]">${shippingFee}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#F5F4F0] pt-2 border-t border-[#242426]">
                    <span>Grand Total</span>
                    <span className="text-[#C5A878]">${grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-4 px-6 bg-gradient-to-r from-[#C5A878] via-[#E0C79B] to-[#C5A878] hover:brightness-110 text-[#0B0B0D] font-extrabold uppercase tracking-wider text-xs rounded-xl flex items-center justify-center gap-2 shadow-2xl shadow-[#C5A878]/20 transition-all"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#A7A9AC] font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A878]" />
                  <span>256-Bit Escrow & Titanium Security Protocol</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
