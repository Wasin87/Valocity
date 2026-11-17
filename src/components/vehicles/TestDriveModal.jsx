import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createTestDriveBooking } from '../../services/marketplaceService';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Car, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function TestDriveModal({ vehicle, isOpen, onClose, onSuccess }) {
  const { user } = useAuth();
  const [userName, setUserName] = useState(user?.displayName || '');
  const [userEmail, setUserEmail] = useState(user?.email || '');
  const [userPhone, setUserPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  React.useEffect(() => {
    if (user) {
      setUserName((prev) => prev || user.displayName || '');
      setUserEmail((prev) => prev || user.email || '');
    }
  }, [user]);

  if (!isOpen || !vehicle) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);
    try {
      await createTestDriveBooking({
        userId: user?.uid || 'guest',
        userName,
        userEmail,
        userPhone,
        vehicleId: vehicle.id,
        vehicleTitle: vehicle.title,
        preferredDate,
        preferredTime
      });
      setBookedSuccess(true);
      if (onSuccess) onSuccess('Test drive booking submitted successfully!');
    } catch (err) {
      console.error(err);
      setSubmitError('Could not save booking to database. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B0B0D]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-lg bg-[#171719] border border-[#242426] rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#242426] flex items-center justify-between bg-[#0B0B0D]/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#0B0B0D] text-[#C5A878] border border-[#242426]">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[#F5F4F0]">Book VIP Inspection & Test Drive</h3>
                <p className="text-xs text-[#A7A9AC] truncate max-w-xs">{vehicle.title}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-[#A7A9AC] hover:text-[#F5F4F0] p-1 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form / Success view */}
          {bookedSuccess ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold font-display text-[#F5F4F0]">Request Registered</h4>
              <p className="text-sm text-[#A7A9AC] max-w-sm mx-auto font-light">
                Our Senior Concierge will contact you at <strong className="text-[#C5A878]">{userEmail}</strong> within 2 hours to confirm your private track session or showroom inspection.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-[#0B0B0D] hover:bg-[#242426] text-[#F5F4F0] font-bold text-xs uppercase tracking-wider rounded-xl border border-[#242426] transition-all cursor-pointer font-mono"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {submitError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                  {submitError}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#A7A9AC] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F4F0] placeholder-[#A7A9AC]/40 focus:border-[#C5A878] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#A7A9AC] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="+880 1700 000000"
                    className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F4F0] placeholder-[#A7A9AC]/40 focus:border-[#C5A878] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A7A9AC] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F4F0] placeholder-[#A7A9AC]/40 focus:border-[#C5A878] outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#A7A9AC] mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F4F0] outline-none focus:border-[#C5A878] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#A7A9AC] mb-1">Preferred Time</label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F4F0] outline-none focus:border-[#C5A878] transition-colors cursor-pointer"
                  >
                    <option>10:00 AM</option>
                    <option>12:00 PM</option>
                    <option>02:30 PM</option>
                    <option>05:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-[#C5A878] via-[#dfc498] to-[#b39564] hover:brightness-110 text-[#0B0B0D] font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-lg shadow-[#C5A878]/10 flex items-center justify-center gap-2 cursor-pointer font-mono"
                >
                  {isSubmitting ? 'Booking Request...' : 'Confirm Test Drive Booking'}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#A7A9AC] pt-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A878]" />
                <span>Strict Non-Disclosure & Private Concierge Service</span>
              </div>
            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
