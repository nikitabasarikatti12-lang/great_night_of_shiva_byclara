import React from 'react';
import { motion } from 'framer-motion';
import { audioService } from '../services/audioService';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const handleEnter = () => {
    audioService.resumeContext();
    audioService.playDamru();
    onStart();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center z-10 relative overflow-hidden">
      
      {/* Background Om Symbol */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
      >
        <div className="text-[15rem] md:text-[30rem] text-amber-200 font-serif leading-none blur-sm drop-shadow-[0_0_30px_rgba(251,191,36,0.4)]">
          ॐ
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mb-8 relative z-10"
      >
        <div className="w-64 h-64 rounded-full bg-blue-900/20 blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-amber-100 drop-shadow-lg pb-4 relative z-10">
          Happy Mahashivratri
        </h1>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-lg md:text-xl text-blue-100/80 mb-12 max-w-lg font-light relative z-10"
      >
        Journey into the night of stillness, awakening the divine consciousness within.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(100, 180, 255, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleEnter}
        className="relative z-10 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-lg font-semibold tracking-wider transition-colors border border-indigo-400/30 shadow-xl"
      >
        Enter Experience
      </motion.button>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 text-xs text-slate-400 z-10"
      >
        Immersive Experience • Use Headphones for Best Audio
      </motion.div>
    </div>
  );
};