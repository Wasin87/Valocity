import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  Pause, 
  Zap, 
  Gauge, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  Radio, 
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const SUPERCAR_HERO_FLEET = [
  {
    id: 'veh-porsche-911-gt3-rs',
    title: 'Porsche 911 GT3 RS',
    brand: 'Porsche',
    tagline: 'Naturally Aspirated 4.0L Boxer · 9,000 RPM Redline · Aerodynamic Downforce King',
    headline: 'ENGINEERED TO INSPIRE.',
    category: 'Track Supercar',
    price: '$345,000',
    hp: '518 HP',
    accel: '3.0s',
    topSpeed: '296 km/h',
    rpm: '9,000',
    gear: 'PDK 7',
    image: '/src/assets/images/hero_porsche_911_gt3_1794232705362.jpg',
    accentColor: '#C5A878'
  },
  {
    id: 'veh-ferrari-sf90-stradale',
    title: 'Ferrari SF90 Stradale',
    brand: 'Ferrari',
    tagline: 'Twin-Turbo V8 + Tri-Motor PHEV · 4WD Hybrid Torque Vectoring',
    headline: 'BEYOND HYBRID VELOCITY.',
    category: 'Hypercar',
    price: '$585,000',
    hp: '986 HP',
    accel: '2.5s',
    topSpeed: '340 km/h',
    rpm: '8,500',
    gear: 'F1 8-Speed',
    image: '/src/assets/images/car_ferrari_sf90_1794232705765.jpg',
    accentColor: '#E63946'
  },
  {
    id: 'veh-lamborghini-revuelto',
    title: 'Lamborghini Revuelto V12',
    brand: 'Lamborghini',
    tagline: 'Naturally Aspirated 6.5L V12 + 3 Electric Motors · Carbon Monofuselage',
    headline: 'UNLEASH THE REVOLUTION.',
    category: 'Hypercar',
    price: '$604,000',
    hp: '1,001 HP',
    accel: '2.5s',
    topSpeed: '350 km/h',
    rpm: '9,500',
    gear: 'Dual Clutch 8',
    image: '/src/assets/images/car_lamborghini_revuelto_1794234361167.jpg',
    accentColor: '#E0A96D'
  },
  {
    id: 'veh-mclaren-720s-spider',
    title: 'McLaren 720S Spider',
    brand: 'McLaren',
    tagline: '4.0L Twin-Turbo V8 · Monocage II-S Carbon Core · Retractable Hardtop',
    headline: 'LIGHTWEIGHT PRECISION APEX.',
    category: 'Supercar',
    price: '$325,000',
    hp: '710 HP',
    accel: '2.8s',
    topSpeed: '341 km/h',
    rpm: '8,200',
    gear: 'SSG 7-Speed',
    image: '/src/assets/images/car_mclaren_720s_1794234361146.jpg',
    accentColor: '#F77F00'
  },
  {
    id: 'veh-mercedes-g63-amg',
    title: 'Mercedes-AMG G63 Mansory',
    brand: 'Mercedes-Benz',
    tagline: 'Handcrafted 4.0L Biturbo V8 · Satin Stealth Exoskeleton & Carbon Aero',
    headline: 'INDOMITABLE MONOLITH.',
    category: 'Luxury SUV',
    price: '$295,000',
    hp: '585 HP',
    accel: '4.4s',
    topSpeed: '240 km/h',
    rpm: '6,800',
    gear: 'AMG 9G-Tronic',
    image: '/src/assets/images/car_mercedes_g63_1794232705817.jpg',
    accentColor: '#C5A878'
  },
  {
    id: 'veh-tesla-cybertruck-cyberbeast',
    title: 'Tesla Cybertruck Cyberbeast',
    brand: 'Tesla',
    tagline: 'Tri-Motor AWD · Bulletproof Ultra-Hard 30X Cold-Rolled Stainless Steel',
    headline: 'THE FUTURE IS ELECTRIC.',
    category: 'Electric EV',
    price: '$135,000',
    hp: '845 HP',
    accel: '2.6s',
    topSpeed: '210 km/h',
    rpm: '18,500',
    gear: 'Direct Drive',
    image: '/src/assets/images/car_tesla_cybertruck_1794232706141.jpg',
    accentColor: '#A8DADC'
  }
];

