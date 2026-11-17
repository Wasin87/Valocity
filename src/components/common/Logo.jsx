import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function Logo({ size = 'md', showTagline = false, className = '' }) {
  const { isDark } = useTheme();

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg tracking-[0.24em]',
    md: 'text-2xl tracking-[0.26em]',
    lg: 'text-3xl tracking-[0.28em]',
    xl: 'text-4xl tracking-[0.3em]'
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Aerodynamic Luxury "V" Monogram Crest */}
      <div className={`relative ${iconSizes[size] || iconSizes.md} shrink-0`}>
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#E5BE5E" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
            <linearGradient id="wingDarkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#2A2A2E" : "#FFFFFF"} />
              <stop offset="100%" stopColor={isDark ? "#171719" : "#F6EBCB"} />
            </linearGradient>
            <linearGradient id="goldAccent" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E5BE5E" />
              <stop offset="100%" stopColor="#996515" />
            </linearGradient>
          </defs>

          {/* Outer Shield Facet / Aerodynamic Wings */}
          <path 
            d="M50 92L14 36C12 32 15 26 21 26L38 26L50 56L62 26L79 26C85 26 88 32 86 36L50 92Z" 
            fill="url(#wingDarkGradient)" 
            stroke={isDark ? "rgba(218, 165, 32, 0.45)" : "rgba(184, 134, 11, 0.5)"}
            strokeWidth="1.5"
          />

          {/* Inner Golden Precision Chevron Apex */}
          <path 
            d="M50 78L26 36L38 36L50 58L62 36L74 36L50 78Z" 
            fill="url(#goldGradient)" 
          />

          {/* Central Aerodynamic Spear / Horizon Vector */}
          <path 
            d="M50 14L54 28L50 36L46 28L50 14Z" 
            fill="url(#goldAccent)" 
          />

          {/* Subtle Speed Flank Accents */}
          <circle cx="50" cy="22" r="2.5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Typography Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span 
            className={`font-display font-black uppercase ${textSizes[size] || textSizes.md} transition-colors duration-300 ${
              isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'
            }`}
          >
            VELOCITY
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] shadow-[0_0_8px_rgba(184,134,11,0.8)] shrink-0" />
        </div>

        {showTagline && (
          <span className={`text-[9px] font-mono uppercase tracking-[0.28em] font-bold mt-1 ${
            isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'
          }`}>
            AUTOMOTIVE & TECHNOLOGY
          </span>
        )}
      </div>
    </div>
  );
}
