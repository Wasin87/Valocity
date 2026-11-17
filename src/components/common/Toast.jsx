import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 text-neutral-100 rounded-xl shadow-2xl max-w-md"
      >
        {type === 'success' ? (
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
        )}
        <p className="text-sm font-medium">{message}</p>
        <button 
          onClick={onClose}
          className="ml-auto text-neutral-400 hover:text-white p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
