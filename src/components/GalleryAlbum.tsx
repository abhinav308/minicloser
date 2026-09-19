import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { surpriseContent } from '../data/content';
import type { PhotoItem } from '../data/content';
import { PhotoLightbox } from './PhotoLightbox';
import { PhotoUploadModal } from './PhotoUploadModal';
import { getStoredPhotos, deleteStoredPhoto } from '../utils/photoStorage';

interface GalleryAlbumProps {
  onContinue: () => void;
  onBackToStory?: () => void;
  isDirectAccess?: boolean;
}

type CategoryFilter = 'All' | 'Favorites' | 'Moments' | 'Adventures';

export const GalleryAlbum: React.FC<GalleryAlbumProps> = ({
  onContinue,
  onBackToStory,
  isDirectAccess = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [userPhotos, setUserPhotos] = useState<PhotoItem[]>([]);

  // Load user photos from IndexedDB on mount
  useEffect(() => {
    let isMounted = true;
    getStoredPhotos()
      .then((stored) => {
        if (isMounted) {
          setUserPhotos(stored);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Preset static photos from content.ts
  const presetPhotos = surpriseContent.photos;

  // Combine user-uploaded photos with preset photos
  // (Uploaded photos take priority; if user has uploaded photos, show them alongside presets)
  const combinedPhotos: PhotoItem[] = [
    ...userPhotos,
    ...presetPhotos.filter(
      (preset) => !userPhotos.some((up) => up.id === preset.id)
    ),
  ];

  // Filter photos based on category
  const filteredPhotos = activeCategory === 'All'
    ? combinedPhotos
    : combinedPhotos.filter((p) => p.category === activeCategory);

  const categories: CategoryFilter[] = ['All', 'Favorites', 'Moments', 'Adventures'];

  const handleOpenPhoto = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const handleNextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => ((prev ?? 0) + 1) % filteredPhotos.length);
  };

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      (prev ?? 0) === 0 ? filteredPhotos.length - 1 : (prev ?? 0) - 1
    );
  };

  const handlePhotosUploaded = (newPhotos: PhotoItem[]) => {
    setUserPhotos((prev) => [...newPhotos, ...prev]);
  };

  const handleDeletePhoto = async (id: string) => {
    await deleteStoredPhoto(id);
    setUserPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="album-scene-wrapper">
      {/* Album Header */}
      <motion.div
        className="album-header"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="album-badge-row">
          <span className="album-pill-badge">Photo Collection</span>
          {userPhotos.length > 0 && (
            <span className="album-user-count-badge">
              {userPhotos.length} uploaded
            </span>
          )}
        </div>

        <h2 className="album-title title-serif">
          {surpriseContent.photosTitle}
        </h2>
        {surpriseContent.photosSubtitle && (
          <p className="album-subtitle">
            {surpriseContent.photosSubtitle}
          </p>
        )}

        {/* Action Button: + Add Photos */}
        <div className="album-top-actions">
          <button
            type="button"
            className="album-add-photos-btn"
            onClick={() => setIsUploadModalOpen(true)}
            aria-label="Upload photos to the album"
          >
            <span className="add-icon">+</span>
            <span>Add Photos</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="album-categories-bar" role="tablist" aria-label="Filter photos">
          {categories.map((cat) => {
            const count = cat === 'All'
              ? combinedPhotos.length
              : combinedPhotos.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                className={`album-category-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
                {cat !== 'All' && (
                  <span className="category-count">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Modern 2-Column Mobile / 3-Column Desktop Grid */}
      <motion.div
        className="album-grid"
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo, index) => {
            const isTall = photo.aspectRatio === 'portrait';
            const isWide = photo.aspectRatio === 'landscape';

            return (
              <motion.div
                key={photo.id || index}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className={`album-card ${isTall ? 'card-tall' : isWide ? 'card-wide' : 'card-square'}`}
                onClick={() => {
                  if (photo.src) {
                    handleOpenPhoto(index);
                  } else {
                    // Tapping empty slot opens upload modal
                    setIsUploadModalOpen(true);
                  }
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    if (photo.src) handleOpenPhoto(index);
                    else setIsUploadModalOpen(true);
                  }
                }}
                aria-label={`View photo ${photo.title || index + 1}`}
              >
                {/* Visual Area */}
                {photo.src ? (
                  <div className="album-card-image-wrap">
                    <img
                      src={photo.src}
                      alt={photo.caption || photo.title || 'Memory photo'}
                      className="album-card-image"
                      loading="lazy"
                    />
                    <div className="album-card-overlay">
                      {photo.title && <h4 className="album-card-title">{photo.title}</h4>}
                      <p className="album-card-caption">{photo.caption}</p>
                    </div>
                  </div>
                ) : (
                  /* Clean Minimalist Placeholder Card */
                  <div className="album-card-placeholder">
                    <div className="placeholder-icon-wrap">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--accent-rose)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                    </div>
                    <span className="placeholder-slot-label">
                      {photo.title || `Memory #${index + 1}`}
                    </span>
                    <span className="placeholder-slot-hint">Tap to upload photo</span>
                  </div>
                )}

                {/* Subtle Category Pill on Card */}
                {photo.category && (
                  <span className="card-floating-tag">
                    {photo.category}
                  </span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Bottom Action Footer */}
      <motion.div
        className="album-footer-actions"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        {isDirectAccess && onBackToStory && (
          <button
            type="button"
            onClick={onBackToStory}
            className="album-secondary-btn"
            aria-label="Return to the story flow"
          >
            ← Return to Story
          </button>
        )}

        <button
          type="button"
          onClick={onContinue}
          className="action-pill-btn"
          aria-label="Continue to final reveal"
        >
          <span>Continue to Final Reveal →</span>
        </button>
      </motion.div>

      {/* Interactive Fullscreen Lightbox Modal */}
      <PhotoLightbox
        photo={selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null}
        currentIndex={selectedPhotoIndex ?? 0}
        totalPhotos={filteredPhotos.length}
        onClose={handleCloseLightbox}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
        onDeletePhoto={handleDeletePhoto}
      />

      {/* Interactive In-Browser Multi-Photo Upload Modal */}
      <PhotoUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onPhotosUploaded={handlePhotosUploaded}
      />
    </div>
  );
};
