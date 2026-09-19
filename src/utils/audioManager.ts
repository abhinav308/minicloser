class BackgroundAudioManager {
  private audio: HTMLAudioElement | null = null;
  private targetVolume: number = 0.25; // 25% comfortable romantic background volume
  private fadeInterval: number | null = null;
  private isMuted: boolean = false;
  private isAvailable: boolean | null = null;
  private hasInteracted: boolean = false;
  private listeners: Set<() => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('closred_music_muted');
      if (saved === 'true') {
        this.isMuted = true;
      }
    }
  }

  public async checkAvailability(): Promise<boolean> {
    if (this.isAvailable !== null) {
      return this.isAvailable;
    }

    try {
      const response = await fetch('/music.mp3', { method: 'HEAD' });
      const contentType = response.headers.get('content-type') || '';
      const isOk = response.ok && !contentType.includes('text/html');
      this.isAvailable = isOk;
      this.notify();
      return isOk;
    } catch {
      try {
        const getRes = await fetch('/music.mp3', { headers: { Range: 'bytes=0-0' } });
        const isOk = getRes.ok || getRes.status === 206;
        this.isAvailable = isOk;
        this.notify();
        return isOk;
      } catch {
        this.isAvailable = false;
        this.notify();
        return false;
      }
    }
  }

  private clearFading(): void {
    if (this.fadeInterval !== null) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }
  }

  public startOnInteraction(): void {
    this.hasInteracted = true;
    if (typeof window === 'undefined') return;

    if (!this.audio) {
      this.audio = new Audio('/music.mp3');
      this.audio.loop = true;
      this.audio.volume = 0;

      this.audio.addEventListener('error', () => {
        this.isAvailable = false;
        this.notify();
      });

      this.audio.addEventListener('canplay', () => {
        this.isAvailable = true;
        this.notify();
      });

      this.audio.addEventListener('play', () => this.notify());
      this.audio.addEventListener('pause', () => this.notify());
    }

    if (!this.isMuted) {
      if (this.audio.paused) {
        this.audio
          .play()
          .then(() => {
            this.isAvailable = true;
            this.fadeIn(2000);
            this.notify();
          })
          .catch(() => {
            this.notify();
          });
      }
    } else {
      this.notify();
    }
  }

  private fadeIn(durationMs: number = 2000): void {
    if (!this.audio) return;
    this.clearFading();

    const steps = 25;
    const intervalTime = durationMs / steps;
    const volumeStep = this.targetVolume / steps;

    this.fadeInterval = window.setInterval(() => {
      if (!this.audio) {
        this.clearFading();
        return;
      }

      if (this.audio.volume + volumeStep >= this.targetVolume) {
        this.audio.volume = this.targetVolume;
        this.clearFading();
      } else {
        this.audio.volume = Math.min(this.audio.volume + volumeStep, this.targetVolume);
      }
    }, intervalTime);
  }

  private fadeOut(durationMs: number = 500, onComplete?: () => void): void {
    if (!this.audio) {
      if (onComplete) onComplete();
      return;
    }
    this.clearFading();

    const steps = 15;
    const intervalTime = durationMs / steps;
    const startVol = this.audio.volume;
    const volumeStep = startVol / steps;

    this.fadeInterval = window.setInterval(() => {
      if (!this.audio) {
        this.clearFading();
        if (onComplete) onComplete();
        return;
      }

      if (this.audio.volume - volumeStep <= 0.01) {
        this.audio.volume = 0;
        this.audio.pause();
        this.clearFading();
        if (onComplete) onComplete();
      } else {
        this.audio.volume = Math.max(0, this.audio.volume - volumeStep);
      }
    }, intervalTime);
  }

  public toggleMute(): void {
    if (!this.audio) {
      // If toggle clicked before audio element created, create and start
      this.startOnInteraction();
      return;
    }

    const currentlyPlaying = !this.audio.paused && !this.isMuted;

    if (currentlyPlaying) {
      // Pause / Mute
      this.isMuted = true;
      try {
        sessionStorage.setItem('closred_music_muted', 'true');
      } catch {}

      this.fadeOut(500, () => {
        this.notify();
      });
    } else {
      // Resume / Play
      this.isMuted = false;
      try {
        sessionStorage.setItem('closred_music_muted', 'false');
      } catch {}

      this.audio
        .play()
        .then(() => {
          this.fadeIn(1000);
          this.notify();
        })
        .catch(() => {
          this.notify();
        });
    }

    this.notify();
  }

  public getState() {
    const isPlaying = !!this.audio && !this.audio.paused && !this.isMuted;
    return {
      isMuted: this.isMuted || !isPlaying,
      isPlaying: isPlaying,
      isAvailable: this.isAvailable,
      hasInteracted: this.hasInteracted,
    };
  }

  public subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }
}

export const audioManager = new BackgroundAudioManager();
