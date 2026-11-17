import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Heart, Trash2, ShoppingBag, ArrowUpRight } from 'lucide-react';

export default function Wishlist({ onNavigate }) {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isDark } = useTheme();

  const getItemDetailRoute = (item) => {
    const isVehicle = Boolean(item.horsepower || item.transmission || item.fuelType);
    return isVehicle ? `/cars/${item.id}` : `/technology/${item.id}`;
  };

  return (
    <div className={`min-h-screen pt-28 pb-24 transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0D] text-[#F5F4F0]' : 'bg-[#FFFFFF] text-[#121214]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className={`pb-6 border-b flex items-end justify-between gap-4 ${
          isDark ? 'border-[#25252A]' : 'border-[#B8860B]/25'
        }`}>
          <div>
            <span className={`text-[11px] font-mono uppercase tracking-[0.2em] font-bold block ${
              isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'
            }`}>
              Saved Allocations
            </span>
            <h1 className={`text-3xl sm:text-4xl font-extrabold font-display mt-1 ${
              isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'
            }`}>
              Private Wishlist
            </h1>
          </div>
          <span className={`text-xs font-mono tabular-nums ${isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'}`}>
            {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} Saved
          </span>
        </div>

        {wishlist.length === 0 ? (
          <div className={`p-16 text-center rounded-2xl border space-y-4 max-w-xl mx-auto ${
            isDark
              ? 'bg-[#131316] border-[#25252A]'
              : 'bg-gradient-to-b from-[#FFFFFF] to-[#FDF8EA] border-[#B8860B]/25'
          }`}>
            <div className={`w-14 h-14 rounded-full border flex items-center justify-center mx-auto ${
              isDark ? 'bg-[#1D1D22] border-[#25252A] text-[#D4AF37]' : 'bg-[#FAF1D8] border-[#B8860B]/30 text-[#85570D]'
            }`}>
              <Heart className="w-6 h-6" />
            </div>
            <h3 className={`text-xl font-bold font-display ${isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'}`}>
              Your Wishlist is Empty
            </h3>
            <p className={`text-xs ${isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'}`}>
              Save supercars, vehicles, and flagship hardware to review or reserve later.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/cars')}
              className="px-6 py-3 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#996515] hover:brightness-110 text-[#0B0B0D] font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-sm"
            >
              Browse Automotive Fleet
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => {
              const thumb = (Array.isArray(item.images) && item.images[0]) || item.image || '';
              const detailRoute = getItemDetailRoute(item);

              return (
                <article
                  key={item.id}
                  className={`group relative rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                    isDark
                      ? 'bg-[#131316] border border-[#25252A] hover:border-[#B8860B]/60 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)]'
                      : 'bg-gradient-to-b from-[#FFFFFF] to-[#FDF8EA] border border-[#B8860B]/25 hover:border-[#B8860B]/70 shadow-[0_12px_30px_-14px_rgba(184,134,11,0.16)]'
                  }`}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />

                  <div
                    onClick={() => onNavigate(detailRoute)}
                    className={`aspect-[16/10] overflow-hidden cursor-pointer ${
                      isDark ? 'bg-[#0B0B0D]' : 'bg-[#F5EFE0]'
                    }`}
                  >
                    <img
                      src={thumb}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono">
                        <span className={`font-bold uppercase tracking-wider ${isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'}`}>
                          {item.brand}
                        </span>
                        <span aria-hidden="true" className={isDark ? 'text-[#52525B]' : 'text-[#B8860B]/50'}>·</span>
                        <span className={isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'}>{item.category}</span>
                      </div>

                      <h4
                        onClick={() => onNavigate(detailRoute)}
                        className={`text-lg font-bold font-display line-clamp-1 cursor-pointer transition-colors ${
                          isDark ? 'text-[#F5F4F0] group-hover:text-[#E5BE5E]' : 'text-[#121214] group-hover:text-[#85570D]'
                        }`}
                      >
                        {item.title}
                      </h4>

                      <p className={`text-xl font-mono font-extrabold tabular-nums pt-1 ${
                        isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'
                      }`}>
                        ${item.price?.toLocaleString()}
                      </p>
                    </div>

                    <div className={`flex items-center gap-2 pt-4 border-t ${
                      isDark ? 'border-[#25252A]' : 'border-[#B8860B]/20'
                    }`}>
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(item);
                          removeFromWishlist(item.id);
                        }}
                        className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#996515] hover:brightness-110 text-[#0B0B0D] font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Move to Bag
                      </button>

                      <button
                        type="button"
                        onClick={() => onNavigate(detailRoute)}
                        aria-label={`View ${item.title}`}
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center cursor-pointer transition-colors ${
                          isDark
                            ? 'border-[#25252A] text-[#A7A9AC] hover:text-[#E5BE5E] hover:border-[#B8860B]/60'
                            : 'border-[#B8860B]/30 text-[#55524B] hover:text-[#85570D] hover:border-[#B8860B]'
                        }`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => removeFromWishlist(item.id)}
                        aria-label="Remove item"
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center cursor-pointer transition-colors ${
                          isDark
                            ? 'border-[#25252A] text-[#A7A9AC] hover:text-rose-400 hover:border-rose-500/50'
                            : 'border-[#B8860B]/30 text-[#55524B] hover:text-rose-600 hover:border-rose-500/50'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
