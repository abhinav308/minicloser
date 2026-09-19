import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { surpriseContent } from '../data/content';
import { RoseIcon } from './RoseIcon';

interface FinalRevealProps {
  onOneLastThing: () => void;
}

export const FinalReveal: React.FC<FinalRevealProps> = ({ onOneLastThing }) => {
  const [revealedCount, setRevealedCount] = useState(0);
  const lines = surpriseContent.finalRevealLines;

  useEffect(() => {
    // Reveal lines step by step with pauses
    const timers = [
      setTimeout(() => setRevealedCount(1), 800),
      setTimeout(() => setRevealedCount(2), 2600),
      setTimeout(() => setRevealedCount(3), 4600),
      setTimeout(() => setRevealedCount(4), 6600),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const allRevealed = revealedCount >= lines.length;

  return (
    <div className="scene-container" style={{ textAlign: 'center' }}>
      {/* Small Glowing Floral Accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        style={{ marginBottom: '2rem' }}
      >
        <RoseIcon isReady={true} />
      </motion.div>

      {/* Sequential Line Reveals */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          maxWidth: '380px',
          minHeight: '220px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {lines.map((line, index) => (
          <AnimatePresence key={index}>
            {revealedCount > index && (
              <motion.p
                className={index >= 2 ? 'title-serif' : ''}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: index === 2 ? 'clamp(1.5rem, 5.5vw, 1.85rem)' : index === 3 ? '1.25rem' : '1.1rem',
                  fontWeight: index >= 2 ? 600 : 300,
                  color: index === 2 ? 'var(--text-primary)' : index === 3 ? '#ff9fb2' : 'var(--text-secondary)',
                  lineHeight: 1.35,
                  textShadow: index >= 2 ? '0 0 20px rgba(244, 63, 94, 0.3)' : 'none',
                }}
              >
                {line}
              </motion.p>
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* "One last thing →" Button */}
      <AnimatePresence>
        {allRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ marginTop: '2.5rem' }}
          >
            <motion.button
              type="button"
              onClick={onOneLastThing}
              className="action-pill-btn"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              aria-label="Reveal the final message"
            >
              <span>{surpriseContent.lastThingButtonText}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
