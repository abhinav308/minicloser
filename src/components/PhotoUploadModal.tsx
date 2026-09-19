import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PhotoItem } from '../data/content';
import { processImageFile, saveStoredPhotos } from '../utils/photoStorage';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotosUploaded: (newPhotos: PhotoItem[]) => void;
}

interface PendingPhoto {
  id: string;
  file: File;
  previewUrl: string;
  title: string;
  caption: string;
  category: 'Favorites' | 'Moments' | 'Adventures';
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  onPhotosUploaded,
}) => {
  const [pendingPhotos, setPendingPhotos] = useState<PendingPhoto[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressStatus, setProgressStatus] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newPending: PendingPhoto[] = files.map((file, idx) => ({
      id: `photo-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 7)}`,
      file,
      previewUrl: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      caption: '',
      category: 'Moments',
    }));

    setPendingPhotos((prev) => [...prev, ...newPending]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemovePhoto = (id: string) => {
    setPendingPhotos((prev) => {
      const removed = prev.find((p) => p.id === id);
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  };

  const handleMovePhoto = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= pendingPhotos.length) return;
    setPendingPhotos((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, moved);
      return copy;
    });
  };

  const handleUpdateCaption = (id: string, caption: string) => {
    setPendingPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, caption } : p))
    );
  };

  const handleUpdateTitle = (id: string, title: string) => {
    setPendingPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, title } : p))
    );
  };

  const handleUpdateCategory = (
    id: string,
    category: 'Favorites' | 'Moments' | 'Adventures'
  ) => {
    setPendingPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, category } : p))
    );
  };

  const handleSavePhotos = async () => {
    if (pendingPhotos.length === 0) return;
    setIsProcessing(true);
    setProgressPercent(0);

    const savedList: PhotoItem[] = [];

    for (let i = 0; i < pendingPhotos.length; i++) {
      const item = pendingPhotos[i];
      setProgressStatus(`Processing photo ${i + 1} of ${pendingPhotos.length}...`);
      setProgressPercent(Math.round(((i + 0.5) / pendingPhotos.length) * 100));

      try {
        // Optimize and compress for storage
        const optimizedSrc = await processImageFile(item.file);
        savedList.push({
          id: item.id,
          src: optimizedSrc,
          title: item.title || 'Untitled Memory',
          caption: item.caption || 'A treasured memory.',
          date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          category: item.category,
          aspectRatio: 'portrait',
        });
      } catch (err) {
        console.error('Failed to process image:', err);
      }

      setProgressPercent(Math.round(((i + 1) / pendingPhotos.length) * 100));
    }

    setProgressStatus('Saving to album...');
    await saveStoredPhotos(savedList);

    // Clean up object URLs
    pendingPhotos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setPendingPhotos([]);
    setIsProcessing(false);
    onPhotosUploaded(savedList);
    onClose();
  };

  const handleCancel = () => {
    pendingPhotos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setPendingPhotos([]);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="upload-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleCancel}
        role="dialog"
        aria-modal="true"
        aria-label="Upload photos modal"
      >
        <motion.div
          className="upload-modal-card"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="upload-modal-header">
            <div>
              <h3 className="upload-modal-title title-serif">Upload to Album</h3>
              <p className="upload-modal-subtitle">
                Select photos, add captions, and organize your memories
              </p>
            </div>
            <button
              type="button"
              className="upload-modal-close-btn"
              onClick={handleCancel}
              disabled={isProcessing}
              aria-label="Close upload window"
            >
              ✕
            </button>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/png, image/jpeg, image/webp, image/gif, image/heic, image/*"
            style={{ display: 'none' }}
            onChange={handleFilesSelected}
          />

          {/* Body Content */}
          <div className="upload-modal-body">
            {pendingPhotos.length === 0 ? (
              /* Drop / Select Empty State */
              <div
                className="upload-dropzone"
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click();
                }}
              >
                <div className="upload-dropzone-icon">
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent-rose)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <h4 className="upload-dropzone-heading">Tap to Select Photos</h4>
                <p className="upload-dropzone-sub">
                  Select one or multiple photos from your camera or photo library
                </p>
                <span className="upload-dropzone-hint">
                  Supports JPG, PNG, WEBP, HEIC & GIF
                </span>
              </div>
            ) : (
              /* Photos Preview List */
              <div className="upload-preview-container">
                <div className="upload-preview-header">
                  <span>{pendingPhotos.length} {pendingPhotos.length === 1 ? 'photo' : 'photos'} selected</span>
                  <button
                    type="button"
                    className="upload-add-more-btn"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                  >
                    + Add More
                  </button>
                </div>

                <div className="upload-preview-list">
                  {pendingPhotos.map((item, index) => (
                    <div key={item.id} className="upload-preview-item">
                      {/* Photo Thumbnail */}
                      <div className="preview-thumb-wrap">
                        <img
                          src={item.previewUrl}
                          alt={item.title}
                          className="preview-thumb-img"
                        />
                        <span className="preview-order-badge">#{index + 1}</span>
                      </div>

                      {/* Photo Metadata Form */}
                      <div className="preview-inputs-wrap">
                        <div className="preview-row">
                          <input
                            type="text"
                            placeholder="Title (optional)"
                            value={item.title}
                            onChange={(e) => handleUpdateTitle(item.id, e.target.value)}
                            className="upload-text-input title-input"
                            disabled={isProcessing}
                          />

                          {/* Category Selector */}
                          <select
                            value={item.category}
                            onChange={(e) =>
                              handleUpdateCategory(
                                item.id,
                                e.target.value as 'Favorites' | 'Moments' | 'Adventures'
                              )
                            }
                            className="upload-category-select"
                            disabled={isProcessing}
                          >
                            <option value="Favorites">Favorites</option>
                            <option value="Moments">Moments</option>
                            <option value="Adventures">Adventures</option>
                          </select>
                        </div>

                        <input
                          type="text"
                          placeholder="Write a sweet caption..."
                          value={item.caption}
                          onChange={(e) => handleUpdateCaption(item.id, e.target.value)}
                          className="upload-text-input caption-input"
                          disabled={isProcessing}
                        />

                        {/* Order & Remove Controls */}
                        <div className="preview-controls-row">
                          <div className="reorder-btns">
                            <button
                              type="button"
                              onClick={() => handleMovePhoto(index, index - 1)}
                              disabled={index === 0 || isProcessing}
                              className="reorder-btn"
                              title="Move photo up"
                            >
                              ↑ Move up
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMovePhoto(index, index + 1)}
                              disabled={index === pendingPhotos.length - 1 || isProcessing}
                              className="reorder-btn"
                              title="Move photo down"
                            >
                              ↓ Move down
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(item.id)}
                            disabled={isProcessing}
                            className="remove-preview-btn"
                            title="Remove photo"
                          >
                            ✕ Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Progress Bar */}
            {isProcessing && (
              <div className="upload-progress-box">
                <div className="upload-progress-status">
                  <span>{progressStatus}</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="upload-progress-track">
                  <motion.div
                    className="upload-progress-fill"
                    style={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="upload-modal-footer">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isProcessing}
              className="upload-modal-cancel-btn"
            >
              Cancel
            </button>

            {pendingPhotos.length > 0 && (
              <button
                type="button"
                onClick={handleSavePhotos}
                disabled={isProcessing}
                className="action-pill-btn upload-submit-btn"
              >
                <span>{isProcessing ? 'Saving...' : `Save ${pendingPhotos.length} to Album`}</span>
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
