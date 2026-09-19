import React from 'react';
import { motion } from 'framer-motion';

interface RoseIconProps {
  isReady?: boolean;
}

export const RoseIcon: React.FC<RoseIconProps> = ({ isReady = false }) => {
  return (
    <motion.div
      className="animate-float"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: isReady ? [1, 1.05, 1] : 1, 
        opacity: 1 
      }}
      transition={{ 
        duration: isReady ? 2.5 : 1.2, 
        repeat: isReady ? Infinity : 0,
        ease: "easeInOut"
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.25rem',
        filter: isReady 
          ? 'drop-shadow(0 0 16px rgba(232, 74, 108, 0.75)) drop-shadow(0 0 6px rgba(255, 133, 157, 0.9))' 
          : 'drop-shadow(0 0 10px rgba(232, 74, 108, 0.45))'
      }}
      aria-hidden="true"
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="roseGradient" x1="12" y1="6" x2="36" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff8ea3" />
            <stop offset="50%" stopColor="#e84a6c" />
            <stop offset="100%" stopColor="#c02347" />
          </linearGradient>
          <linearGradient id="stemGradient" x1="24" y1="26" x2="24" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e84a6c" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#827279" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Outer petal spirals */}
        <motion.path
          d="M24 7C17.5 7 13 11.5 13 17C13 23.5 18.5 27 24 28C29.5 27 35 23.5 35 17C35 11.5 30.5 7 24 7Z"
          stroke="url(#roseGradient)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0.8, opacity: 0.8 }}
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Inner delicate petals */}
        <motion.path
          d="M24 11C19.8 11 17 14 17 17.5C17 21.2 20.2 23.5 24 24.5C27.8 23.5 31 21.2 31 17.5C31 14 28.2 11 24 11Z"
          stroke="url(#roseGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M21.5 15.5C21.5 14 22.8 13 24 13C25.2 13 26.5 14 26.5 15.5C26.5 17.5 24 19 24 19C24 19 21.5 17.5 21.5 15.5Z"
          stroke="#ffadc0"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Elegant Stem */}
        <path
          d="M24 28V43"
          stroke="url(#stemGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Left Leaf */}
        <path
          d="M24 33C20 32 17 34 16 36C19.5 36.5 22.5 35 24 33Z"
          stroke="url(#roseGradient)"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />

        {/* Right Leaf */}
        <path
          d="M24 36C28 35 31 37 32 39C28.5 39.5 25.5 38 24 36Z"
          stroke="url(#roseGradient)"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
      </svg>
    </motion.div>
  );
};
