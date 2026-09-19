import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoseIcon } from './RoseIcon';
import { LoadingProgress } from './LoadingProgress';
import { BloomButton } from './BloomButton';
import { surpriseContent } from '../data/content';

import { audioManager } from '../utils/audioManager';

interface IntroScreenProps {
  onBloomComplete: () => void;
  onOpenAlbum?: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onBloomComplete,
  onOpenAlbum,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [isBlooming, setIsBlooming] = useState(false);

  const handleLoadingComplete = () => {
    setIsReady(true);
  };

  const handleBloomClick = () => {
    if (!isReady || isBlooming) return;
    setIsBlooming(true);

    // Start background music immediately from the user click gesture
    audioManager.startOnInteraction();

    // Transition smoothly into Screen 2 (Rose Bloom) after button press animation
    setTimeout(() => {
      onBloomComplete();
    }, 750);
  };

  const handleDirectAlbumClick = () => {
    audioManager.startOnInteraction();
    if (onOpenAlbum) {
      onOpenAlbum();
    }
  };

  return (
    <main
      style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      {/* Bloom Flash effect during transition */}
      <AnimatePresence>
        {isBlooming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.2] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 30,
              background: 'radial-gradient(circle at 50% 50%, rgba(255, 120, 150, 0.6) 0%, rgba(232, 74, 108, 0.3) 45%, transparent 75%)',
            }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Main Glass Card */}
      <motion.div
        className={`glass-card ${isReady ? 'ready-state' : ''}`}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{
          opacity: isBlooming ? 0 : 1,
          y: isBlooming ? -12 : 0,
          scale: isBlooming ? 1.05 : 1,
          filter: isBlooming ? 'blur(4px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated Rose Icon */}
        <RoseIcon isReady={isReady} />

        {/* Title */}
        <h1
          className="title-serif"
          style={{
            fontSize: 'clamp(1.75rem, 5.5vw, 2.15rem)',
            color: 'var(--text-primary)',
            lineHeight: 1.25,
            marginBottom: '0.4rem',
            textShadow: isReady ? '0 0 20px rgba(244, 63, 94, 0.3)' : 'none',
            transition: 'text-shadow 0.6s ease',
          }}
        >
          {surpriseContent.introTitle}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            fontWeight: 300,
            letterSpacing: '0.04em',
          }}
        >
          {surpriseContent.introSubtitle}
        </p>

        {/* Animated Loading Bar & Status */}
        <LoadingProgress onComplete={handleLoadingComplete} />

        {/* Tap To Bloom Action Button */}
        <BloomButton
          isReady={isReady}
          onClick={handleBloomClick}
          isClicked={isBlooming}
        />
      </motion.div>

      {/* Direct Album Link on Home Screen */}
      {onOpenAlbum && (
        <motion.button
          type="button"
          onClick={handleDirectAlbumClick}
          className="intro-quick-album-link"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: isReady ? 0.75 : 0.35, y: 0 }}
          whileHover={{ opacity: 1, scale: 1.03 }}
          transition={{ duration: 0.4 }}
          aria-label="Jump directly to the photo gallery album"
        >
          <span>📷 or jump straight to Album →</span>
        </motion.button>
      )}
    </main>
  );
};
