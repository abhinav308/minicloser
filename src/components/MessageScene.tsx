import React from 'react';
import { motion } from 'framer-motion';
import { surpriseContent } from '../data/content';

interface MessageSceneProps {
  onContinue: () => void;
}

export const MessageScene: React.FC<MessageSceneProps> = ({ onContinue }) => {
  return (
    <div className="scene-container">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '460px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '2.5rem 1.5rem',
          borderRadius: 'var(--radius-card)',
          background: 'rgba(18, 14, 17, 0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(232, 74, 108, 0.14)',
          boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.8), 0 0 35px -5px rgba(184, 38, 75, 0.15)',
        }}
      >
        {/* Soft Decorative Accent */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            width: '32px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--accent-rose), transparent)',
            marginBottom: '1.75rem',
          }}
          aria-hidden="true"
        />

        {/* Title */}
        <motion.h2
          className="title-serif"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(2.1rem, 7vw, 2.75rem)',
            fontWeight: 500,
            letterSpacing: '0.02em',
            color: 'var(--text-primary)',
            marginBottom: '1.75rem',
            lineHeight: 1.15,
            textShadow: '0 0 24px rgba(244, 63, 94, 0.3)',
          }}
        >
          {surpriseContent.messageTitle}
        </motion.h2>

        {/* Paragraphs with staggered reveal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {surpriseContent.messageBody.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.55 + index * 0.35,
                ease: 'easeOut',
              }}
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                fontWeight: 300,
                letterSpacing: '0.015em',
              }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Continue Button */}
        <motion.button
          type="button"
          onClick={onContinue}
          className="action-pill-btn"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Continue to appreciation memories"
        >
          <span>continue →</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
