import React from 'react';
import { motion } from 'framer-motion';

interface BloomButtonProps {
  isReady: boolean;
  onClick: () => void;
  isClicked?: boolean;
}

export const BloomButton: React.FC<BloomButtonProps> = ({
  isReady,
  onClick,
  isClicked = false,
}) => {
  return (
    <motion.button
      type="button"
      onClick={isReady ? onClick : undefined}
      disabled={!isReady || isClicked}
      aria-label="Tap to bloom your surprise"
      aria-disabled={!isReady}
      className={isReady && !isClicked ? 'button-ready-glow' : ''}
      initial={{ opacity: 0.5, y: 5 }}
      animate={{
        opacity: isReady ? 1 : 0.45,
        y: 0,
        scale: isClicked ? 0.94 : 1,
      }}
      whileHover={
        isReady && !isClicked
          ? {
              scale: 1.03,
              boxShadow: '0 0 25px rgba(232, 74, 108, 0.65), 0 4px 15px rgba(0, 0, 0, 0.4)',
            }
          : {}
      }
      whileTap={isReady && !isClicked ? { scale: 0.96 } : {}}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{
        marginTop: '2rem',
        padding: '0.85rem 2.25rem',
        borderRadius: 'var(--radius-button)',
        fontSize: '0.8125rem',
        fontWeight: 600,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-sans)',
        cursor: isReady && !isClicked ? 'pointer' : 'not-allowed',
        border: isReady 
          ? '1px solid rgba(255, 133, 157, 0.5)' 
          : '1px solid rgba(255, 255, 255, 0.08)',
        background: isReady
          ? 'linear-gradient(135deg, #c02347 0%, #e84a6c 50%, #f43f5e 100%)'
          : 'rgba(255, 255, 255, 0.03)',
        color: isReady ? '#ffffff' : 'var(--text-muted)',
        outline: 'none',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
        minHeight: '46px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        transition: 'border-color 0.4s ease, background 0.4s ease, color 0.4s ease',
      }}
    >
      {/* Light sheen effect on ready */}
      {isReady && !isClicked && (
        <motion.span
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '60%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent)',
            transform: 'skewX(-20deg)',
            pointerEvents: 'none',
          }}
          animate={{ left: ['-100%', '200%'] }}
          transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      )}

      <span>{isClicked ? 'BLOOMING...' : 'TAP TO BLOOM'}</span>
    </motion.button>
  );
};
