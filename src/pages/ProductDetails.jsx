import React, { useState, useEffect } from 'react';
import { getVehicleById, getProductById, getVehiclesFromStore } from '../services/marketplaceService';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import TestDriveModal from '../components/vehicles/TestDriveModal';
import InquiryModal from '../components/vehicles/InquiryModal';
import VehicleCard from '../components/vehicles/VehicleCard';
import { 
  Heart, 
  ShoppingBag, 
  Check, 
  Zap, 
  Gauge, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Car, 
  MessageSquare, 
  Star, 
  ArrowLeft,
  Sparkles,
  Award,
  Lock
} from 'lucide-react';

export default function ProductDetails({ id, type = 'car', onNavigate, setToast }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [similarItems, setSimilarItems] = useState([]);
  
  // Modals
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    async function loadItemData() {
      setLoading(true);
      if (type === 'car') {
        const data = await getVehicleById(id);
        setItem(data);
        const allV = await getVehiclesFromStore();
        setSimilarItems(allV.filter(v => v.id !== id).slice(0, 3));
      } else {
        const data = await getProductById(id);
        setItem(data);
      }
      setActiveImageIndex(0);
      setLoading(false);
    }
    loadItemData();
  }, [id, type]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] text-[#F5F4F0] pt-32 pb-20 max-w-7xl mx-auto px-4">
        <div className="h-96 rounded-2xl bg-[#171719] border border-[#242426] animate-pulse" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] text-[#F5F4F0] pt-32 pb-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-display text-white">Item Not Found in Collection</h2>
        <button 
          onClick={() => onNavigate('/cars')} 
          className="px-6 py-2.5 bg-[#171719] hover:bg-[#242426] text-[#C5A878] border border-[#C5A878]/30 font-bold text-xs uppercase rounded-xl transition-all"
        >
          Back to Automotive Fleet
        </button>
      </div>
    );
  }

  const images = Array.isArray(item.images) && item.images.length > 0 ? item.images : [item.image || ''];
  const activeImage = images[activeImageIndex] || images[0];
  const isSaved = isInWishlist(item.id);
  const isInCart = cart.some(c => c.id === item.id);
  const isVehicle = type === 'car' || Boolean(item.horsepower);

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F5F4F0] pt-28 pb-24 selection:bg-[#C5A878]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate(isVehicle ? '/cars' : '/technology')}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A7A9AC] hover:text-[#C5A878] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {isVehicle ? 'Automotive Marketplace' : 'Technology Store'}
          </button>
          
          <div className="flex items-center gap-2 text-xs font-mono text-[#A7A9AC]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Allocation Available</span>
          </div>
        </div>

        {/* Top Product Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Gallery Stage (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Stage Image */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#242426] bg-[#171719] shadow-2xl group">
              <img
                src={activeImage}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/60 via-transparent to-transparent pointer-events-none" />

              {/* Wishlist toggle badge */}
              <button
                onClick={() => toggleWishlist(item)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-xl transition-all cursor-pointer ${
                  isSaved 
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' 
                    : 'bg-[#0B0B0D]/70 border border-[#242426] text-[#A7A9AC] hover:text-[#C5A878]'
                }`}
                title={isSaved ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>

              {/* Verified badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B0B0D]/80 backdrop-blur-md border border-[#242426] text-[11px] font-mono text-[#C5A878]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>VELOCITY Verified Authenticity</span>
              </div>
            </div>

            {/* Thumbnail Navigation Row */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 aspect-[16/10] rounded-xl overflow-hidden border transition-all shrink-0 bg-[#171719] cursor-pointer ${
                      activeImageIndex === idx 
                        ? 'border-[#C5A878] ring-2 ring-[#C5A878]/30 scale-105' 
                        : 'border-[#242426] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Details & Purchase Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6 bg-[#171719]/90 backdrop-blur-xl p-8 rounded-2xl border border-[#242426]">
            
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#A7A9AC] mb-2">
                <span>{item.brand}</span>
                <span className="px-2.5 py-0.5 bg-[#0B0B0D] border border-[#242426] text-[#C5A878] rounded-md">
                  {item.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F5F4F0] leading-tight">
                {item.title}
              </h1>

              {isVehicle && item.location && (
                <div className="flex items-center gap-1.5 text-xs text-[#A7A9AC] mt-2 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A878]" />
                  <span>{item.location}</span>
                </div>
              )}
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-[#0B0B0D] border border-[#242426] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#A7A9AC] uppercase tracking-widest block font-mono">Official Valuation</span>
                <span className="text-3xl font-extrabold font-mono text-[#F5F4F0]">
                  ${item.price?.toLocaleString()}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-emerald-400 font-mono block">Certified Allocation</span>
                <span className="text-xs text-[#A7A9AC] font-mono">256-Bit Escrow</span>
              </div>
            </div>

            {/* Performance Specs summary */}
            {isVehicle ? (
              <div className="grid grid-cols-3 gap-3 py-3 border-y border-[#242426] text-xs font-mono">
                <div className="text-center p-2.5 rounded-lg bg-[#0B0B0D] border border-[#242426]">
                  <Zap className="w-4 h-4 text-[#C5A878] mx-auto mb-1" />
                  <span className="block font-bold text-[#F5F4F0]">{item.horsepower} HP</span>
                  <span className="text-[10px] text-[#A7A9AC]">Brake HP</span>
                </div>
                <div className="text-center p-2.5 rounded-lg bg-[#0B0B0D] border border-[#242426]">
                  <Gauge className="w-4 h-4 text-[#C5A878] mx-auto mb-1" />
                  <span className="block font-bold text-[#F5F4F0]">{item.acceleration}</span>
                  <span className="text-[10px] text-[#A7A9AC]">0-100 km/h</span>
                </div>
                <div className="text-center p-2.5 rounded-lg bg-[#0B0B0D] border border-[#242426]">
                  <Calendar className="w-4 h-4 text-[#C5A878] mx-auto mb-1" />
                  <span className="block font-bold text-[#F5F4F0]">{item.year}</span>
                  <span className="text-[10px] text-[#A7A9AC]">Model Year</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs text-[#A7A9AC] border-y border-[#242426] py-3 font-mono">
                <div className="flex justify-between">
                  <span>Stock Allocation:</span>
                  <span className="text-emerald-400 font-bold">{item.stock} Units Ready for Dispatch</span>
                </div>
                <div className="flex justify-between">
                  <span>Client Rating:</span>
                  <span className="text-[#C5A878] font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" /> {item.rating || 5.0} / 5.0
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => {
                  addToCart(item);
                  if (setToast) setToast({ message: `Added ${item.title} to shopping bag`, type: 'success' });
                }}
                className={`w-full py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl ${
                  isInCart
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-gradient-to-r from-[#C5A878] via-[#dfc498] to-[#b39564] hover:brightness-110 text-[#0B0B0D] font-extrabold shadow-[0_4px_24px_rgba(197,168,120,0.25)]'
                }`}
              >
                {isInCart ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                {isInCart ? 'Allocation in Shopping Bag' : 'Reserve Allocation & Add to Bag'}
              </button>

              {isVehicle && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsTestDriveOpen(true)}
                    className="py-3 px-4 bg-[#0B0B0D] hover:bg-[#242426] border border-[#242426] hover:border-[#C5A878]/50 text-[#F5F4F0] font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Car className="w-4 h-4 text-[#C5A878]" /> Book Test Drive
                  </button>

                  <button
                    onClick={() => setIsInquiryOpen(true)}
                    className="py-3 px-4 bg-[#0B0B0D] hover:bg-[#242426] border border-[#242426] hover:border-[#C5A878]/50 text-[#F5F4F0] font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-[#C5A878]" /> Inquire VIP
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-[#A7A9AC] pt-2 border-t border-[#242426]">
              <Lock className="w-3.5 h-3.5 text-[#C5A878]" />
              <span className="font-mono text-[11px]">Enclosed Air-Ride Transport & VIP Escrow</span>
            </div>

          </div>

        </div>

        {/* Detailed Overview & Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 border-t border-[#242426]">
          
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-bold font-display text-[#F5F4F0]">Engineering & Provenance Overview</h3>
            <p className="text-sm text-[#A7A9AC] leading-relaxed font-light">
              {item.description}
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-bold font-display text-[#F5F4F0]">Technical Specifications</h3>
            
            <div className="rounded-xl bg-[#171719]/90 border border-[#242426] overflow-hidden text-xs font-mono">
              {item.specs ? (
                Object.entries(item.specs).map(([key, val], idx) => (
                  <div key={idx} className="flex justify-between px-4 py-3 border-b border-[#242426] last:border-0 hover:bg-[#242426]/30">
                    <span className="text-[#A7A9AC] capitalize">{key}</span>
                    <span className="text-[#F5F4F0] font-semibold">{val}</span>
                  </div>
                ))
              ) : (
                <div className="p-4 text-[#A7A9AC] text-center">Factory Certified Standard Specifications</div>
              )}
            </div>
          </div>

        </div>

        {/* Similar Vehicles Section */}
        {similarItems.length > 0 && (
          <div className="pt-16 border-t border-[#242426] space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A878] font-bold">Similar Allocations</span>
              <h3 className="text-2xl font-bold font-display text-[#F5F4F0] mt-1">Related Luxury Vehicle Fleet</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarItems.map(v => (
                <VehicleCard key={v.id} vehicle={v} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Modals */}
      <TestDriveModal
        vehicle={item}
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        onSuccess={(msg) => setToast && setToast({ message: msg, type: 'success' })}
      />

      <InquiryModal
        vehicle={item}
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        onSuccess={(msg) => setToast && setToast({ message: msg, type: 'success' })}
      />
    </div>
  );
}
