import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, ArrowRight, ArrowLeftRight, Eye, ShieldCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const BANNER_SLIDES = [
  {
    id: "veh-porsche-911-gt3-rs",
    title: "Porsche 911 GT3 RS",
    brand: "Porsche",
    tagline: "Atmospheric Precision · 9,000 RPM Flat-6",
    price: "$345,000",
    hp: "518 HP",
    speed: "296 km/h",
    category: "Supercar",
    image: "/src/assets/images/hero_porsche_911_gt3_1794232705362.jpg"
  },
  {
    id: "veh-ferrari-sf90-stradale",
    title: "Ferrari SF90 Stradale",
    brand: "Ferrari",
    tagline: "Plug-in Hybrid V8 · Maranello Flagship",
    price: "$585,000",
    hp: "986 HP",
    speed: "340 km/h",
    category: "Supercar",
    image: "/src/assets/images/car_ferrari_sf90_1794232705765.jpg"
  },
  {
    id: "veh-mclaren-720s-spider",
    title: "McLaren 720S Spider",
    brand: "McLaren",
    tagline: "Carbon Proactive Chassis · Twin Turbo",
    price: "$325,000",
    hp: "710 HP",
    speed: "341 km/h",
    category: "Supercar",
    image: "/src/assets/images/car_mclaren_720s_1794234361146.jpg"
  },
  {
    id: "veh-lamborghini-revuelto",
    title: "Lamborghini Revuelto V12",
    brand: "Lamborghini",
    tagline: "Naturally Aspirated V12 + 3 Electric Motors",
    price: "$604,000",
    hp: "1,001 HP",
    speed: "350 km/h",
    category: "Hypercar",
    image: "/src/assets/images/car_lamborghini_revuelto_1794234361167.jpg"
  },
  {
    id: "veh-mercedes-g63-amg",
    title: "Mercedes-AMG G63 Mansory",
    brand: "Mercedes-Benz",
    tagline: "Satin Night Black · Handbuilt Biturbo V8",
    price: "$295,000",
    hp: "585 HP",
    speed: "240 km/h",
    category: "Luxury SUV",
    image: "/src/assets/images/car_mercedes_g63_1794232705817.jpg"
  },
  {
    id: "veh-tesla-cybertruck-cyberbeast",
    title: "Tesla Cybertruck Cyberbeast",
    brand: "Tesla",
    tagline: "Raw Armor Steel Exoskeleton · Tri-Motor AWD",
    price: "$135,000",
    hp: "845 HP",
    speed: "210 km/h",
    category: "Electric",
    image: "/src/assets/images/car_tesla_cybertruck_1794232706141.jpg"
  }
];

