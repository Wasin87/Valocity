import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function Contact({ setToast }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    if (setToast) setToast({ message: 'Transmission dispatched to Private Concierge', type: 'success' });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F5F4F0] pt-28 pb-24 selection:bg-[#C5A878]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A878]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A878] font-bold">
              24/7 PRIVATE CLIENT CONCIERGE
            </span>
          </div>
          <h1 className="text-4xl font-extrabold font-display text-[#F5F4F0] tracking-tight">
            Contact Private Concierge
          </h1>
          <p className="text-sm text-[#A7A9AC] font-light">
            Our Senior Concierge Team is available for private showroom viewings, allocation acquisitions, and bespoke technology requests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Showroom info (5 cols) */}
          <div className="lg:col-span-5 space-y-8 bg-[#171719]/90 backdrop-blur-xl p-8 rounded-3xl border border-[#242426]">
            <h3 className="text-xl font-bold font-display text-[#F5F4F0]">Showroom & Headquarters</h3>
            
            <div className="space-y-6 text-xs font-mono text-[#F5F4F0]">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#C5A878] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#F5F4F0] uppercase mb-1">Dhaka Flagship Showroom</h4>
                  <p className="text-[#A7A9AC] font-sans leading-relaxed">
                    Plot 18, Road 11, Block D, Banani & Gulshan 2 Avenue, Dhaka-1213, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#C5A878] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#F5F4F0] uppercase mb-1">VIP Concierge Line</h4>
                  <p className="text-[#C5A878] font-bold">+880 1800-VELOCITY (+880 1800-835624)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#C5A878] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#F5F4F0] uppercase mb-1">Email Registry</h4>
                  <p className="text-[#A7A9AC]">concierge@velocity.luxury</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#C5A878] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#F5F4F0] uppercase mb-1">Private Hours</h4>
                  <p className="text-[#A7A9AC] font-sans">Monday – Saturday: 10:00 AM – 9:00 PM (By Private Appointment)</p>
                </div>
              </div>
            </div>

            {/* Coordinates Badge */}
            <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-[#242426] bg-[#0B0B0D] relative flex items-center justify-center text-center p-4">
              <div className="space-y-1">
                <MapPin className="w-8 h-8 text-[#C5A878] mx-auto" />
                <p className="text-xs font-mono text-[#F5F4F0] font-bold">Banani & Gulshan 2 Showroom</p>
                <p className="text-[10px] text-[#A7A9AC] font-mono">23.7937° N, 90.4066° E</p>
              </div>
            </div>

          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#171719]/90 backdrop-blur-xl p-8 rounded-3xl border border-[#242426]">
            {sent ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold font-display text-[#F5F4F0]">Transmission Dispatched</h3>
                <p className="text-sm text-[#A7A9AC] max-w-md mx-auto font-light">
                  A dedicated luxury automotive specialist will contact you directly within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold font-display text-[#F5F4F0]">Send Direct Concierge Message</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#A7A9AC] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-4 py-3 text-xs text-[#F5F4F0] placeholder-[#A7A9AC]/40 focus:border-[#C5A878] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#A7A9AC] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 1700 000000"
                      className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-4 py-3 text-xs text-[#F5F4F0] placeholder-[#A7A9AC]/40 focus:border-[#C5A878] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A7A9AC] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-4 py-3 text-xs text-[#F5F4F0] placeholder-[#A7A9AC]/40 focus:border-[#C5A878] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A7A9AC] mb-1">Inquiry / Customization Request</label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe the vehicle model, bespoke spec, or showroom appointment window..."
                    className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-4 py-3 text-xs text-[#F5F4F0] placeholder-[#A7A9AC]/40 focus:border-[#C5A878] outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-[#C5A878] via-[#dfc498] to-[#b39564] hover:brightness-110 text-[#0B0B0D] font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-mono"
                >
                  <Send className="w-4 h-4" /> Send VIP Transmission
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
