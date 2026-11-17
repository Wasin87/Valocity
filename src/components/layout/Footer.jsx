import React from 'react';
import { ShieldCheck, Truck, Clock, Award, ArrowUpRight, Globe, Lock, Shield } from 'lucide-react';
import Logo from '../common/Logo';
import { useTheme } from '../../context/ThemeContext';

export default function Footer({ onNavigate }) {
  const { isDark } = useTheme();

  return (
    <footer className={`pt-16 pb-12 select-none transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0D] border-t border-[#242426] text-[#A7A9AC]' : 'bg-[#FFFFFF] border-t border-[#B8860B]/30 text-[#55524B]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Badges */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 pb-16 border-b ${isDark ? 'border-[#242426]' : 'border-[#B8860B]/25'}`}>
          <div className={`flex items-center gap-4 p-5 rounded-2xl transition-all ${
            isDark ? 'bg-[#171719] border border-[#242426]' : 'gold-white-card border border-[#B8860B]/35 shadow-xs'
          }`}>
            <ShieldCheck className={`w-7 h-7 shrink-0 ${isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'}`} />
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'}`}>
                150-Point Diagnostics
              </h4>
              <p className={`text-[11px] mt-0.5 ${isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'}`}>Master Certified Technicians</p>
            </div>
          </div>
          <div className={`flex items-center gap-4 p-5 rounded-2xl transition-all ${
            isDark ? 'bg-[#171719] border border-[#242426]' : 'gold-white-card border border-[#B8860B]/35 shadow-xs'
          }`}>
            <Truck className={`w-7 h-7 shrink-0 ${isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'}`} />
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'}`}>
                Enclosed Transporter
              </h4>
              <p className={`text-[11px] mt-0.5 ${isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'}`}>Climate-Controlled Freight</p>
            </div>
          </div>
          <div className={`flex items-center gap-4 p-5 rounded-2xl transition-all ${
            isDark ? 'bg-[#171719] border border-[#242426]' : 'gold-white-card border border-[#B8860B]/35 shadow-xs'
          }`}>
            <Clock className={`w-7 h-7 shrink-0 ${isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'}`} />
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'}`}>
                VIP Concierge 24/7
              </h4>
              <p className={`text-[11px] mt-0.5 ${isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'}`}>Personal Portfolio Manager</p>
            </div>
          </div>
          <div className={`flex items-center gap-4 p-5 rounded-2xl transition-all ${
            isDark ? 'bg-[#171719] border border-[#242426]' : 'gold-white-card border border-[#B8860B]/35 shadow-xs'
          }`}>
            <Award className={`w-7 h-7 shrink-0 ${isDark ? 'text-[#D4AF37]' : 'text-[#85570D]'}`} />
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'}`}>
                Escrow Protection
              </h4>
              <p className={`text-[11px] mt-0.5 ${isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'}`}>Tier-1 Guaranteed Funds</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-16 border-b border-[#242426]">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); onNavigate('/'); }}
              className="inline-flex items-center gap-2"
            >
              <Logo size="md" showTagline={true} />
            </a>
            <p className="text-xs text-[#A7A9AC] leading-relaxed max-w-sm font-light">
              The premier digital showroom connecting discerning collectors with certified supercars, bespoke SUVs, electric hypercars, and flagship computational hardware.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-[10px] text-[#A7A9AC] font-mono uppercase tracking-widest mr-1">Accepted Protocols:</span>
              <span className="text-[10px] font-mono font-semibold px-2.5 py-1 bg-[#171719] text-[#F5F4F0] rounded-lg border border-[#242426]">bKash</span>
              <span className="text-[10px] font-mono font-semibold px-2.5 py-1 bg-[#171719] text-[#F5F4F0] rounded-lg border border-[#242426]">Nagad</span>
              <span className="text-[10px] font-mono font-semibold px-2.5 py-1 bg-[#171719] text-[#F5F4F0] rounded-lg border border-[#242426]">COD</span>
              <span className="text-[10px] font-mono font-semibold px-2.5 py-1 bg-[#171719] text-[#F5F4F0] rounded-lg border border-[#242426]">Wire Escrow</span>
            </div>
          </div>

          {/* Col 1 */}
          <div>
            <h5 className="text-[11px] font-bold text-[#F5F4F0] uppercase tracking-[0.2em] font-mono mb-4">Automotive</h5>
            <ul className="space-y-2.5 text-xs text-[#A7A9AC]">
              <li>
                <a href="/cars" onClick={(e) => { e.preventDefault(); onNavigate('/cars'); }} className="hover:text-[#C5A878] transition-colors">
                  Supercars & Hypercars
                </a>
              </li>
              <li>
                <a href="/cars" onClick={(e) => { e.preventDefault(); onNavigate('/cars'); }} className="hover:text-[#C5A878] transition-colors">
                  Mercedes-AMG G63 Mansory
                </a>
              </li>
              <li>
                <a href="/cars" onClick={(e) => { e.preventDefault(); onNavigate('/cars'); }} className="hover:text-[#C5A878] transition-colors">
                  Tesla Cybertruck & EVs
                </a>
              </li>
              <li>
                <a href="/cars" onClick={(e) => { e.preventDefault(); onNavigate('/cars'); }} className="hover:text-[#C5A878] transition-colors">
                  Ducati Track Motorcycles
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h5 className="text-[11px] font-bold text-[#F5F4F0] uppercase tracking-[0.2em] font-mono mb-4">Technology</h5>
            <ul className="space-y-2.5 text-xs text-[#A7A9AC]">
              <li>
                <a href="/technology" onClick={(e) => { e.preventDefault(); onNavigate('/technology'); }} className="hover:text-[#C5A878] transition-colors">
                  Desert Titanium iPhone 16 Pro
                </a>
              </li>
              <li>
                <a href="/technology" onClick={(e) => { e.preventDefault(); onNavigate('/technology'); }} className="hover:text-[#C5A878] transition-colors">
                  MacBook Pro M4 Max 128GB
                </a>
              </li>
              <li>
                <a href="/technology" onClick={(e) => { e.preventDefault(); onNavigate('/technology'); }} className="hover:text-[#C5A878] transition-colors">
                  Hasselblad X2D 100C Medium Format
                </a>
              </li>
              <li>
                <a href="/technology" onClick={(e) => { e.preventDefault(); onNavigate('/technology'); }} className="hover:text-[#C5A878] transition-colors">
                  Titanium Apple Watch Ultra 2
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h5 className="text-[11px] font-bold text-[#F5F4F0] uppercase tracking-[0.2em] font-mono mb-4">Concierge</h5>
            <ul className="space-y-2.5 text-xs text-[#A7A9AC]">
              <li>
                <a href="/about" onClick={(e) => { e.preventDefault(); onNavigate('/about'); }} className="hover:text-[#C5A878] transition-colors">
                  Brand Heritage
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => { e.preventDefault(); onNavigate('/contact'); }} className="hover:text-[#C5A878] transition-colors">
                  Gulshan & Banani Showroom
                </a>
              </li>
              <li>
                <a href="/faq" onClick={(e) => { e.preventDefault(); onNavigate('/faq'); }} className="hover:text-[#C5A878] transition-colors">
                  150-Point Inspection FAQ
                </a>
              </li>
              <li>
                <a href="/faq" onClick={(e) => { e.preventDefault(); onNavigate('/faq'); }} className="hover:text-[#C5A878] transition-colors">
                  Escrow Guarantee Terms
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-[#A7A9AC]/70 gap-4">
          <p>© {new Date().getFullYear()} VELOCITY LUXURY AUTOMOTIVE & TECHNOLOGY. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#F5F4F0] cursor-pointer transition-colors">Privacy Charter</span>
            <span className="hover:text-[#F5F4F0] cursor-pointer transition-colors">Terms of Allocation</span>
            <span className="hover:text-[#F5F4F0] cursor-pointer transition-colors">Escrow Protocols</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