export default function AestheticImageBanner({ onNavigate }) {
  const { isDark } = useTheme();
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState('right-to-left'); // Default Right-to-Left as requested
  const scrollRef = useRef(null);

  // Auto-scroll ticker
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const scrollAmount = direction === 'right-to-left' ? 420 : -420;
        
        if (direction === 'right-to-left') {
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
          }
        } else {
          if (scrollLeft <= 10) {
            scrollRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
          }
        }
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isPaused, direction]);

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  const toggleDirection = () => {
    setDirection(prev => prev === 'left-to-right' ? 'right-to-left' : 'left-to-right');
  };

  return (
    <section className={`relative py-20 border-b overflow-hidden select-none transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0D] border-[#242426]' : 'bg-[#FFFFFF] border-[#D4AF37]/25'
    }`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-2 transition-all ${
              isDark 
                ? 'bg-[#171719] border-[#B8860B]/30 text-[#D4AF37] shadow-lg' 
                : 'bg-white/95 border-[#B8860B]/40 text-[#85570D] shadow-xs'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>EDITORIAL MULTI-IMAGE CAROUSEL BANNER</span>
            </div>
            <h2 className={`text-3xl sm:text-5xl font-extrabold font-display tracking-tight ${
              isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'
            }`}>
              Extraordinary Fleet Gallery
            </h2>
          </div>

          {/* Interactive Banner Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDirection}
              className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isDark 
                  ? 'bg-[#171719] border-[#242426] text-[#A7A9AC] hover:text-[#D4AF37] hover:border-[#B8860B]/50 shadow-xl' 
                  : 'bg-white/95 border-[#B8860B]/35 text-[#55524B] hover:text-[#85570D] hover:border-[#B8860B] shadow-xs'
              }`}
              title="Toggle Scroll Direction"
            >
              <ArrowLeftRight className="w-4 h-4 text-[#B8860B]" />
              <span>{direction === 'left-to-right' ? 'Left → Right' : 'Right → Left'}</span>
            </button>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-[#171719] border-[#242426] text-[#A7A9AC] hover:text-[#D4AF37] hover:border-[#B8860B]/50 shadow-xl' 
                  : 'bg-white/95 border-[#B8860B]/35 text-[#55524B] hover:text-[#85570D] hover:border-[#B8860B] shadow-xs'
              }`}
              title={isPaused ? "Resume Auto Scroll" : "Pause Auto Scroll"}
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-[#171719] border-[#242426] text-[#A7A9AC] hover:text-[#C5A878] hover:border-[#C5A878]/50 shadow-xl' 
                    : 'bg-white/95 border-[#D4AF37]/30 text-[#6B7280] hover:text-[#9C7823] hover:border-[#D4AF37] shadow-xs'
                }`}
                title="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-[#171719] border-[#242426] text-[#A7A9AC] hover:text-[#C5A878] hover:border-[#C5A878]/50 shadow-xl' 
                    : 'bg-white/95 border-[#D4AF37]/30 text-[#6B7280] hover:text-[#9C7823] hover:border-[#D4AF37] shadow-xs'
                }`}
                title="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Multi-Image Scrolling Track */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pt-2 pb-6 snap-x snap-mandatory"
        >
          {BANNER_SLIDES.map((slide, idx) => (
            <motion.div
              key={slide.id + '-' + idx}
              onClick={() => onNavigate(`/cars/${slide.id}`)}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="group relative w-[340px] sm:w-[480px] aspect-[16/10] rounded-3xl overflow-hidden border border-[#242426] bg-[#171719] cursor-pointer shrink-0 snap-start shadow-2xl glass-card-hover"
            >
              {/* Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Gradient Overlay Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/40 to-transparent opacity-95 group-hover:opacity-80 transition-opacity" />

              {/* Top Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 bg-[#0B0B0D]/85 backdrop-blur-md border border-[#242426] text-[#C5A878] font-mono text-[10px] font-bold uppercase tracking-widest rounded-lg">
                  {slide.category}
                </span>

                <span className="px-3 py-1 bg-[#0B0B0D]/85 backdrop-blur-md border border-[#242426] text-[#F5F4F0] font-mono text-[11px] font-extrabold rounded-lg">
                  {slide.price}
                </span>
              </div>

              {/* Bottom Details Card Overlay */}
              <div className={`absolute bottom-5 left-5 right-5 p-5 rounded-2xl backdrop-blur-xl space-y-2 transition-all ${
                isDark 
                  ? 'bg-[#0B0B0D]/85 border border-[#242426]' 
                  : 'gold-white-card border border-[#B8860B]/35 shadow-lg'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono uppercase tracking-[0.2em] font-bold ${
                    isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'
                  }`}>
                    {slide.brand}
                  </span>
                  <div className={`flex items-center gap-3 text-[11px] font-mono ${
                    isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'
                  }`}>
                    <span>{slide.hp}</span>
                    <span className="opacity-40">·</span>
                    <span>{slide.speed}</span>
                  </div>
                </div>

                <h3 className={`text-lg sm:text-xl font-bold font-display transition-colors truncate ${
                  isDark 
                    ? 'text-[#F5F4F0] group-hover:text-[#D4AF37]' 
                    : 'text-[#121214] group-hover:text-[#85570D]'
                }`}>
                  {slide.title}
                </h3>

                <p className={`text-xs font-light truncate ${
                  isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'
                }`}>
                  {slide.tagline}
                </p>

                <div className={`pt-2 flex items-center justify-between text-xs font-mono font-bold border-t mt-2 ${
                  isDark 
                    ? 'text-[#D4AF37] border-[#242426]' 
                    : 'text-[#85570D] border-[#B8860B]/30'
                }`}>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> View Specifications
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Scroll Progress & Status Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-[#A7A9AC]/70 pt-2 border-t border-[#242426]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A878] animate-pulse"></span>
            <span>{isPaused ? 'Auto-Scroll Paused (Hovering)' : `Auto-Scrolling (${direction})`}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#C5A878] font-bold">
            <ShieldCheck className="w-4 h-4" /> VELOCITY Official Showroom Registry
          </div>
        </div>

      </div>

    </section>
  );
}
