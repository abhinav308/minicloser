import React, { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

export const AmbientBackground: React.FC = () => {
  // Generate a small, deterministic array of ambient floating particles
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: (i * 19.3) % 94 + 3,
      y: (i * 23.7) % 92 + 4,
      size: (i % 3) + 2,
      opacity: 0.18 + ((i % 4) * 0.08),
      duration: 14 + ((i % 5) * 4),
      delay: (i % 7) * 1.5,
    }));
  }, []);

  return (
    <>
      <div className="ambient-glow" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
      
      {/* Soft floating luminous embers */}
      <div className="particles-container" aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className="ambient-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};
