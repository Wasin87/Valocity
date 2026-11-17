import React from 'react';
import { ShieldCheck, Award, Sparkles, Car, Globe, Users, ArrowRight } from 'lucide-react';

export default function About({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F5F4F0] pt-28 pb-24 space-y-20 selection:bg-[#C5A878]/30">
      
      {/* Editorial Header */}
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A878]" />
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A878] font-bold">
            VELOCITY HERITAGE & PROVENANCE
          </span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-[#F5F4F0] tracking-tight">
          Experience the Extraordinary.
        </h1>
        <p className="text-base text-[#A7A9AC] leading-relaxed font-light max-w-2xl mx-auto">
          Founded on the principle that true luxury lies in uncompromising standards, VELOCITY connects global automotive connoisseurs and technology enthusiasts with curated, certified masterpieces.
        </p>
      </div>

      {/* Hero Showcase Image */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="aspect-[21/9] rounded-3xl overflow-hidden border border-[#242426] shadow-2xl relative">
          <img
            src="/src/assets/images/hero_porsche_911_gt3_1794232705362.jpg"
            alt="Velocity Flagship Showroom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent" />
          <div className="absolute bottom-6 left-8">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C5A878] font-bold block">
              Flagship Experience Center
            </span>
            <span className="text-xl font-bold font-display text-[#F5F4F0]">
              Banani & Gulshan Showroom, Dhaka
            </span>
          </div>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-2xl bg-[#171719]/80 backdrop-blur-xl border border-[#242426] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B0B0D] border border-[#242426] text-[#C5A878] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-[#F5F4F0]">150-Point Master Diagnostics</h3>
            <p className="text-xs text-[#A7A9AC] leading-relaxed font-light">
              Every supercar and luxury vehicle undergoes mechanical, structural, and electronic validation before receiving our VELOCITY Certified seal.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#171719]/80 backdrop-blur-xl border border-[#242426] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B0B0D] border border-[#242426] text-[#C5A878] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-[#F5F4F0]">Institutional Escrow Protection</h3>
            <p className="text-xs text-[#A7A9AC] leading-relaxed font-light">
              We eliminate friction and risk. Buyer funds remain safely held in tier-1 bank escrow until physical inspection and title transfer are executed.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#171719]/80 backdrop-blur-xl border border-[#242426] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B0B0D] border border-[#242426] text-[#C5A878] flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-[#F5F4F0]">Global Concierge Delivery</h3>
            <p className="text-xs text-[#A7A9AC] leading-relaxed font-light">
              Climate-controlled enclosed carriers deliver your vehicle or high-value technology directly to your private residence anywhere in Bangladesh and South Asia.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
