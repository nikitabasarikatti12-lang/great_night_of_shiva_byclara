import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { audioService } from '../services/audioService';

interface BlessingProps {
  onRestart: () => void;
}

export const Blessing: React.FC<BlessingProps> = ({ onRestart }) => {
  useEffect(() => {
    // Play OM sound on mount
    audioService.playOm();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center relative z-10 overflow-hidden">
      
      {/* Confetti / Sparkles effect */}
      <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute w-1 h-1 bg-amber-200 rounded-full"
               initial={{ 
                 x: Math.random() * window.innerWidth, 
                 y: window.innerHeight, 
                 opacity: 1 
               }}
               animate={{ 
                 y: Math.random() * window.innerHeight * 0.5, 
                 opacity: 0 
               }}
               transition={{ 
                 duration: 2 + Math.random() * 2, 
                 repeat: Infinity, 
                 delay: Math.random() * 2 
               }}
             />
          ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mb-8 relative"
      >
        <div className="absolute inset-0 bg-amber-500/20 blur-[80px] rounded-full" />
        <div className="text-9xl text-amber-100/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif pointer-events-none">
          ॐ
        </div>
        <h1 className="relative z-10 text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
          Happy Mahashivratri
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-lg md:text-xl text-blue-100 max-w-2xl font-light italic leading-relaxed"
      >
        "May Lord Shiva shower his divine blessings upon you and your family. May happiness and peace surround you always."
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-8 text-amber-200/80 font-cinzel text-xl"
      >
         Har Har Mahadev
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="mt-12 flex flex-col items-center gap-6"
      >
        <button
          onClick={onRestart}
          className="px-8 py-3 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 rounded-full transition-colors active:scale-95"
        >
          Restart Experience
        </button>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 3.5, duration: 1 }}
            className="text-sm text-slate-500 mt-4 font-light tracking-wider uppercase"
        >
            Created by Clara
        </motion.div>
      </motion.div>
    </div>
  );
};