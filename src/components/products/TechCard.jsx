import React, { useState } from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { Heart, Star, ShoppingBag, Check, Cpu } from 'lucide-react';

export default function TechCard({ product, onNavigate }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart, cart } = useCart();
  const { isDark } = useTheme();
  const [imgError, setImgError] = useState(false);

  const isSaved = isInWishlist(product.id);
  const isInCart = cart.some(item => item.id === product.id);
  const images = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
  const mainImage = images[0] || product.image || '';
  const secondaryImage = images[1] || '';

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const savings = hasDiscount ? product.originalPrice - product.price : 0;
  const inStock = (product.stock ?? 0) > 0;

  const handleOpenDetails = () => onNavigate(`/technology/${product.id}`);

  return (
    <article
      className={`group relative rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${
        isDark
          ? 'bg-[#131316] border border-[#25252A] hover:border-[#B8860B]/60 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] hover:shadow-[0_24px_48px_-18px_rgba(0,0,0,0.95),0_0_24px_-8px_rgba(184,134,11,0.25)]'
          : 'bg-gradient-to-b from-[#FFFFFF] to-[#FDF8EA] border border-[#B8860B]/25 hover:border-[#B8860B]/70 shadow-[0_12px_30px_-14px_rgba(184,134,11,0.16)] hover:shadow-[0_20px_42px_-14px_rgba(184,134,11,0.26)]'
      }`}
    >
      {/* Top-Edge Gold Hairline Accent on Hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

      {/* Full-Bleed Hardware Gallery Stage */}
      <div
        onClick={handleOpenDetails}
        className={`relative aspect-[4/3] overflow-hidden cursor-pointer ${
          isDark ? 'bg-[#0B0B0D]' : 'bg-[#F5EFE0]'
        }`}
      >
        {mainImage && !imgError ? (
          <>
            <img
              src={mainImage}
              alt={product.title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] ${
                secondaryImage ? 'group-hover:opacity-0' : ''
              }`}
            />
            {secondaryImage && (
              <img
                src={secondaryImage}
                alt={`${product.title} alternate view`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700 ease-out"
              />
            )}
          </>
        ) : (
          <div className={`w-full h-full flex flex-col items-center justify-center gap-2 p-6 text-center ${
            isDark ? 'bg-gradient-to-br from-[#17171A] to-[#0B0B0D] text-[#A7A9AC]' : 'bg-gradient-to-br from-[#FAF4E4] to-[#EFE3C2] text-[#85570D]'
          }`}>
            <Cpu className="w-8 h-8 opacity-60" />
            <span className="text-xs font-medium line-clamp-1">{product.title}</span>
          </div>
        )}

        {/* Single Wishlist Affordance */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
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

      {/* Content & Specifications */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-5">
        <div className="space-y-2.5">
          {/* Unboxed Metadata & Rating Row */}
          <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
            <div className="flex items-center gap-1.5 truncate">
              <span className={`font-bold uppercase tracking-wider ${isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'}`}>
                {product.brand}
              </span>
              <span aria-hidden="true" className={isDark ? 'text-[#52525B]' : 'text-[#B8860B]/50'}>·</span>
              <span className={isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'}>{product.category}</span>
            </div>

            <div className={`flex items-center gap-1 tabular-nums shrink-0 ${isDark ? 'text-[#E5BE5E]' : 'text-[#85570D]'}`}>
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-semibold">{(product.rating || 5.0).toFixed(1)}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={handleOpenDetails}
            className={`text-base font-bold font-display leading-snug line-clamp-2 cursor-pointer transition-colors duration-200 ${
              isDark
                ? 'text-[#F5F4F0] group-hover:text-[#E5BE5E]'
                : 'text-[#121214] group-hover:text-[#85570D]'
            }`}
          >
            {product.title}
          </h3>

          {/* Explicit Stock Status (Unboxed, Text-Labeled) */}
          <p className={`text-xs font-mono tabular-nums ${
            inStock
              ? isDark ? 'text-emerald-400/90' : 'text-emerald-700'
              : isDark ? 'text-rose-400' : 'text-rose-700'
          }`}>
            {inStock ? `In Stock · ${product.stock} units ready` : 'Allocation Exhausted'}
          </p>
        </div>

        {/* Hairline Price & Primary Action Footer */}
        <div className={`flex items-center justify-between gap-3 pt-4 border-t ${
          isDark ? 'border-[#25252A]' : 'border-[#B8860B]/20'
        }`}>
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-xl font-extrabold font-mono tabular-nums ${isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'}`}>
                ${product.price?.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className={`text-xs font-mono line-through tabular-nums ${isDark ? 'text-[#7C7E85]' : 'text-[#857E70]'}`}>
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {hasDiscount && (
              <span className={`text-[11px] font-mono tabular-nums ${isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'}`}>
                Save ${savings.toLocaleString()}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm ${
              isInCart
                ? isDark
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/35'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-600/30'
                : 'bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#996515] hover:brightness-110 text-[#0B0B0D] shadow-[#B8860B]/25'
            }`}
          >
            {isInCart ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
            {isInCart ? 'Added' : 'Add to Bag'}
          </button>
        </div>
      </div>
    </article>
  );
}
