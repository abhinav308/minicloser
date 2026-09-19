import React from 'react';
import { motion } from 'framer-motion';
import { surpriseContent } from '../data/content';
import { RoseIcon } from './RoseIcon';

interface LastMessageProps {
  onReplay: () => void;
}

export const LastMessage: React.FC<LastMessageProps> = ({ onReplay }) => {
  return (
    <div className="scene-container" style={{ textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '420px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2.5rem 1.75rem',
          borderRadius: 'var(--radius-card)',
          background: 'rgba(18, 14, 17, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(232, 74, 108, 0.25)',
          boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.85), 0 0 40px -5px rgba(184, 38, 75, 0.25)',
        }}
      >
        {/* Animated Rose / Petal Icon */}
        <RoseIcon isReady={true} />

        {/* Closing Title */}
        <motion.h2
          className="title-serif"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            fontSize: 'clamp(1.75rem, 6vw, 2.2rem)',
            fontWeight: 500,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            lineHeight: 1.25,
            textShadow: '0 0 20px rgba(244, 63, 94, 0.35)',
          }}
        >
          {surpriseContent.lastMessageTitle}
        </motion.h2>

        {/* Subtitle / Signature */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            fontWeight: 300,
            fontStyle: 'italic',
            letterSpacing: '0.03em',
            marginBottom: '2.25rem',
            maxWidth: '300px',
            lineHeight: 1.5,
          }}
        >
          {surpriseContent.lastMessageSubtitle}
        </motion.p>

        {/* Replay / Restart Journey Option */}
        <motion.button
          type="button"
          onClick={onReplay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            transition: 'color 0.25s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-rose-light)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          aria-label="Experience again from beginning"
        >
          ↺ Experience again
        </motion.button>
      </motion.div>
    </div>
  );
};
