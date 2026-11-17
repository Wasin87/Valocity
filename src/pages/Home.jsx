import React, { useState, useEffect } from 'react';
import { getVehiclesFromStore, getProductsFromStore } from '../services/marketplaceService';
import CinematicMotionHero from '../components/common/CinematicMotionHero';
import AestheticImageBanner from '../components/common/AestheticImageBanner';
import CinematicVideoBanner from '../components/common/CinematicVideoBanner';
import VehicleCarousel from '../components/common/VehicleCarousel';
import TechCarousel from '../components/common/TechCarousel';
import { 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Check 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Home({ onNavigate, setToast }) {
  const { isDark } = useTheme();
  const [allVehicles, setAllVehicles] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    async function loadData() {
      const v = await getVehiclesFromStore();
      const p = await getProductsFromStore();
      setAllVehicles(v);
      setAllProducts(p);
    }
    loadData();
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      if (setToast) setToast({ message: 'Registered on VELOCITY VIP Registry', type: 'success' });
      setNewsletterEmail('');
    }
  };

  const supercarsList = allVehicles.filter(v => v.category === 'Supercar' || v.featured);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0D] text-[#F5F4F0]' : 'bg-[#FFFFFF] text-[#121214]'
    }`}>
      
      {/* 1. ULTRA-LUXURY DYNAMIC CINEMATIC MOTION HERO BANNER (RIGHT-TO-LEFT MOVING SUPERCAR) */}
      <CinematicMotionHero onNavigate={onNavigate} />

      {/* 2. BRAND PARTNERS MARQUEE */}
      <section className={`py-8 border-b overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#0B0B0D] border-[#242426]/70' : 'bg-[#FFFFFF] border-[#D4AF37]/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#A7A9AC] text-center mb-6">
            AUTHORIZED LUXURY MANUFACTURERS & OFF-MARKET ALLOCATIONS
          </p>

          <div className="flex items-center justify-between gap-8 opacity-75 grayscale hover:grayscale-0 transition-all duration-500 overflow-x-auto no-scrollbar py-2 text-xs font-mono font-bold tracking-[0.2em] text-[#A7A9AC]">
            <span className="hover:text-[#F5F4F0] shrink-0">PORSCHE</span>
            <span className="text-[#B8860B] font-bold shrink-0">·</span>
            <span className="hover:text-[#F5F4F0] shrink-0">FERRARI</span>
            <span className="text-[#B8860B] font-bold shrink-0">·</span>
            <span className="hover:text-[#F5F4F0] shrink-0">MCLAREN</span>
            <span className="text-[#B8860B] font-bold shrink-0">·</span>
            <span className="hover:text-[#F5F4F0] shrink-0">LAMBORGHINI</span>
            <span className="text-[#B8860B] font-bold shrink-0">·</span>
            <span className="hover:text-[#F5F4F0] shrink-0">MERCEDES-AMG</span>
            <span className="text-[#B8860B] font-bold shrink-0">·</span>
            <span className="hover:text-[#F5F4F0] shrink-0">TESLA</span>
            <span className="text-[#B8860B] font-bold shrink-0">·</span>
            <span className="hover:text-[#F5F4F0] shrink-0">APPLE PRO</span>
            <span className="text-[#B8860B] font-bold shrink-0">·</span>
            <span className="hover:text-[#F5F4F0] shrink-0">HASSELBLAD</span>
          </div>
        </div>
      </section>

      {/* 3. MULTI-IMAGE AESTHETIC SCROLL BANNER (LEFT-TO-RIGHT) */}
      <AestheticImageBanner onNavigate={onNavigate} />

      {/* 4. HORIZONTAL SUPERCAR FLEET CAROUSEL */}
      <section className={`py-20 border-b transition-colors duration-500 ${
        isDark ? 'bg-[#0B0B0D] border-[#242426]' : 'bg-[#FFFFFF] border-[#D4AF37]/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VehicleCarousel 
            vehicles={supercarsList.length > 0 ? supercarsList : allVehicles}
            title="Supercars & High-Performance Fleet"
            subtitle="CURATED AUTOMOTIVE SHOWROOM"
            onNavigate={onNavigate}
          />
        </div>
      </section>

      {/* 5. IMMERSIVE AUTOMOTIVE COLLECTIONS (EDITORIAL ASYMMETRIC GRID) */}
      <section className={`py-24 border-b transition-colors duration-500 ${
        isDark ? 'bg-[#0B0B0D] border-[#242426]' : 'bg-[#FFFFFF] border-[#D4AF37]/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className={`text-[11px] font-mono uppercase tracking-[0.2em] font-bold ${
                isDark ? 'text-[#C5A878]' : 'text-[#9C7823]'
              }`}>
                Immersive Classes
              </span>
              <h2 className={`text-3xl sm:text-5xl font-extrabold font-display mt-1.5 tracking-tight ${
                isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'
              }`}>
                Explore by Vehicle Class
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/cars')}
              className={`text-xs font-mono font-bold uppercase transition-colors flex items-center gap-1.5 tracking-wider cursor-pointer ${
                isDark ? 'text-[#C5A878] hover:text-[#F5F4F0]' : 'text-[#9C7823] hover:text-[#121214]'
              }`}
            >
              Browse Full Inventory <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Card 1: Supercars (7 cols) */}
            <div 
              onClick={() => onNavigate('/cars?category=Supercar')}
              className={`md:col-span-7 group relative aspect-[16/9] rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? 'border-[#25252A] hover:border-[#B8860B]/65 bg-[#131316] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)]'
                  : 'border-[#B8860B]/30 hover:border-[#B8860B] bg-white shadow-[0_12px_30px_-14px_rgba(184,134,11,0.2)]'
              }`}
            >
              <img
                src="/src/assets/images/hero_porsche_911_gt3_1794232705362.jpg"
                alt="Supercars"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E5BE5E] font-bold block">BEYOND PERFORMANCE</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Supercars & Hypercars</h3>
                  <p className="text-xs text-neutral-300 max-w-md font-light">Naturally aspirated flat-sixes, hybrid twin-turbo V8s, and active track aerodynamics.</p>
                </div>
                <span className="w-10 h-10 rounded-full border border-[#D4AF37]/50 bg-black/45 backdrop-blur-md text-[#E5BE5E] flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37] group-hover:text-[#0B0B0D] transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Card 2: Luxury SUVs (5 cols) */}
            <div 
              onClick={() => onNavigate('/cars?category=SUV')}
              className={`md:col-span-5 group relative aspect-[16/9] md:aspect-auto rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? 'border-[#25252A] hover:border-[#B8860B]/65 bg-[#131316] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)]'
                  : 'border-[#B8860B]/30 hover:border-[#B8860B] bg-white shadow-[0_12px_30px_-14px_rgba(184,134,11,0.2)]'
              }`}
            >
              <img
                src="/src/assets/images/car_mercedes_g63_1794232705817.jpg"
                alt="Luxury SUVs"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E5BE5E] font-bold block">UNSTOPPABLE ICON</span>
                  <h3 className="text-2xl font-extrabold font-display text-white">Mercedes-AMG G63 & SUVs</h3>
                  <p className="text-xs text-neutral-300 font-light">Command every terrain with satin matte finishes and V8 Biturbo power.</p>
                </div>
                <span className="w-10 h-10 rounded-full border border-[#D4AF37]/50 bg-black/45 backdrop-blur-md text-[#E5BE5E] flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37] group-hover:text-[#0B0B0D] transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Card 3: Electric Hypercars (5 cols) */}
            <div 
              onClick={() => onNavigate('/cars?category=Electric')}
              className={`md:col-span-5 group relative aspect-[16/9] md:aspect-auto rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? 'border-[#25252A] hover:border-[#B8860B]/65 bg-[#131316] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)]'
                  : 'border-[#B8860B]/30 hover:border-[#B8860B] bg-white shadow-[0_12px_30px_-14px_rgba(184,134,11,0.2)]'
              }`}
            >
              <img
                src="/src/assets/images/car_tesla_cybertruck_1794232706141.jpg"
                alt="EV Fleet"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E5BE5E] font-bold block">SILENT DOMINANCE</span>
                  <h3 className="text-2xl font-extrabold font-display text-white">Tesla Cybertruck & EVs</h3>
                  <p className="text-xs text-neutral-300 font-light">Tri-motor Cyberbeast exoskeletons and instantaneous 1,000+ Nm torque.</p>
                </div>
                <span className="w-10 h-10 rounded-full border border-[#D4AF37]/50 bg-black/45 backdrop-blur-md text-[#E5BE5E] flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37] group-hover:text-[#0B0B0D] transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Card 4: Ferrari & Italian Exotic (7 cols) */}
            <div 
              onClick={() => onNavigate('/cars?category=Supercar')}
              className={`md:col-span-7 group relative aspect-[16/9] rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? 'border-[#25252A] hover:border-[#B8860B]/65 bg-[#131316] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)]'
                  : 'border-[#B8860B]/30 hover:border-[#B8860B] bg-white shadow-[0_12px_30px_-14px_rgba(184,134,11,0.2)]'
              }`}
            >
              <img
                src="/src/assets/images/car_ferrari_sf90_1794232705765.jpg"
                alt="Ferrari"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E5BE5E] font-bold block">MARANELLO PASSION</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Ferrari SF90 Stradale</h3>
                  <p className="text-xs text-neutral-300 max-w-md font-light">Plug-in hybrid track technology delivering 986 HP to all four wheels.</p>
                </div>
                <span className="w-10 h-10 rounded-full border border-[#D4AF37]/50 bg-black/45 backdrop-blur-md text-[#E5BE5E] flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37] group-hover:text-[#0B0B0D] transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. CINEMATIC FULL-WIDTH VIDEO BANNER FOR ELECTRIC FUTURE */}
      <CinematicVideoBanner 
        title="THE FUTURE IS ELECTRIC."
        subtitle="TESLA CYBERTRUCK CYBERBEAST & HYPERCAR EV"
        desc="Pioneering the next era of silent dominance with 1,020 HP instant electric torque, quad-motor all-wheel steering, and Grade 5 armor titanium integration."
        videoUrl="https://assets.mixkit.co/videos/preview/mixkit-futuristic-car-driving-through-a-neon-tunnel-41478-large.mp4"
        ctaText="EXPLORE EV FLEET"
        onCtaClick={() => onNavigate('/cars?category=Electric')}
      />

      {/* 7. APPLE & SONY FLAGSHIP HARDWARE CAROUSEL */}
      <section className={`py-24 border-b transition-colors duration-500 ${
        isDark ? 'bg-[#0B0B0D] border-[#242426]' : 'bg-[#FFFFFF] border-[#D4AF37]/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TechCarousel 
            products={allProducts}
            title="Flagship Technology Suite"
            subtitle="APPLE & SONY PRO HARDWARE"
            onNavigate={onNavigate}
          />
        </div>
      </section>

      {/* 8. WHY VELOCITY - LUXURY SERVICE STANDARDS */}
      <section className={`py-24 border-b transition-colors duration-500 ${
        isDark ? 'bg-[#0B0B0D] border-[#242426]' : 'bg-[#FFFFFF] border-[#D4AF37]/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className={`text-[11px] font-mono uppercase tracking-[0.2em] font-bold ${
              isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'
            }`}>
              Unmatched Standards
            </span>
            <h2 className={`text-3xl sm:text-4xl font-extrabold font-display ${
              isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'
            }`}>
              Why Collectors Choose Velocity
            </h2>
            <p className={`text-sm font-light ${
              isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'
            }`}>
              We transcend traditional dealerships with bespoke luxury protocols designed for absolute confidence and discretion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`group relative p-8 rounded-2xl border space-y-5 transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
              isDark
                ? 'bg-[#131316] border-[#25252A] hover:border-[#B8860B]/60 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.85)]'
                : 'bg-gradient-to-b from-[#FFFFFF] to-[#FDF8EA] border-[#B8860B]/25 hover:border-[#B8860B]/65 shadow-[0_12px_30px_-14px_rgba(184,134,11,0.14)]'
            }`}>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-[#B8860B]/15 border border-[#B8860B]/35 text-[#E5BE5E]' : 'bg-[#FAF1D8] border border-[#B8860B]/30 text-[#85570D]'
                }`}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className={`text-xs font-mono font-bold tabular-nums ${isDark ? 'text-[#52525B]' : 'text-[#B8860B]/60'}`}>
                  01
                </span>
              </div>
              <div className={`pt-4 border-t space-y-2 ${isDark ? 'border-[#25252A]' : 'border-[#B8860B]/20'}`}>
                <h3 className={`text-lg font-bold font-display ${isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'}`}>
                  150-Point Master Diagnostics
                </h3>
                <p className={`text-xs leading-relaxed font-light ${isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'}`}>
                  Every vehicle passes rigorous mechanical diagnostic evaluation by certified factory master technicians before listing.
                </p>
              </div>
            </div>

            <div className={`group relative p-8 rounded-2xl border space-y-5 transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
              isDark
                ? 'bg-[#131316] border-[#25252A] hover:border-[#B8860B]/60 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.85)]'
                : 'bg-gradient-to-b from-[#FFFFFF] to-[#FDF8EA] border-[#B8860B]/25 hover:border-[#B8860B]/65 shadow-[0_12px_30px_-14px_rgba(184,134,11,0.14)]'
            }`}>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-[#B8860B]/15 border border-[#B8860B]/35 text-[#E5BE5E]' : 'bg-[#FAF1D8] border border-[#B8860B]/30 text-[#85570D]'
                }`}>
                  <Award className="w-5 h-5" />
                </div>
                <span className={`text-xs font-mono font-bold tabular-nums ${isDark ? 'text-[#52525B]' : 'text-[#B8860B]/60'}`}>
                  02
                </span>
              </div>
              <div className={`pt-4 border-t space-y-2 ${isDark ? 'border-[#25252A]' : 'border-[#B8860B]/20'}`}>
                <h3 className={`text-lg font-bold font-display ${isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'}`}>
                  Institutional Escrow Protection
                </h3>
                <p className={`text-xs leading-relaxed font-light ${isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'}`}>
                  Your funds remain safely held in institutional escrow until physical inspection and title transfer are completed to your satisfaction.
                </p>
              </div>
            </div>

            <div className={`group relative p-8 rounded-2xl border space-y-5 transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
              isDark
                ? 'bg-[#131316] border-[#25252A] hover:border-[#B8860B]/60 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.85)]'
                : 'bg-gradient-to-b from-[#FFFFFF] to-[#FDF8EA] border-[#B8860B]/25 hover:border-[#B8860B]/65 shadow-[0_12px_30px_-14px_rgba(184,134,11,0.14)]'
            }`}>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-[#B8860B]/15 border border-[#B8860B]/35 text-[#E5BE5E]' : 'bg-[#FAF1D8] border border-[#B8860B]/30 text-[#85570D]'
                }`}>
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className={`text-xs font-mono font-bold tabular-nums ${isDark ? 'text-[#52525B]' : 'text-[#B8860B]/60'}`}>
                  03
                </span>
              </div>
              <div className={`pt-4 border-t space-y-2 ${isDark ? 'border-[#25252A]' : 'border-[#B8860B]/20'}`}>
                <h3 className={`text-lg font-bold font-display ${isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'}`}>
                  Enclosed Transporter Delivery
                </h3>
                <p className={`text-xs leading-relaxed font-light ${isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'}`}>
                  Climate-controlled enclosed carriers deliver your vehicle or high-value technology directly to your private residence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. VIP EDITORIAL NEWSLETTER */}
      <section className={`py-20 transition-colors duration-500 ${
        isDark ? 'bg-[#0B0B0D]' : 'bg-gradient-to-b from-[#FFFFFF] via-[#FAF3DE] to-[#FFFFFF]'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className={`text-[11px] font-mono uppercase tracking-[0.2em] font-bold ${
            isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'
          }`}>
            Exclusive Allocations
          </span>
          <h2 className={`text-3xl font-extrabold font-display ${
            isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'
          }`}>
            Join the Velocity VIP Private Registry
          </h2>
          <p className={`text-sm max-w-xl mx-auto font-light ${
            isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'
          }`}>
            Receive priority notifications for private supercar allocations, off-market tech drops, and private showroom viewings.
          </p>

          {newsletterSubscribed ? (
            <div className={`p-4 rounded-2xl border text-sm font-semibold max-w-md mx-auto flex items-center justify-center gap-2 ${
              isDark ? 'bg-[#B8860B]/10 border-[#B8860B]/30 text-[#D4AF37]' : 'bg-[#FAF3DF] border-[#B8860B]/40 text-[#85570D]'
            }`}>
              <Check className="w-5 h-5" /> You are now registered on the VIP Private List.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your VIP email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className={`flex-1 rounded-xl px-4 py-3.5 text-xs outline-none transition-all ${
                  isDark 
                    ? 'bg-[#171719] border border-[#242426] text-[#F5F4F0] placeholder-[#A7A9AC]/50 focus:border-[#B8860B]' 
                    : 'bg-white border border-[#B8860B]/35 text-[#121214] placeholder-[#857E70] focus:border-[#B8860B] shadow-xs'
                }`}
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-gradient-to-r from-[#B8860B] via-[#E5BE5E] to-[#996515] hover:brightness-105 text-[#FFFFFF] font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shrink-0 cursor-pointer shadow-md shadow-[#B8860B]/30"
              >
                Join Registry
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
