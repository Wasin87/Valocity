import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrdersForUser } from '../services/marketplaceService';
import { User, Package, Car, Clock, ShieldCheck, LogOut, ChevronRight, Award, AlertCircle } from 'lucide-react';

export default function Dashboard({ onNavigate }) {
  const { user, isAdmin, loading: authLoading, profileSyncError, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      if (user?.uid) {
        setLoadingOrders(true);
        const list = await getOrdersForUser(user.uid);
        setOrders(list);
        setLoadingOrders(false);
      } else {
        setOrders([]);
        setLoadingOrders(false);
      }
    }
    loadOrders();
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] text-[#A7A9AC] pt-36 pb-20 text-center font-mono text-xs animate-pulse">
        Restoring VIP Collector Session...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] text-[#F5F4F0] pt-32 pb-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-display text-white">VIP Sign In Required</h2>
        <p className="text-xs text-[#A7A9AC] max-w-sm mx-auto">Please sign in to view your private allocation orders and inspection bookings.</p>
        <button
          onClick={() => onNavigate('/auth')}
          className="px-6 py-3 bg-gradient-to-r from-[#C5A878] via-[#dfc498] to-[#b39564] text-[#0B0B0D] font-bold text-xs uppercase rounded-xl cursor-pointer"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F5F4F0] pt-28 pb-24 selection:bg-[#C5A878]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {profileSyncError && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Firestore Profile Sync Notice</p>
              <p className="opacity-85 mt-0.5">
                Signed in successfully, but your profile could not be saved to Firestore ({profileSyncError}). Please ensure the latest firestore.rules are published in Firebase Console.
              </p>
            </div>
          </div>
        )}
        
        {/* Profile Card Header */}
        <div className="p-8 rounded-3xl bg-[#171719]/90 border border-[#242426] backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="w-16 h-16 rounded-full object-cover border-2 border-[#C5A878]" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#0B0B0D] border-2 border-[#C5A878] flex items-center justify-center text-[#C5A878] text-xl font-bold font-mono">
                {user.displayName ? user.displayName[0] : 'U'}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold font-display text-[#F5F4F0]">{user.displayName || 'VIP Collector'}</h1>
                {isAdmin && (
                  <span className="px-2.5 py-0.5 bg-[#C5A878]/20 text-[#C5A878] border border-[#C5A878]/40 text-[10px] font-mono uppercase font-bold rounded">
                    Admin Privileges
                  </span>
                )}
              </div>
              <p className="text-xs text-[#A7A9AC] font-mono mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={() => onNavigate('/admin')}
                className="px-5 py-2.5 bg-[#C5A878] hover:bg-[#dfc498] text-[#0B0B0D] font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer font-mono"
              >
                Executive Admin
              </button>
            )}

            <button
              onClick={() => { logout(); onNavigate('/'); }}
              className="px-4 py-2.5 bg-[#0B0B0D] hover:bg-rose-500/10 hover:text-rose-400 text-[#A7A9AC] font-bold text-xs uppercase tracking-wider rounded-xl border border-[#242426] transition-all flex items-center gap-2 cursor-pointer font-mono"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Orders Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#242426] pb-4">
            <h2 className="text-xl font-bold font-display text-[#F5F4F0] flex items-center gap-2">
              <Package className="w-5 h-5 text-[#C5A878]" /> My Allocations & Orders
            </h2>
            <span className="text-xs font-mono text-[#A7A9AC] bg-[#171719] px-3 py-1 rounded-full border border-[#242426]">
              {orders.length} Completed Allocations
            </span>
          </div>

          {loadingOrders ? (
            <div className="p-8 rounded-2xl bg-[#171719] border border-[#242426] text-center animate-pulse text-[#A7A9AC] font-mono text-xs">
              Loading verified records...
            </div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center bg-[#171719]/40 rounded-2xl border border-[#242426] space-y-3">
              <p className="text-sm text-[#A7A9AC]">You have no active vehicle or hardware orders registered yet.</p>
              <button
                onClick={() => onNavigate('/cars')}
                className="px-5 py-2 bg-[#171719] hover:bg-[#242426] text-[#C5A878] border border-[#C5A878]/30 font-bold text-xs uppercase rounded-xl cursor-pointer"
              >
                Explore Cars Fleet
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="p-6 rounded-2xl bg-[#171719]/80 backdrop-blur-xl border border-[#242426] space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#242426] pb-3 text-xs font-mono">
                    <div>
                      <span className="text-[#A7A9AC] block text-[10px]">Tracking ID</span>
                      <span className="text-[#C5A878] font-bold">{order.trackingId}</span>
                    </div>
                    <div>
                      <span className="text-[#A7A9AC] block text-[10px]">Date</span>
                      <span className="text-[#F5F4F0]">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-[#A7A9AC] block text-[10px]">Payment Protocol</span>
                      <span className="text-[#F5F4F0]">{order.paymentMethod}</span>
                    </div>
                    <div>
                      <span className="text-[#A7A9AC] block text-[10px]">Status</span>
                      <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold rounded text-[11px]">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 text-xs font-mono">
                        <img src={item.image || (Array.isArray(item.images) ? item.images[0] : '')} alt={item.title} className="w-10 h-10 object-cover rounded border border-[#242426]" />
                        <span className="text-[#F5F4F0] font-sans font-semibold flex-1 truncate">{item.title}</span>
                        <span className="text-[#A7A9AC]">Qty: {item.quantity}</span>
                        <span className="text-[#C5A878] font-bold">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-[#242426] text-xs font-mono">
                    <span className="text-[#A7A9AC]">Enclosed Delivery: {order.deliveryAddress}, {order.city}</span>
                    <span className="text-base font-bold text-[#F5F4F0]">Grand Total: <span className="text-[#C5A878]">${order.grandTotal?.toLocaleString()}</span></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
