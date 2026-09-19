import React, { useEffect, useState } from 'react';
import { audioManager } from '../utils/audioManager';

export const MusicToggle: React.FC = () => {
  const [state, setState] = useState(() => audioManager.getState());

  useEffect(() => {
    // Check if music.mp3 is available on the server
    audioManager.checkAvailability();

    // Subscribe to changes in play/mute/availability
    const unsubscribe = audioManager.subscribe(() => {
      setState(audioManager.getState());
    });

    return unsubscribe;
  }, []);

  // Show the music toggle only after user has clicked "TAP TO BLOOM" and the audio file is available
  if (!state.hasInteracted || !state.isAvailable) {
    return null;
  }

  const isPlaying = state.isPlaying;

  return (
    <button
      type="button"
      className="music-toggle-btn"
      onClick={() => audioManager.toggleMute()}
      aria-label={isPlaying ? 'Pause background music' : 'Resume background music'}
      aria-pressed={isPlaying}
      title={isPlaying ? 'Pause music' : 'Resume music'}
    >
      <span>{isPlaying ? '♪ Music' : '♪ Muted'}</span>
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: isPlaying ? 'var(--accent-rose)' : 'var(--text-muted)',
          boxShadow: isPlaying ? '0 0 6px var(--accent-rose)' : 'none',
          display: 'inline-block',
          marginLeft: '2px',
          transition: 'all 0.3s ease',
        }}
        aria-hidden="true"
      />
    </button>
  );
};
