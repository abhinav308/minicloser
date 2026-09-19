import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { surpriseContent } from '../data/content';

interface MemorySceneProps {
  onContinue: () => void;
}

export const MemoryScene: React.FC<MemorySceneProps> = ({ onContinue }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const memories = surpriseContent.memories;
  const isLast = currentIndex === memories.length - 1;

  const handleNext = () => {
    if (isLast) {
      onContinue();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const activeMemory = memories[currentIndex];

  return (
    <div className="scene-container">
      {/* Title */}
      <motion.h2
        className="title-serif"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          fontSize: 'clamp(1.5rem, 5vw, 1.95rem)',
          fontWeight: 500,
          textAlign: 'center',
          color: 'var(--text-primary)',
          maxWidth: '360px',
          marginBottom: '1.75rem',
          lineHeight: 1.3,
          textShadow: '0 0 20px rgba(244, 63, 94, 0.25)',
        }}
      >
        {surpriseContent.memoriesTitle}
      </motion.h2>

      {/* Progress Indicator: 01 / 04 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          fontSize: '0.75rem',
          letterSpacing: '0.18em',
          color: 'var(--accent-rose-light)',
          fontWeight: 600,
          marginBottom: '1.25rem',
        }}
      >
        {`0${currentIndex + 1} / 0${memories.length}`}
      </motion.div>

      {/* Glass Card Carousel (One card at a time) */}
      <div style={{ width: '100%', maxWidth: '380px', minHeight: '220px', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 25, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -25, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card"
            style={{
              padding: '2.25rem 1.75rem',
              minHeight: '220px',
              justifyContent: 'center',
            }}
          >
            {/* Memory Number Badge */}
            <div
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              Appreciation #{currentIndex + 1}
            </div>

            {/* Memory Title */}
            <h3
              className="title-serif"
              style={{
                fontSize: '1.65rem',
                color: 'var(--text-primary)',
                fontWeight: 600,
                marginBottom: '0.85rem',
                textShadow: '0 0 16px rgba(232, 74, 108, 0.3)',
              }}
            >
              {activeMemory.title}
            </h3>

            {/* Memory Content */}
            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                fontWeight: 300,
              }}
            >
              {activeMemory.text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '1.75rem',
        }}
      >
        {currentIndex > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-secondary)',
              padding: '0.65rem 1.25rem',
              borderRadius: 'var(--radius-button)',
              fontSize: '0.75rem',
              letterSpacing: '0.06em',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            aria-label="Previous appreciation"
          >
            ← Prev
          </button>
        )}

        <button
          type="button"
          onClick={handleNext}
          className="action-pill-btn"
          aria-label={isLast ? 'Continue to photo memories' : 'Next appreciation'}
        >
          <span>{isLast ? 'Continue →' : 'Next →'}</span>
        </button>
      </div>

      {/* Subtle Step Dots */}
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          marginTop: '1.5rem',
        }}
        aria-hidden="true"
      >
        {memories.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentIndex ? '16px' : '6px',
              height: '6px',
              borderRadius: '3px',
              backgroundColor: i === currentIndex ? 'var(--accent-rose)' : 'rgba(255, 255, 255, 0.15)',
              boxShadow: i === currentIndex ? '0 0 8px var(--accent-rose)' : 'none',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};
