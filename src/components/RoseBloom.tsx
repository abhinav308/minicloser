import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { surpriseContent } from '../data/content';

interface RoseBloomProps {
  onContinue: () => void;
}

export const RoseBloom: React.FC<RoseBloomProps> = ({ onContinue }) => {
  const [bloomStage, setBloomStage] = useState<'growing' | 'bloomed'>('growing');

  useEffect(() => {
    // Total bloom sequence takes ~5.2 seconds
    const timer = setTimeout(() => {
      setBloomStage('bloomed');
    }, 5200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="scene-container" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Dynamic Deep Red Radial Halo Behind Flower */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: bloomStage === 'bloomed' ? [0.6, 0.85, 0.6] : 0.4,
          scale: bloomStage === 'bloomed' ? [1, 1.1, 1] : 0.8,
        }}
        transition={{
          duration: 4,
          repeat: bloomStage === 'bloomed' ? Infinity : 0,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '42%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232, 74, 108, 0.28) 0%, rgba(184, 38, 75, 0.12) 45%, transparent 75%)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Floating Petal Fragments */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }} aria-hidden="true">
        {[
          { x: '25%', y: '35%', delay: 3.5, size: 8 },
          { x: '75%', y: '40%', delay: 4.0, size: 6 },
          { x: '30%', y: '60%', delay: 4.5, size: 7 },
          { x: '70%', y: '65%', delay: 4.8, size: 9 },
        ].map((petal, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15, scale: 0.5, rotate: 0 }}
            animate={
              bloomStage === 'bloomed'
                ? {
                    opacity: [0, 0.7, 0.3],
                    y: [-10, -45, -75],
                    x: [0, (i % 2 === 0 ? 15 : -15), (i % 2 === 0 ? -10 : 20)],
                    rotate: [0, 45, 90],
                  }
                : {}
            }
            transition={{
              duration: 7,
              repeat: Infinity,
              delay: petal.delay,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              left: petal.x,
              top: petal.y,
              width: `${petal.size}px`,
              height: `${petal.size * 1.5}px`,
              borderRadius: '50% 0 50% 50%',
              background: 'linear-gradient(135deg, #ff8fa5 0%, #e84a6c 100%)',
              filter: 'drop-shadow(0 0 6px rgba(232, 74, 108, 0.6))',
              transformOrigin: 'center center',
            }}
          />
        ))}
      </div>

      {/* Rose Artwork SVG Container */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          width: 'min(360px, 86vw)',
          height: 'min(360px, 86vw)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={
          bloomStage === 'bloomed'
            ? {
                scale: [1, 1.025, 1],
                filter: [
                  'drop-shadow(0 0 16px rgba(232, 74, 108, 0.45))',
                  'drop-shadow(0 0 26px rgba(255, 120, 150, 0.6))',
                  'drop-shadow(0 0 16px rgba(232, 74, 108, 0.45))',
                ],
              }
            : {
                filter: 'drop-shadow(0 0 12px rgba(232, 74, 108, 0.35))',
              }
        }
        transition={{
          duration: 3.8,
          repeat: bloomStage === 'bloomed' ? Infinity : 0,
          ease: 'easeInOut',
        }}
      >
        <svg
          viewBox="0 0 300 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            {/* Stem Gradients */}
            <linearGradient id="stemGrad" x1="150" y1="280" x2="150" y2="135" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2b3a2f" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#43684d" />
              <stop offset="100%" stopColor="#62946e" />
            </linearGradient>

            {/* Leaf Gradients */}
            <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#52835d" />
              <stop offset="100%" stopColor="#2b4731" />
            </linearGradient>

            {/* Petal Layer Gradients (Multi-depth) */}
            <linearGradient id="outerDeepGrad" x1="100" y1="80" x2="200" y2="190" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6b0d23" />
              <stop offset="50%" stopColor="#9e1335" />
              <stop offset="100%" stopColor="#54081a" />
            </linearGradient>

            <linearGradient id="midPetalGrad" x1="110" y1="70" x2="190" y2="170" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#c01d43" />
              <stop offset="60%" stopColor="#e83863" />
              <stop offset="100%" stopColor="#961132" />
            </linearGradient>

            <linearGradient id="innerPetalGrad" x1="125" y1="65" x2="175" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ff5e82" />
              <stop offset="55%" stopColor="#f73864" />
              <stop offset="100%" stopColor="#c0153c" />
            </linearGradient>

            <linearGradient id="coreHeartGrad" x1="135" y1="75" x2="165" y2="135" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffb0c1" />
              <stop offset="50%" stopColor="#ff7090" />
              <stop offset="100%" stopColor="#e62050" />
            </linearGradient>

            {/* Subtle glow filter */}
            <filter id="bloomSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Stem growing upward (0s - 1.4s) */}
          <motion.path
            d="M150 280 Q146 215 150 145"
            stroke="url(#stemGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />

          {/* 2. Leaves branching out (1.1s - 2.2s) */}
          {/* Left Leaf */}
          <motion.path
            d="M148 220 C125 210 105 220 95 240 C115 248 138 238 148 220 Z"
            fill="url(#leafGrad)"
            stroke="#2b4731"
            strokeWidth="0.8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.95 }}
            transition={{ duration: 1.0, delay: 1.1, ease: 'easeOut' }}
            style={{ transformOrigin: '148px 220px' }}
          />
          {/* Right Leaf */}
          <motion.path
            d="M150 190 C172 180 192 188 205 208 C185 215 162 205 150 190 Z"
            fill="url(#leafGrad)"
            stroke="#2b4731"
            strokeWidth="0.8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.95 }}
            transition={{ duration: 1.0, delay: 1.3, ease: 'easeOut' }}
            style={{ transformOrigin: '150px 190px' }}
          />

          {/* Calyx & Base of bud (1.5s - 2.5s) */}
          <motion.path
            d="M142 145 C146 156 154 156 158 145 C155 138 145 138 142 145 Z"
            fill="#3d5c43"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4, ease: 'easeOut' }}
            style={{ transformOrigin: '150px 145px' }}
          />

          {/* 3. Outer Petals Unfurl (1.8s - 3.2s) */}
          {/* Far Outer Left */}
          <motion.path
            d="M150 145 C110 145 92 115 108 85 C124 55 148 75 150 145 Z"
            fill="url(#outerDeepGrad)"
            stroke="#450413"
            strokeWidth="0.6"
            initial={{ scale: 0.15, rotate: -25, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 0.96 }}
            transition={{ duration: 1.4, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: '150px 145px' }}
          />
          {/* Far Outer Right */}
          <motion.path
            d="M150 145 C190 145 208 115 192 85 C176 55 152 75 150 145 Z"
            fill="url(#outerDeepGrad)"
            stroke="#450413"
            strokeWidth="0.6"
            initial={{ scale: 0.15, rotate: 25, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 0.96 }}
            transition={{ duration: 1.4, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: '150px 145px' }}
          />
          {/* Outer Bottom Base Petal */}
          <motion.path
            d="M118 120 C112 150 188 150 182 120 C165 140 135 140 118 120 Z"
            fill="url(#outerDeepGrad)"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.92 }}
            transition={{ duration: 1.3, delay: 2.1, ease: 'easeOut' }}
            style={{ transformOrigin: '150px 135px' }}
          />

          {/* 4. Middle Petals Blossom (2.6s - 4.0s) */}
          {/* Mid Left */}
          <motion.path
            d="M150 142 C120 142 110 110 125 80 C140 58 152 82 150 142 Z"
            fill="url(#midPetalGrad)"
            stroke="#750c23"
            strokeWidth="0.5"
            initial={{ scale: 0.2, rotate: -15, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 0.98 }}
            transition={{ duration: 1.3, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: '150px 142px' }}
          />
          {/* Mid Right */}
          <motion.path
            d="M150 142 C180 142 190 110 175 80 C160 58 148 82 150 142 Z"
            fill="url(#midPetalGrad)"
            stroke="#750c23"
            strokeWidth="0.5"
            initial={{ scale: 0.2, rotate: 15, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 0.98 }}
            transition={{ duration: 1.3, delay: 2.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: '150px 142px' }}
          />
          {/* Mid Front Wrap */}
          <motion.path
            d="M130 112 C132 135 168 135 170 112 C158 128 142 128 130 112 Z"
            fill="url(#midPetalGrad)"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.95 }}
            transition={{ duration: 1.2, delay: 3.0, ease: 'easeOut' }}
            style={{ transformOrigin: '150px 125px' }}
          />

          {/* 5. Inner Petals & Center Cup (3.4s - 4.6s) */}
          {/* Inner Left Curl */}
          <motion.path
            d="M150 138 C132 138 126 112 136 90 C146 72 152 92 150 138 Z"
            fill="url(#innerPetalGrad)"
            initial={{ scale: 0.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 3.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: '150px 138px' }}
          />
          {/* Inner Right Curl */}
          <motion.path
            d="M150 138 C168 138 174 112 164 90 C154 72 148 92 150 138 Z"
            fill="url(#innerPetalGrad)"
            initial={{ scale: 0.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 3.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: '150px 138px' }}
          />

          {/* 6. Heart Center Whorl Spiral (4.0s - 5.0s) */}
          <motion.path
            d="M142 98 C140 86 148 78 153 78 C159 78 163 85 160 94 C158 100 152 105 146 102 C142 100 143 93 148 93 C152 93 154 97 151 99"
            stroke="url(#coreHeartGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#bloomSoftGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 4.0, ease: 'easeOut' }}
          />

          {/* Center glowing pollen core dust */}
          <motion.circle
            cx="150"
            cy="95"
            r="3"
            fill="#ffe4ea"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.85] }}
            transition={{ duration: 0.8, delay: 4.8, ease: 'easeOut' }}
            filter="url(#bloomSoftGlow)"
          />
        </svg>
      </motion.div>

      {/* Post-Bloom Revelation */}
      <AnimatePresence>
        {bloomStage === 'bloomed' && (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginTop: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              zIndex: 15,
            }}
          >
            {/* Serif Revelation Text */}
            <h2
              className="title-serif"
              style={{
                fontSize: 'clamp(1.5rem, 5vw, 1.95rem)',
                color: 'var(--text-primary)',
                fontWeight: 400,
                letterSpacing: '0.02em',
                marginBottom: '1.25rem',
                textShadow: '0 0 25px rgba(244, 63, 94, 0.35)',
                maxWidth: '320px',
                lineHeight: 1.3,
              }}
            >
              {surpriseContent.bloomRevealText}
            </h2>

            {/* Continue Action */}
            <motion.button
              type="button"
              onClick={onContinue}
              className="action-pill-btn"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              aria-label="Continue to personal message"
            >
              <span>{surpriseContent.bloomContinueText}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
