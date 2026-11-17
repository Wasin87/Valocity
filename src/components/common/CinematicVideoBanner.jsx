import React, { useRef, useState } from 'react';
import { ArrowRight, Volume2, VolumeX, Zap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function CinematicVideoBanner({
  title = "THE FUTURE IS ELECTRIC.",
  subtitle = "TESLA CYBERTRUCK CYBERBEAST & HYPERCAR EV",
  desc = "Pioneering the next era of silent dominance with 1,020 HP instant electric torque, quad-motor all-wheel steering, and Grade 5 armor titanium integration.",
  videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-futuristic-car-driving-through-a-neon-tunnel-41478-large.mp4",
  ctaText = "EXPLORE EV FLEET",
  onCtaClick
}) {
  const { isDark } = useTheme();
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className={`relative w-full min-h-[540px] flex items-center overflow-hidden border-y select-none transition-colors duration-500 ${
      isDark 
        ? 'border-[#242426] bg-[#0B0B0D]' 
        : 'border-[#B8860B]/30 bg-gradient-to-br from-[#FFFFFF] via-[#FDF8ED] to-[#F7EAC7]'
    }`}>
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className={`w-full h-full object-cover scale-105 transition-opacity duration-700 ${
            isDark 
              ? 'opacity-65' 
              : 'opacity-35 mix-blend-multiply contrast-125'
          }`}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {/* Sophisticated Scrim Overlay (Adaptive Dark vs White/Gold) */}
        {isDark ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D] via-[#0B0B0D]/85 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-[#0B0B0D]/50" />
          </>
        ) : (
          <>
            {/* Aesthetic Deep Gold and White Gradients for Light Mode */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFFFFF] via-[#FAF2DD]/95 via-45% to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF]/90 via-transparent to-[#FFFFFF]/60" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.18),transparent_70%)]" />
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-2xl space-y-6">
          
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full backdrop-blur-md border transition-all ${
            isDark 
              ? 'bg-[#171719]/90 border-[#B8860B]/30 shadow-lg' 
              : 'bg-white/95 border-[#B8860B]/40 shadow-sm'
          }`}>
            <Zap className={`w-3.5 h-3.5 ${isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'}`} />
            <span className={`text-[11px] font-mono font-bold uppercase tracking-[0.2em] ${
              isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'
            }`}>
              {subtitle}
            </span>
          </div>

          <h2 className={`text-3xl sm:text-6xl font-extrabold font-display tracking-tight leading-tight ${
            isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'
          }`}>
            {title}
          </h2>

          <p className={`text-base sm:text-lg font-light leading-relaxed ${
            isDark ? 'text-[#A7A9AC]' : 'text-[#4A4740]'
          }`}>
            {desc}
          </p>

          <div className="flex items-center gap-4 pt-3">
            <button
              onClick={onCtaClick}
              className="px-8 py-4 bg-gradient-to-r from-[#B8860B] via-[#E5BE5E] to-[#996515] hover:brightness-110 text-[#FFFFFF] font-extrabold uppercase tracking-[0.15em] text-xs rounded-xl shadow-2xl shadow-[#B8860B]/35 flex items-center gap-3 transition-all hover:scale-105 cursor-pointer font-mono"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={toggleMute}
              className={`p-4 rounded-xl border backdrop-blur-md transition-all cursor-pointer ${
                isDark 
                  ? 'bg-[#171719]/80 border-[#242426] text-[#A7A9AC] hover:text-[#D4AF37]' 
                  : 'bg-white/95 border-[#B8860B]/35 text-[#85570D] hover:bg-[#FAF3DE] shadow-sm'
              }`}
              title={isMuted ? "Unmute sound" : "Mute sound"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}
