import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How does VELOCITY verify the mechanical authenticity of listed supercars?",
      a: "Every vehicle on VELOCITY undergoes an extensive 150-point diagnostic inspection conducted by factory-certified master technicians. We verify ECU fault histories, paint thickness gauges, structural chassis integrity, and original factory provenance before listing."
    },
    {
      q: "What payment methods are supported for luxury purchases?",
      a: "We accept Cash on Delivery (COD) for tech hardware, bKash Merchant, Nagad Direct, bank wire transfers, and credit/debit card payments. High-value automotive acquisitions are secured via 256-bit bank escrow protection."
    },
    {
      q: "Can I schedule a private track session or showroom inspection?",
      a: "Yes. Simply navigate to any supercar or vehicle listing and click 'Book Test Drive'. Select your preferred date and time, and our Senior Concierge will arrange a private inspection at our Banani or Gulshan showroom."
    },
    {
      q: "How is white-glove enclosed transport handled?",
      a: "Vehicles are transported inside climate-controlled, enclosed air-suspension carriers with full transit insurance. Technology hardware is delivered in sealed tamper-evident forensic security cases."
    },
    {
      q: "What is the warranty coverage for technology products?",
      a: "All smartphones, laptops, cameras, and accessories include official 12-month manufacturer warranties backed by VELOCITY VIP replacement guarantees."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F5F4F0] pt-28 pb-24 selection:bg-[#C5A878]/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A878]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A878] font-bold">
              CLIENT PROTOCOL & STANDARDS
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-[#F5F4F0] tracking-tight">
            Frequently Answered Inquiries
          </h1>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="rounded-2xl bg-[#171719]/80 backdrop-blur-xl border border-[#242426] overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between font-bold text-[#F5F4F0] text-base hover:text-[#C5A878] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#C5A878] shrink-0 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6 text-xs text-[#A7A9AC] leading-relaxed font-light border-t border-[#242426] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
