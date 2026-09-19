import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { surpriseContent } from '../data/content';

interface PhotoMemoriesProps {
  onContinue: () => void;
}

export const PhotoMemories: React.FC<PhotoMemoriesProps> = ({ onContinue }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const photos = surpriseContent.photos;
  const isLast = photoIndex === photos.length - 1;

  const handleNext = () => {
    if (isLast) {
      onContinue();
    } else {
      setPhotoIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (photoIndex > 0) {
      setPhotoIndex((prev) => prev - 1);
    }
  };

  const currentPhoto = photos[photoIndex];

  return (
    <div className="scene-container">
      {/* Title */}
      <motion.h2
        className="title-serif"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          fontSize: 'clamp(1.5rem, 5vw, 1.95rem)',
          fontWeight: 500,
          textAlign: 'center',
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
          lineHeight: 1.25,
          textShadow: '0 0 20px rgba(244, 63, 94, 0.25)',
        }}
      >
        {surpriseContent.photosTitle}
      </motion.h2>

      {/* Counter */}
      <div
        style={{
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          color: 'var(--accent-rose-light)',
          fontWeight: 600,
          marginBottom: '1.5rem',
        }}
      >
        {`0${photoIndex + 1} / 0${photos.length}`}
      </div>

      {/* Photo Frame Container */}
      <div style={{ width: '100%', maxWidth: '340px', minHeight: '340px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={photoIndex}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              borderRadius: '22px',
              padding: '1rem',
              background: 'rgba(20, 15, 18, 0.72)',
              border: '1px solid rgba(232, 74, 108, 0.22)',
              boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.85), 0 0 25px rgba(232, 74, 108, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            {/* Visual Box: Image or Placeholder */}
            <div
              style={{
                width: '100%',
                height: '240px',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(10, 8, 10, 0.9)',
                border: '1px dashed rgba(232, 74, 108, 0.3)',
              }}
            >
              {currentPhoto.src ? (
                <motion.img
                  src={currentPhoto.src}
                  alt={currentPhoto.caption}
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                /* Elegant Placeholder */
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '1.25rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {/* Delicate Frame Icon */}
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent-rose)"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginBottom: '0.75rem', opacity: 0.8 }}
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      fontWeight: 500,
                      marginBottom: '0.25rem',
                    }}
                  >
                    Your photo goes here
                  </p>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.02em',
                      fontStyle: 'italic',
                    }}
                  >
                    A treasured moment
                  </p>
                </div>
              )}
            </div>

            {/* Caption */}
            <p
              style={{
                marginTop: '1rem',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                color: 'var(--text-secondary)',
                textAlign: 'center',
                fontWeight: 300,
                fontStyle: 'italic',
                fontFamily: 'var(--font-serif)',
                padding: '0 0.5rem',
              }}
            >
              "{currentPhoto.caption}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '1.75rem',
        }}
      >
        {photoIndex > 0 && (
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
            aria-label="Previous photo memory"
          >
            ← Prev
          </button>
        )}

        <button
          type="button"
          onClick={handleNext}
          className="action-pill-btn"
          aria-label={isLast ? 'Continue to final reveal' : 'Next photo memory'}
        >
          <span>{isLast ? 'Continue →' : 'Next photo →'}</span>
        </button>
      </div>

      {/* Dots Indicator */}
      <div style={{ display: 'flex', gap: '0.4rem', marginTop: '1.25rem' }} aria-hidden="true">
        {photos.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === photoIndex ? '16px' : '6px',
              height: '6px',
              borderRadius: '3px',
              backgroundColor: i === photoIndex ? 'var(--accent-rose)' : 'rgba(255, 255, 255, 0.15)',
              boxShadow: i === photoIndex ? '0 0 8px var(--accent-rose)' : 'none',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};
