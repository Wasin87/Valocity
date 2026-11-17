import React, { useState } from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { Heart, ArrowUpRight, Check, Car } from 'lucide-react';

export default function VehicleCard({ vehicle, onNavigate, layout = 'grid' }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart, cart } = useCart();
  const { isDark } = useTheme();
  const [imgError, setImgError] = useState(false);

  const isSaved = isInWishlist(vehicle.id);
  const isInCart = cart.some(item => item.id === vehicle.id);
  const images = Array.isArray(vehicle.images) ? vehicle.images.filter(Boolean) : [];
  const mainImage = images[0] || vehicle.image || '';
  const secondaryImage = images[1] || '';
  const shortAccel = vehicle.acceleration ? String(vehicle.acceleration).split(' ')[0] : '—';

  const handleOpenDetails = () => onNavigate(`/cars/${vehicle.id}`);
  const isList = layout === 'list';

  return (
    <article
      className={`group relative rounded-2xl overflow-hidden flex ${
        isList ? 'flex-col md:flex-row' : 'flex-col h-full'
      } transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${
        isDark
          ? 'bg-[#131316] border border-[#25252A] hover:border-[#B8860B]/60 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] hover:shadow-[0_24px_48px_-18px_rgba(0,0,0,0.95),0_0_24px_-8px_rgba(184,134,11,0.25)]'
          : 'bg-gradient-to-b from-[#FFFFFF] to-[#FDF8EA] border border-[#B8860B]/25 hover:border-[#B8860B]/70 shadow-[0_12px_30px_-14px_rgba(184,134,11,0.16)] hover:shadow-[0_20px_42px_-14px_rgba(184,134,11,0.26)]'
      }`}
    >
      {/* Subtle Top-Edge Gold Hairline Accent on Hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

      {/* Unobstructed Automotive Photography Stage */}
      <div
        onClick={handleOpenDetails}
        className={`relative overflow-hidden cursor-pointer ${
          isList ? 'md:w-[340px] lg:w-[380px] shrink-0 aspect-[16/10] md:aspect-auto md:min-h-[240px]' : 'aspect-[16/10]'
        } ${isDark ? 'bg-[#0B0B0D]' : 'bg-[#F5EFE0]'}`}
      >
        {mainImage && !imgError ? (
          <>
            <img
              src={mainImage}
              alt={vehicle.title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] ${
                secondaryImage ? 'group-hover:opacity-0' : ''
              }`}
            />
            {secondaryImage && (
              <img
                src={secondaryImage}
                alt={`${vehicle.title} alternate view`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700 ease-out"
              />
            )}
          </>
        ) : (
          <div className={`w-full h-full flex flex-col items-center justify-center gap-2 p-6 text-center ${
            isDark ? 'bg-gradient-to-br from-[#17171A] to-[#0B0B0D] text-[#A7A9AC]' : 'bg-gradient-to-br from-[#FAF4E4] to-[#EFE3C2] text-[#85570D]'
          }`}>
            <Car className="w-8 h-8 opacity-60" />
            <span className="text-xs font-medium line-clamp-1">{vehicle.title}</span>
          </div>
        )}

        {/* Measured Bottom Contrast Edge (Never washes out the vehicle) */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t ${
            isDark ? 'from-[#131316]/80 via-[#131316]/20 to-transparent' : 'from-black/25 via-transparent to-transparent'
          }`}
        />

        {/* Single Functional Wishlist Affordance */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(vehicle);
          }}
          aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer z-10 ${
            isSaved
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
              : isDark
                ? 'bg-[#0B0B0D]/70 border border-white/15 text-[#F5F4F0] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                : 'bg-white/85 border border-[#B8860B]/30 text-[#121214] hover:border-[#B8860B] hover:text-[#B8860B] shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Editorial Vehicle Details */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-5">
        <div className="space-y-3">
          {/* Unboxed Editorial Metadata Kicker */}
          <div className="flex items-center justify-between gap-2 text-[11px] font-mono tracking-wider">
            <div className="flex items-center gap-1.5 truncate">
              <span className={`font-bold uppercase ${isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'}`}>
                {vehicle.brand}
              </span>
              <span aria-hidden="true" className={isDark ? 'text-[#52525B]' : 'text-[#B8860B]/50'}>·</span>
              <span className={isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'}>{vehicle.category}</span>
              {vehicle.featured && (
                <>
                  <span aria-hidden="true" className={isDark ? 'text-[#52525B]' : 'text-[#B8860B]/50'}>·</span>
                  <span className={`font-semibold ${isDark ? 'text-[#E5BE5E]' : 'text-[#996515]'}`}>Featured</span>
                </>
              )}
            </div>
            <span className={`tabular-nums shrink-0 ${isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'}`}>
              {vehicle.year}
            </span>
          </div>

          {/* Primary Title & Showroom Provenance */}
          <div>
            <h3
              onClick={handleOpenDetails}
              className={`text-lg font-bold font-display leading-snug line-clamp-1 cursor-pointer transition-colors duration-200 ${
                isDark
                  ? 'text-[#F5F4F0] group-hover:text-[#E5BE5E]'
                  : 'text-[#121214] group-hover:text-[#85570D]'
              }`}
            >
              {vehicle.title}
            </h3>
            <p className={`text-xs mt-1 truncate ${isDark ? 'text-[#8E9095]' : 'text-[#6A655C]'}`}>
              {vehicle.condition || 'Certified'} · {vehicle.location || 'Dhaka Showroom'}
            </p>
          </div>

          {/* Architectural Hairline Telemetry Strip (Zero Nested Boxes) */}
          <div
            className={`grid grid-cols-3 divide-x py-2.5 border-y ${
              isDark
                ? 'border-[#25252A] divide-[#25252A]'
                : 'border-[#B8860B]/20 divide-[#B8860B]/20'
            }`}
          >
            <div className="pr-2">
              <span className={`block text-[10px] uppercase tracking-wider ${isDark ? 'text-[#7C7E85]' : 'text-[#7C7567]'}`}>
                Output
              </span>
              <span className={`text-xs font-mono font-semibold tabular-nums ${isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'}`}>
                {vehicle.horsepower} HP
              </span>
            </div>
            <div className="px-3">
              <span className={`block text-[10px] uppercase tracking-wider ${isDark ? 'text-[#7C7E85]' : 'text-[#7C7567]'}`}>
                0–100 km/h
              </span>
              <span className={`text-xs font-mono font-semibold tabular-nums ${isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'}`}>
                {shortAccel}
              </span>
            </div>
            <div className="pl-3">
              <span className={`block text-[10px] uppercase tracking-wider ${isDark ? 'text-[#7C7E85]' : 'text-[#7C7567]'}`}>
                Drivetrain
              </span>
              <span className={`text-xs font-mono font-semibold truncate block ${isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'}`}>
                {vehicle.transmission || vehicle.fuelType || 'Auto'}
              </span>
            </div>
          </div>
        </div>

        {/* Baseline-Aligned Price & Actions */}
        <div className="flex items-center justify-between gap-3 pt-0.5">
          <div>
            <span className={`block text-[10px] font-mono uppercase tracking-widest ${isDark ? 'text-[#8E9095]' : 'text-[#7C7567]'}`}>
              Valuation
            </span>
            <span className={`text-xl font-extrabold font-mono tabular-nums ${isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'}`}>
              ${vehicle.price?.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => addToCart(vehicle)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                isInCart
                  ? isDark
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/35'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-600/30'
                  : isDark
                    ? 'bg-[#1D1D22] hover:bg-[#26262C] text-[#E5BE5E] border border-[#2E2E36] hover:border-[#B8860B]/60'
                    : 'bg-[#FFFFFF] hover:bg-[#FAF1D8] text-[#85570D] border border-[#B8860B]/35 hover:border-[#B8860B]'
              }`}
            >
              {isInCart && <Check className="w-3.5 h-3.5" />}
              {isInCart ? 'In Bag' : 'Reserve'}
            </button>

            <button
              type="button"
              onClick={handleOpenDetails}
              aria-label={`View ${vehicle.title} details`}
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#996515] hover:brightness-110 text-[#0B0B0D] flex items-center justify-center transition-all duration-200 shadow-sm shadow-[#B8860B]/25 cursor-pointer"
            >
              <ArrowUpRight className="w-4 h-4 stroke-[2.25]" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
