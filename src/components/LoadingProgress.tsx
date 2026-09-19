import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingProgressProps {
  onComplete: () => void;
  durationMs?: number;
}

export const LoadingProgress: React.FC<LoadingProgressProps> = ({
  onComplete,
  durationMs = 2800,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / durationMs, 1);
      // Soft ease-out cubic curve for organic feel
      const eased = 1 - Math.pow(1 - rawProgress, 2.6);
      setProgress(eased * 100);

      if (rawProgress < 1) {
        requestAnimationFrame(update);
      } else {
        setProgress(100);
        onComplete();
      }
    };

    const frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [durationMs, onComplete]);

  // Determine stage message
  let statusMessage = "Preparing something...";
  if (progress >= 85) {
    statusMessage = "Ready for you.";
  } else if (progress >= 40) {
    statusMessage = "Almost ready...";
  }

  return (
    <div 
      style={{ 
        width: '100%', 
        marginTop: '1.75rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Preparation progress"
    >
      {/* Subtle dynamic status text */}
      <motion.div
        key={statusMessage}
        initial={{ opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          fontSize: '0.8125rem',
          letterSpacing: '0.04em',
          color: progress >= 100 ? 'var(--accent-rose-light)' : 'var(--text-secondary)',
          marginBottom: '0.75rem',
          fontWeight: 400,
          minHeight: '1.2rem',
        }}
      >
        {statusMessage}
      </motion.div>

      {/* Progress Track */}
      <div
        style={{
          width: '100%',
          maxWidth: '260px',
          height: '3px',
          backgroundColor: 'var(--progress-track)',
          borderRadius: '999px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <motion.div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'var(--progress-fill)',
            boxShadow: 'var(--progress-glow)',
            borderRadius: '999px',
            transition: 'width 60ms linear',
          }}
        />
      </div>

      {/* Subtext under progress bar */}
      <div
        style={{
          marginTop: '0.75rem',
          fontSize: '0.75rem',
          letterSpacing: '0.03em',
          color: 'var(--text-muted)',
          fontWeight: 300,
        }}
      >
        Growing something special...
      </div>
    </div>
  );
};
