import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PhotoItem } from '../data/content';

interface PhotoLightboxProps {
  photo: PhotoItem | null;
  currentIndex: number;
  totalPhotos: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onDeletePhoto?: (id: string) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  currentIndex,
  totalPhotos,
  onClose,
  onNext,
  onPrev,
  onDeletePhoto,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      }
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (photo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [photo, handleKeyDown]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Photo Lightbox View"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="lightbox-close-btn"
          aria-label="Close photo view"
        >
          ✕
        </button>

        {/* Counter Badge */}
        <div className="lightbox-counter" aria-hidden="true">
          {String(currentIndex + 1).padStart(2, '0')} / {String(totalPhotos).padStart(2, '0')}
        </div>

        {/* Main Lightbox Content */}
        <motion.div
          className="lightbox-card"
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Visual Display */}
          <div className="lightbox-image-wrapper">
            {photo.src ? (
              <img
                src={photo.src}
                alt={photo.caption || photo.title || 'Memory photo'}
                className="lightbox-image"
              />
            ) : (
              <div className="lightbox-placeholder">
                <div className="placeholder-icon-circle">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent-rose)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
                <h4 className="placeholder-title">
                  {photo.title || 'Photo Placeholder'}
                </h4>
                <p className="placeholder-hint">
                  Tap "+ Add Photos" on the album screen to upload your photos
                </p>
              </div>
            )}

            {photo.date && (
              <div className="lightbox-date-badge">
                {photo.date}
              </div>
            )}
          </div>

          {/* Details & Caption */}
          <div className="lightbox-info">
            {photo.category && (
              <span className="lightbox-category-tag">
                {photo.category}
              </span>
            )}
            {photo.title && (
              <h3 className="lightbox-title title-serif">
                {photo.title}
              </h3>
            )}
            <p className="lightbox-caption">
              "{photo.caption}"
            </p>

            {/* Optional Delete Button for Uploaded Photos */}
            {onDeletePhoto && photo.id && photo.src && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Are you sure you want to remove this photo from the album?')) {
                    onDeletePhoto(photo.id!);
                    onClose();
                  }
                }}
                className="lightbox-delete-btn"
                title="Remove photo from album"
              >
                🗑 Remove Photo
              </button>
            )}
          </div>
        </motion.div>

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="lightbox-nav-btn prev"
          aria-label="Previous photo"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="lightbox-nav-btn next"
          aria-label="Next photo"
        >
          ›
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
