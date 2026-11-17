import React, { useRef } from 'react';
import VehicleCard from '../vehicles/VehicleCard';
import { useTheme } from '../../context/ThemeContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function VehicleCarousel({ vehicles, title = "Curated Automotive Fleet", subtitle = "CURATED AUTOMOTIVE SHOWROOM", onNavigate }) {
  const scrollRef = useRef(null);
  const { isDark } = useTheme();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8 select-none">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className={`text-[11px] font-mono uppercase tracking-[0.2em] font-bold block ${
            isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'
          }`}>
            {subtitle}
          </span>
          <h2 className={`text-2xl sm:text-4xl font-extrabold font-display mt-1.5 ${
            isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'
          }`}>
            {title}
          </h2>
        </div>

        {/* Arrow Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Scroll vehicles left"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
              isDark
                ? 'bg-[#131316] border-[#25252A] text-[#A7A9AC] hover:text-[#E5BE5E] hover:border-[#B8860B]/60'
                : 'bg-[#FFFFFF] border-[#B8860B]/30 text-[#55524B] hover:text-[#85570D] hover:border-[#B8860B] shadow-sm'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={scrollRight}
            aria-label="Scroll vehicles right"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
              isDark
                ? 'bg-[#131316] border-[#25252A] text-[#A7A9AC] hover:text-[#E5BE5E] hover:border-[#B8860B]/60'
                : 'bg-[#FFFFFF] border-[#B8860B]/30 text-[#55524B] hover:text-[#85570D] hover:border-[#B8860B] shadow-sm'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Strip with Equal-Height Cards */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-2 snap-x snap-mandatory"
      >
        {vehicles.map((v) => (
          <div key={v.id} className="w-[320px] sm:w-[376px] shrink-0 snap-start flex">
            <div className="w-full">
              <VehicleCard vehicle={v} onNavigate={onNavigate} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
