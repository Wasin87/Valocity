import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrderInStore } from '../services/marketplaceService';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  Truck, 
  ArrowRight, 
  Lock, 
  ShoppingBag,
  Sparkles,
  MapPin
} from 'lucide-react';

export default function Checkout({ onNavigate, setToast }) {
  const { cart, subtotal, discountAmount, shippingFee, grandTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.displayName || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('Dhaka');
  const [district, setDistrict] = useState('Gulshan');
  const [paymentMethod, setPaymentMethod] = useState('bKash');
  const [mobileNumber, setMobileNumber] = useState('');
  const [trxId, setTrxId] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  React.useEffect(() => {
    if (user) {
      setCustomerName((prev) => prev || user.displayName || '');
      setCustomerEmail((prev) => prev || user.email || '');
    }
  }, [user]);

  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] text-[#F5F4F0] pt-32 pb-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#171719] border border-[#242426] flex items-center justify-center mx-auto text-[#A7A9AC]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold font-display text-[#F5F4F0]">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-[#A7A9AC] max-w-sm mx-auto">
          Add certified supercars or premier hardware to your shopping bag to proceed with private escrow checkout.
        </p>
        <button
          onClick={() => onNavigate('/cars')}
          className="px-6 py-3 bg-gradient-to-r from-[#C5A878] via-[#dfc498] to-[#b39564] text-[#0B0B0D] font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
        >
          Explore Supercars & Hardware
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const orderPayload = {
        userId: user?.uid || 'guest',
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress,
        city,
        district,
        paymentMethod: paymentMethod === 'bKash' || paymentMethod === 'Nagad' ? `${paymentMethod} (${mobileNumber || 'Trx:' + trxId})` : paymentMethod,
        items: cart,
        subtotal,
        discount: discountAmount,
        grandTotal
      };

      const result = await createOrderInStore(orderPayload);
      setCompletedOrder(result);
      clearCart();

      // Confetti celebration
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

      if (setToast) setToast({ message: 'Order Placed & Escrow Initialized Successfully!', type: 'success' });
    } catch (err) {
      console.error(err);
      if (setToast) setToast({ message: 'Could not save order to database. Please check Firestore Rules.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F5F4F0] pt-28 pb-24 selection:bg-[#C5A878]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {completedOrder ? (
          /* Order Confirmation View */
          <div className="max-w-2xl mx-auto p-10 bg-[#171719]/90 border border-[#242426] rounded-3xl text-center space-y-6 shadow-2xl backdrop-blur-xl">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#C5A878] uppercase tracking-[0.2em] font-bold">
                Order Tracking ID: {completedOrder.trackingId}
              </span>
              <h1 className="text-3xl font-extrabold font-display text-[#F5F4F0]">Order Confirmed & Escrowed</h1>
              <p className="text-sm text-[#A7A9AC] font-light">
                Thank you, <strong className="text-[#F5F4F0] font-semibold">{completedOrder.customerName}</strong>. Your luxury allocation is registered and enclosed transport logistics are being organized.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B0B0D] border border-[#242426] text-left text-xs font-mono space-y-3">
              <div className="flex justify-between border-b border-[#242426] pb-2 text-[#A7A9AC]">
                <span>Delivery Address</span>
                <span className="text-[#F5F4F0] font-sans">{completedOrder.deliveryAddress}, {completedOrder.city}</span>
              </div>
              <div className="flex justify-between border-b border-[#242426] pb-2 text-[#A7A9AC]">
                <span>Payment Method</span>
                <span className="text-[#C5A878]">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-1">
                <span className="text-[#A7A9AC]">Total Escrowed</span>
                <span className="text-[#C5A878]">${completedOrder.grandTotal?.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={() => onNavigate('/dashboard')}
                className="px-6 py-3 bg-[#171719] hover:bg-[#242426] text-[#F5F4F0] font-bold text-xs uppercase tracking-wider rounded-xl border border-[#242426] transition-all cursor-pointer"
              >
                View Order History
              </button>
              <button
                onClick={() => onNavigate('/')}
                className="px-6 py-3 bg-gradient-to-r from-[#C5A878] via-[#dfc498] to-[#b39564] text-[#0B0B0D] font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Return to Store
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form & Summary Split */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C5A878] font-bold">Secure Protocol</span>
                <h1 className="text-3xl font-extrabold font-display text-[#F5F4F0] mt-1">Delivery & Payment Information</h1>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-8">
                
                {/* 1. Personal Details */}
                <div className="p-6 rounded-2xl bg-[#171719]/80 backdrop-blur-xl border border-[#242426] space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F4F0] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#C5A878] text-[#0B0B0D] font-mono text-xs flex items-center justify-center font-bold">1</span>
                    Customer Identity
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#A7A9AC] mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-4 py-3 text-xs text-[#F5F4F0] placeholder-[#A7A9AC]/40 focus:border-[#C5A878] outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#A7A9AC] mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+880 1700 000000"
                        className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-4 py-3 text-xs text-[#F5F4F0] placeholder-[#A7A9AC]/40 focus:border-[#C5A878] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#A7A9AC] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-4 py-3 text-xs text-[#F5F4F0] placeholder-[#A7A9AC]/40 focus:border-[#C5A878] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* 2. Bangladesh Shipping Address */}
                <div className="p-6 rounded-2xl bg-[#171719]/80 backdrop-blur-xl border border-[#242426] space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F4F0] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#C5A878] text-[#0B0B0D] font-mono text-xs flex items-center justify-center font-bold">2</span>
                    Enclosed Transport Delivery Address
                  </h3>

                  <div>
                    <label className="block text-xs font-mono text-[#A7A9AC] mb-1">Full Street Address / Residence</label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="House 12, Road 5, Block C, Gulshan 2"
                      className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-4 py-3 text-xs text-[#F5F4F0] placeholder-[#A7A9AC]/40 focus:border-[#C5A878] outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#A7A9AC] mb-1">City / Division</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-4 py-3 text-xs text-[#F5F4F0] outline-none focus:border-[#C5A878] cursor-pointer"
                      >
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chittagong">Chittagong</option>
                        <option value="Sylhet">Sylhet</option>
                        <option value="Rajshahi">Rajshahi</option>
                        <option value="Khulna">Khulna</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#A7A9AC] mb-1">District / Area</label>
                      <input
                        type="text"
                        required
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        placeholder="Gulshan / Banani / Agrabad"
                        className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-4 py-3 text-xs text-[#F5F4F0] placeholder-[#A7A9AC]/40 focus:border-[#C5A878] outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="p-6 rounded-2xl bg-[#171719]/80 backdrop-blur-xl border border-[#242426] space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F4F0] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#C5A878] text-[#0B0B0D] font-mono text-xs flex items-center justify-center font-bold">3</span>
                    Payment Protocol
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'bKash', label: 'bKash Merchant', icon: Smartphone },
                      { id: 'Nagad', label: 'Nagad Direct', icon: Smartphone },
                      { id: 'COD', label: 'Cash on Delivery', icon: Truck },
                      { id: 'Card', label: 'Credit Card', icon: CreditCard }
                    ].map((pm) => (
                      <div
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 ${
                          paymentMethod === pm.id 
                            ? 'bg-[#171719] border-[#C5A878] text-[#C5A878] shadow-[0_0_20px_rgba(197,168,120,0.15)]' 
                            : 'bg-[#0B0B0D] border-[#242426] text-[#A7A9AC] hover:text-[#F5F4F0] hover:border-[#A7A9AC]/40'
                        }`}
                      >
                        <pm.icon className="w-5 h-5" />
                        <span className="text-xs font-bold font-mono">{pm.label}</span>
                      </div>
                    ))}
                  </div>

                  {(paymentMethod === 'bKash' || paymentMethod === 'Nagad') && (
                    <div className="p-4 rounded-xl bg-[#0B0B0D] border border-[#242426] space-y-3">
                      <p className="text-xs text-[#C5A878] font-mono">
                        Send Payment to Merchant Number: <strong>+880 1800 999 888</strong>
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Your Mobile Number"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          className="bg-[#171719] border border-[#242426] rounded-xl px-3.5 py-2 text-xs text-[#F5F4F0] outline-none focus:border-[#C5A878]"
                        />
                        <input
                          type="text"
                          placeholder="Transaction ID (TrxID)"
                          value={trxId}
                          onChange={(e) => setTrxId(e.target.value)}
                          className="bg-[#171719] border border-[#242426] rounded-xl px-3.5 py-2 text-xs text-[#F5F4F0] outline-none focus:border-[#C5A878]"
                        />
                      </div>
                    </div>
                  )}

                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-[#C5A878] via-[#dfc498] to-[#b39564] hover:brightness-110 text-[#0B0B0D] font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-2xl shadow-[#C5A878]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  {isSubmitting ? 'Securing Escrow Order...' : 'Confirm Order & Authorize Payment'}
                </button>

              </form>
            </div>

            {/* Order Summary Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-[#171719]/90 border border-[#242426] backdrop-blur-xl sticky top-28 space-y-6">
                <h3 className="text-lg font-bold font-display text-[#F5F4F0] border-b border-[#242426] pb-4">
                  Order Summary ({cart.length} Allocations)
                </h3>

                {/* Items preview list */}
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2 scrollbar-none">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center text-xs">
                      <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-lg border border-[#242426] shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-[#F5F4F0] truncate">{item.title}</h5>
                        <p className="text-[#A7A9AC] font-mono">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-mono text-[#C5A878] font-bold">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Costs breakdown */}
                <div className="space-y-2 text-xs font-mono text-[#A7A9AC] pt-4 border-t border-[#242426]">
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
                    <span>Enclosed Insured Transport</span>
                    <span className="text-[#F5F4F0]">${shippingFee}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#F5F4F0] pt-3 border-t border-[#242426]">
                    <span>Grand Total</span>
                    <span className="text-[#C5A878]">${grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0B0B0D] border border-[#242426] text-[11px] text-[#A7A9AC] space-y-2">
                  <div className="flex items-center gap-2 text-[#C5A878] font-bold">
                    <ShieldCheck className="w-4 h-4" /> 256-Bit Escrow Guarantee
                  </div>
                  <p>Your payment remains safely escrowed until physical inspection and signature at delivery.</p>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
