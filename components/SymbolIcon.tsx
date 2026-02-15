import React from 'react';
import { motion } from 'framer-motion';

interface SymbolIconProps {
  type: 'moon' | 'trishul' | 'drum' | 'om' | 'lotus';
  className?: string;
}

export const SymbolIcon: React.FC<SymbolIconProps> = ({ type, className = "" }) => {
  const commonProps = {
    className: `w-32 h-32 ${className}`,
    fill: "currentColor",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 0.5,
  };

  switch (type) {
    case 'moon':
      return (
        <motion.svg
          {...commonProps}
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{ repeat: Infinity, duration: 4, repeatType: 'reverse', ease: "easeInOut" }}
        >
           <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </motion.svg>
      );
    case 'trishul':
      // Abstract Trishul representation
      return (
        <motion.svg
          {...commonProps}
          viewBox="0 0 100 100"
          initial={{ y: 5 }}
          animate={{ y: -5 }}
          transition={{ repeat: Infinity, duration: 3, repeatType: 'reverse', ease: "easeInOut" }}
        >
          <path d="M50 95 L50 45 M30 20 Q30 45 50 45 Q70 45 70 20 M50 45 L50 10" strokeWidth="4" fill="none" />
          <path d="M25 10 L30 20 L35 10" fill="currentColor" stroke="none" />
          <path d="M65 10 L70 20 L75 10" fill="currentColor" stroke="none" />
          <path d="M45 5 L50 15 L55 5" fill="currentColor" stroke="none" />
        </motion.svg>
      );
    case 'drum':
      // Damru shape
      return (
        <motion.svg
          {...commonProps}
          viewBox="0 0 100 100"
          initial={{ rotate: -15 }}
          animate={{ rotate: 15 }}
          transition={{ repeat: Infinity, duration: 0.2, repeatType: 'reverse', ease: "linear" }}
        >
          <path d="M30 20 L70 20 L50 50 L70 80 L30 80 L50 50 Z" fill="none" strokeWidth="3" />
          <path d="M30 20 Q50 30 70 20" fill="none" strokeWidth="2" />
          <path d="M30 80 Q50 70 70 80" fill="none" strokeWidth="2" />
          {/* Strings */}
          <path d="M50 50 L80 40" strokeWidth="2" />
          <circle cx="80" cy="40" r="5" fill="currentColor" />
          <path d="M50 50 L20 60" strokeWidth="2" />
          <circle cx="20" cy="60" r="5" fill="currentColor" />
        </motion.svg>
      );
    case 'om':
      return (
        <motion.svg
          {...commonProps}
          initial={{ scale: 0.9, opacity: 0.8 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ repeat: Infinity, duration: 3, repeatType: 'reverse' }}
        >
          <text 
            x="50%" 
            y="50%" 
            dominantBaseline="central" 
            textAnchor="middle" 
            fontSize="14" 
            fill="currentColor" 
            fontFamily="serif"
            stroke="none"
          >
            ॐ
          </text>
        </motion.svg>
      );
    case 'lotus':
      return (
         <motion.svg
          {...commonProps}
          viewBox="0 0 100 100"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1.05 }}
          transition={{ repeat: Infinity, duration: 4, repeatType: 'reverse' }}
        >
           <path d="M50 80 Q20 50 50 20 Q80 50 50 80 Z" fill="none" strokeWidth="2" />
           <path d="M50 80 Q10 60 30 30" fill="none" strokeWidth="2" />
           <path d="M50 80 Q90 60 70 30" fill="none" strokeWidth="2" />
        </motion.svg>
      );
    default:
      return null;
  }
};