export default function CinematicMotionHero({ onNavigate }) {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSpeed, setCurrentSpeed] = useState(254);
  const [currentRpm, setCurrentRpm] = useState(8100);
  const [gForce, setGForce] = useState(1.22);
  const [driveMode, setDriveMode] = useState('TRACK'); // 'TRACK' | 'SPORT' | 'CRUISE'

  const activeCar = SUPERCAR_HERO_FLEET[currentIndex];

  // Dynamic live speedometer & tachometer simulation for authentic moving speed
  useEffect(() => {
    const telemetryInterval = setInterval(() => {
      const baseSpeed = driveMode === 'TRACK' ? 265 : driveMode === 'SPORT' ? 215 : 145;
      const speedJitter = Math.floor(Math.random() * 10) - 5;
      setCurrentSpeed(baseSpeed + speedJitter);

      const baseRpm = driveMode === 'TRACK' ? 8250 : driveMode === 'SPORT' ? 6850 : 3850;
      const rpmJitter = Math.floor(Math.random() * 180) - 90;
      setCurrentRpm(baseRpm + rpmJitter);

      const baseG = driveMode === 'TRACK' ? 1.25 : driveMode === 'SPORT' ? 1.05 : 0.65;
      const gJitter = (Math.random() * 0.1 - 0.05).toFixed(2);
      setGForce(Math.max(0.4, Number(baseG) + Number(gJitter)));
    }, 450);

    return () => clearInterval(telemetryInterval);
  }, [driveMode]);

  // Automatic right-to-left transition every 6 seconds
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SUPERCAR_HERO_FLEET.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SUPERCAR_HERO_FLEET.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SUPERCAR_HERO_FLEET.length) % SUPERCAR_HERO_FLEET.length);
  };

  return (
    <section className={`relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden select-none transition-colors duration-500 ${
      isDark 
        ? 'bg-[#0B0B0D] text-[#F5F4F0] border-b border-[#242426]' 
        : 'bg-[#FFFFFF] text-[#121214] border-b border-[#D4AF37]/25'
    }`}>
      
      {/* 1. FULL-BLEED HERO CANVAS: THE SUPERCAR IMAGE SPANS THE ENTIRE HERO BANNER */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCar.id}
            initial={{ opacity: 0, x: 90, scale: 1.04 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -90, scale: 0.98 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Full-width, full-height car image with micro driving suspension glide */}
            <div className="w-full h-full animate-car-drive">
              <img
                src={activeCar.image}
                alt={activeCar.title}
                className={`w-full h-full object-cover object-center scale-105 transition-all ${
                  !isDark ? 'contrast-[1.08] saturate-[1.06] brightness-[1.02]' : ''
                }`}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Sophisticated Scrims: Dark Mode Deep Black / White Mode White & Deep Golden Left Gradient (Right Side 100% Crisp & Clear) */}
        {isDark ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D] via-[#0B0B0D]/85 via-48% to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/50 via-30% to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#0B0B0D] via-[#0B0B0D]/60 to-transparent" />
          </>
        ) : (
          <>
            {/* Left-side White + Deep Golden Mixed Gradient (Smoothly fades out before reaching car on right) */}
            <div className="absolute inset-y-0 left-0 w-full sm:w-[70%] lg:w-[58%] bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF] via-28% via-[#FAF1D6]/95 via-45% via-[#F5E6BF]/70 via-55% to-transparent" />
            
            {/* Soft Deep Golden Radial Glow on the Left Behind Text */}
            <div className="absolute -top-24 -left-24 w-[480px] h-[480px] bg-[radial-gradient(circle,rgba(218,165,32,0.18)_0%,transparent_70%)] pointer-events-none" />
            
            {/* Subtle bottom gradient restricted to left/bottom to maintain crystal-clear car contrast */}
            <div className="absolute bottom-0 left-0 w-full sm:w-[60%] h-32 bg-gradient-to-t from-[#FFFFFF] via-[#FAF3DF]/50 to-transparent" />
            
            {/* Subtle top header scrim so top controls are sharp */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#FFFFFF]/75 to-transparent" />
          </>
        )}

        {/* 2. REFINED MICRO AERODYNAMIC SPEED LINES (SHORT & DELICATE, RIGHT-TO-LEFT) */}
        {/* Subtle, thin 1px horizontal micro-streaks whizzing right to left */}
        <div className="absolute top-[38%] left-0 right-0 h-px pointer-events-none overflow-hidden">
          <div className={`h-full animate-streak-1 ${
            isDark 
              ? 'bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-transparent' 
              : 'bg-gradient-to-l from-transparent via-[#B8860B]/70 to-transparent'
          }`} />
        </div>
        <div className="absolute top-[54%] left-0 right-0 h-px pointer-events-none overflow-hidden">
          <div className="h-full bg-gradient-to-l from-transparent via-[#E5BE5E]/70 to-transparent animate-streak-2" />
        </div>
        <div className="absolute top-[70%] left-0 right-0 h-px pointer-events-none overflow-hidden">
          <div className={`h-full animate-streak-3 ${
            isDark 
              ? 'bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-transparent' 
              : 'bg-gradient-to-l from-transparent via-[#B8860B]/60 to-transparent'
          }`} />
        </div>

        {/* Subtle, fine micro-dashed highway motion line at the bottom */}
        <div className="absolute bottom-24 sm:bottom-28 left-0 right-0 h-0.5 opacity-40">
          <div className={`w-full h-full ${driveMode === 'TRACK' ? 'animate-road-move-fast' : 'animate-road-move'}`} />
        </div>
      </div>

      {/* 3. OVERLAID TOP CONTROLS: VIP ALLOCATION STATUS & DRIVE MODE */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 w-full">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
          
          {/* Brand & Division Badge */}
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#B8860B] animate-ping" />
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full backdrop-blur-xl border transition-all ${
              isDark
                ? 'bg-[#0B0B0D]/85 border-[#B8860B]/30 shadow-lg'
                : 'bg-white/95 border-[#B8860B]/40 shadow-sm'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
              <span className={`text-[11px] font-mono font-bold tracking-[0.25em] uppercase ${
                isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'
              }`}>
                VELOCITY LIVE ALLOCATION SHOWROOM
              </span>
            </div>
          </div>

          {/* Interactive Drive Mode Selector (TRACK / SPORT / CRUISE) */}
          <div className={`flex items-center gap-2 p-1 rounded-xl backdrop-blur-xl border transition-all ${
            isDark 
              ? 'bg-[#0B0B0D]/85 border-[#242426]' 
              : 'bg-white/95 border-[#B8860B]/30 shadow-sm'
          }`}>
            <span className={`text-[10px] font-mono uppercase px-2 ${
              isDark ? 'text-[#A7A9AC]' : 'text-[#6B5A33]'
            }`}>
              DRIVE MODE:
            </span>
            {['CRUISE', 'SPORT', 'TRACK'].map((mode) => (
              <button
                key={mode}
                onClick={() => setDriveMode(mode)}
                className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  driveMode === mode
                    ? 'bg-gradient-to-r from-[#B8860B] via-[#E5BE5E] to-[#996515] text-[#FFFFFF] shadow-[0_0_14px_rgba(184,134,11,0.4)]'
                    : isDark 
                      ? 'text-[#A7A9AC] hover:text-[#F5F4F0]' 
                      : 'text-[#6B5A33] hover:text-[#121214]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Auto-Slide Carousel Controls & Counter */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#0B0B0D]/85 border-[#242426] text-[#A7A9AC] hover:text-[#D4AF37] hover:border-[#D4AF37]/40'
                  : 'bg-white/95 border-[#B8860B]/30 text-[#6B5A33] hover:text-[#85570D] hover:border-[#B8860B] shadow-sm'
              }`}
              title={isPlaying ? "Pause Auto Carousel" : "Play Auto Carousel"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handlePrev}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#0B0B0D]/85 border-[#242426] text-[#A7A9AC] hover:text-[#D4AF37] hover:border-[#D4AF37]/40'
                  : 'bg-white/95 border-[#B8860B]/30 text-[#6B5A33] hover:text-[#85570D] hover:border-[#B8860B] shadow-sm'
              }`}
              title="Previous Car"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleNext}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#0B0B0D]/85 border-[#242426] text-[#A7A9AC] hover:text-[#D4AF37] hover:border-[#D4AF37]/40'
                  : 'bg-white/95 border-[#B8860B]/30 text-[#6B5A33] hover:text-[#85570D] hover:border-[#B8860B] shadow-sm'
              }`}
              title="Next Car"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <span className={`text-xs font-mono font-bold px-1.5 ${
              isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'
            }`}>
              0{currentIndex + 1} / 0{SUPERCAR_HERO_FLEET.length}
            </span>
          </div>

        </div>
      </div>

      {/* 4. OVERLAID HERO CONTENT & BUTTONS (DIRECTLY ON TOP OF FULL-BLEED IMAGE ON THE LEFT) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full py-6">
        <div className="max-w-2xl lg:max-w-3xl space-y-6">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCar.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              {/* Category & Valuation Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-3.5 py-1 rounded-full backdrop-blur-md border font-mono text-xs font-bold uppercase tracking-[0.2em] ${
                  isDark
                    ? 'bg-[#0B0B0D]/85 border-[#B8860B]/40 text-[#D4AF37]'
                    : 'bg-white/95 border-[#B8860B]/40 text-[#85570D] shadow-xs'
                }`}>
                  {activeCar.brand} · {activeCar.category}
                </span>

                <span className={`px-3.5 py-1 rounded-full backdrop-blur-md border font-mono text-xs font-extrabold ${
                  isDark
                    ? 'bg-[#0B0B0D]/85 border-[#242426] text-[#F5F4F0]'
                    : 'bg-white/95 border-[#B8860B]/30 text-[#121214] shadow-xs'
                }`}>
                  {activeCar.price}
                </span>

                <span className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] font-bold ${
                  isDark
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                    : 'bg-emerald-50 border border-emerald-300 text-emerald-700 shadow-xs'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5" /> 150-Point Certified Verified
                </span>
              </div>

              {/* Dramatic Headline */}
              <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight leading-[1.04] drop-shadow-sm ${
                isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'
              }`}>
                {activeCar.title}
              </h1>

              {/* Subtitle / Engineering provenance */}
              <p className={`text-sm sm:text-base max-w-xl font-light leading-relaxed ${
                isDark ? 'text-[#A7A9AC]' : 'text-[#4A4740]'
              }`}>
                {activeCar.tagline}. Immediate private allocation with fully insured white-glove enclosed transporter delivery.
              </p>

              {/* Real-time Telemetry HUD Card Overlaid on Left */}
              <div className={`p-4 rounded-2xl backdrop-blur-xl inline-flex flex-wrap items-center gap-6 font-mono text-xs transition-all ${
                isDark
                  ? 'bg-[#0B0B0D]/85 border border-[#242426] shadow-2xl'
                  : 'gold-white-card border border-[#B8860B]/35 shadow-xl'
              }`}>
                <div>
                  <span className={`text-[10px] uppercase block ${
                    isDark ? 'text-[#A7A9AC]' : 'text-[#7D530C]'
                  }`}>
                    Virtual Speed
                  </span>
                  <span className={`text-xl sm:text-2xl font-extrabold tracking-wider ${
                    isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'
                  }`}>
                    {currentSpeed} <span className={`text-xs font-light ${
                      isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'
                    }`}>KM/H</span>
                  </span>
                </div>

                <div className={`h-8 w-px ${
                  isDark ? 'bg-[#242426]' : 'bg-[#B8860B]/30'
                }`} />

                <div>
                  <span className={`text-[10px] uppercase block ${
                    isDark ? 'text-[#A7A9AC]' : 'text-[#7D530C]'
                  }`}>
                    Tachometer
                  </span>
                  <span className={`text-xl sm:text-2xl font-extrabold tracking-wider ${
                    isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'
                  }`}>
                    {currentRpm.toLocaleString()} <span className={`text-xs font-light ${
                      isDark ? 'text-[#A7A9AC]' : 'text-[#7D530C]'
                    }`}>RPM</span>
                  </span>
                </div>

                <div className={`h-8 w-px ${
                  isDark ? 'bg-[#242426]' : 'bg-[#B8860B]/30'
                }`} />

                <div>
                  <span className={`text-[10px] uppercase block ${
                    isDark ? 'text-[#A7A9AC]' : 'text-[#7D530C]'
                  }`}>
                    Brake Power
                  </span>
                  <span className={`text-xl sm:text-2xl font-extrabold tracking-wider ${
                    isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'
                  }`}>
                    {activeCar.hp}
                  </span>
                </div>

                <div className={`h-8 w-px ${
                  isDark ? 'bg-[#242426]' : 'bg-[#B8860B]/30'
                }`} />

                <div>
                  <span className={`text-[10px] uppercase block ${
                    isDark ? 'text-[#A7A9AC]' : 'text-[#7D530C]'
                  }`}>
                    0-100 Accel
                  </span>
                  <span className={`text-xl sm:text-2xl font-extrabold tracking-wider ${
                    isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'
                  }`}>
                    {activeCar.accel}
                  </span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Action Buttons Directly Overlaid on Left */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate(`/cars/${activeCar.id}`)}
              className="group px-8 py-4 bg-gradient-to-r from-[#B8860B] via-[#E5BE5E] to-[#996515] hover:brightness-110 text-[#FFFFFF] font-extrabold uppercase tracking-[0.15em] text-xs rounded-xl shadow-2xl shadow-[#B8860B]/35 flex items-center gap-3 transition-all hover:scale-105 cursor-pointer font-mono"
            >
              <span>EXPLORE & RESERVE ALLOCATION</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onNavigate('/cars')}
              className={`px-7 py-4 font-bold uppercase tracking-[0.15em] text-xs rounded-xl border backdrop-blur-xl transition-all flex items-center gap-2.5 cursor-pointer font-mono ${
                isDark 
                  ? 'bg-[#0B0B0D]/85 hover:bg-[#171719] text-[#F5F4F0] border-[#242426] hover:border-[#D4AF37]/50 shadow-xl' 
                  : 'bg-white/95 hover:bg-[#FAF3DF] text-[#121214] border-[#B8860B]/40 hover:border-[#B8860B] shadow-sm'
              }`}
            >
              <span>EXPLORE ALL VEHICLES</span>
              <ChevronRight className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'}`} />
            </button>
          </div>

        </div>
      </div>

      {/* 5. CONTINUOUS RIGHT-TO-LEFT CAROUSEL MARQUEE STRIP (BOTTOM NAVIGATOR) */}
      <div className={`relative z-20 w-full backdrop-blur-xl py-3.5 overflow-hidden transition-colors ${
        isDark 
          ? 'bg-[#0B0B0D]/90 border-t border-[#242426]' 
          : 'bg-white/95 border-t border-[#B8860B]/30 shadow-lg'
      }`}>
        
        {/* Header ticker bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2.5 flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] animate-pulse" />
            <span className={`uppercase tracking-[0.2em] font-bold ${
              isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'
            }`}>
              SUPERCAR FLEET CAROUSEL (RIGHT → LEFT SCROLL)
            </span>
          </div>

          <div className={`flex items-center gap-3 ${isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'}`}>
            <span className="hidden sm:inline-block">Click any vehicle to switch background banner</span>
            <button
              onClick={() => onNavigate('/cars')}
              className={`font-bold uppercase transition-colors flex items-center gap-1 cursor-pointer ${
                isDark ? 'text-[#D4AF37] hover:text-[#F5F4F0]' : 'text-[#85570D] hover:text-[#121214]'
              }`}
            >
              Fleet Catalog ({SUPERCAR_HERO_FLEET.length}) <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Continuous Right-to-Left Infinite Scrolling Carousel Strip */}
        <div className="overflow-hidden w-full relative">
          <div className="animate-marquee-rtl flex gap-3.5 px-4 hover:[animation-play-state:paused]">
            {/* Duplicated array for seamless continuous right-to-left loop */}
            {[...SUPERCAR_HERO_FLEET, ...SUPERCAR_HERO_FLEET].map((car, idx) => {
              const isSelected = activeCar.id === car.id;
              return (
                <div
                  key={`${car.id}-${idx}`}
                  onClick={() => setCurrentIndex(idx % SUPERCAR_HERO_FLEET.length)}
                  className={`group relative w-60 sm:w-64 p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 flex items-center gap-3 ${
                    isSelected
                      ? isDark
                        ? 'bg-[#171719] border-[#B8860B] shadow-[0_0_20px_rgba(184,134,11,0.35)]'
                        : 'bg-gradient-to-r from-[#FFFFFF] to-[#FAF3DF] border-[#B8860B] shadow-[0_4px_20px_rgba(184,134,11,0.25)]'
                      : isDark
                        ? 'bg-[#0B0B0D]/80 border-[#242426] hover:border-[#B8860B]/50 hover:bg-[#171719]'
                        : 'bg-white/90 border-[#B8860B]/20 hover:border-[#B8860B]/60 hover:bg-[#FAF3DF] shadow-xs'
                  }`}
                >
                  {/* Thumbnail Image */}
                  <div className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border relative ${
                    isDark ? 'bg-[#171719] border-[#242426]' : 'bg-[#FAF3DF] border-[#B8860B]/30'
                  }`}>
                    <img 
                      src={car.image} 
                      alt={car.title} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#B8860B]/25 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-[#B8860B]" />
                      </div>
                    )}
                  </div>

                  {/* Car Details */}
                  <div className="flex-1 min-w-0">
                    <span className={`text-[9px] font-mono uppercase tracking-widest block truncate ${
                      isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'
                    }`}>
                      {car.brand}
                    </span>
                    <h4 className={`text-xs font-bold font-display transition-colors truncate ${
                      isDark 
                        ? 'text-[#F5F4F0] group-hover:text-[#D4AF37]' 
                        : 'text-[#121214] group-hover:text-[#85570D]'
                    }`}>
                      {car.title}
                    </h4>
                    <div className={`flex items-center gap-2 mt-0.5 text-[10px] font-mono ${
                      isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'
                    }`}>
                      <span>{car.hp}</span>
                      <span className="opacity-40">·</span>
                      <span className={`font-bold ${
                        isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'
                      }`}>
                        {car.price}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Timing Progress Bar */}
        <div className={`w-full h-0.5 mt-2.5 ${isDark ? 'bg-[#242426]' : 'bg-[#B8860B]/25'}`}>
          <motion.div
            key={currentIndex}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 6, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-[#B8860B] via-[#E5BE5E] to-[#996515]"
          />
        </div>

      </div>

    </section>
  );
}
