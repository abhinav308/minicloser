import React from 'react';

interface QuickNavProps {
  isAlbumActive: boolean;
  onOpenAlbum: () => void;
  onReturnToStory: () => void;
}

export const QuickNav: React.FC<QuickNavProps> = ({
  isAlbumActive,
  onOpenAlbum,
  onReturnToStory,
}) => {
  return (
    <nav className="quick-nav-bar" aria-label="Main navigation">
      {isAlbumActive ? (
        <button
          type="button"
          onClick={onReturnToStory}
          className="quick-nav-pill-btn"
          aria-label="Return to story view"
        >
          <span className="pill-icon">✦</span>
          <span>Story</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onOpenAlbum}
          className="quick-nav-pill-btn"
          aria-label="Open photo gallery album directly"
        >
          <span className="pill-icon">📷</span>
          <span>Album</span>
        </button>
      )}
    </nav>
  );
};
