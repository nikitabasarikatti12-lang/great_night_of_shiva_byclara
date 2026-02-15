import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoryScene } from '../types';
import { SymbolIcon } from './SymbolIcon';
import { audioService } from '../services/audioService';

interface StoryViewerProps {
  scene: StoryScene;
  index: number;
  total: number;
  onNext: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({ scene, index, total, onNext }) => {
  
  useEffect(() => {
    // Play sound whenever scene changes
    const timer = setTimeout(() => {
        audioService.playDamru();
    }, 300); // Slight delay for transition sync

    return () => clearTimeout(timer);
  }, [scene]);

  const progress = ((index + 1) / total) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative z-10 w-full max-w-4xl mx-auto">
      
      {/* Progress Bar */}
      <div className="absolute top-10 left-0 w-full px-8 md:px-20">
        <div className="h-1 bg-slate-800 rounded-full w-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
            className="h-full bg-gradient-to-r from-blue-500 to-amber-300"
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-500 uppercase tracking-widest">
          <span>{scene.title}</span>
          <span>{index + 1} / {total}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-8"
        >
          {/* Symbol Container */}
          <div className="relative group">
            <div className={`absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full transition-all duration-1000 ${scene.color.replace('text', 'bg').replace('200', '500')}`} />
            <motion.div 
              className={`relative z-10 p-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl ${scene.color}`}
              animate={{ 
                boxShadow: ["0 0 20px rgba(255,255,255,0.1)", "0 0 40px rgba(255,255,255,0.2)", "0 0 20px rgba(255,255,255,0.1)"] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <SymbolIcon type={scene.symbol} />
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="max-w-xl space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold title-font tracking-wide text-white drop-shadow-md">
              {scene.title}
            </h2>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
              {scene.description}
            </p>
          </div>

          {/* Navigation */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="mt-12 px-8 py-3 border border-white/20 rounded-full text-white/90 font-medium tracking-widest hover:border-white/50 transition-colors"
          >
            {index === total - 1 ? "Receive Blessings" : "Continue Journey"}
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};