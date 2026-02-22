import { useState, useEffect } from 'react';

interface CardRotation {
  x: number;
  y: number;
}

interface UseCardRotationOptions {
  maxRotation?: number;
  maxDistance?: number;
  enabled: boolean;
}

export const useCardRotation = (options: UseCardRotationOptions): CardRotation => {
  const { maxRotation = 20, maxDistance = 1500, enabled } = options;
  const [rotation, setRotation] = useState<CardRotation>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const card = document.getElementById('collectible-card');
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance > maxDistance) {
        setRotation({ x: 0, y: 0 });
        return;
      }

      const rotateY = Math.max(
        Math.min((deltaX / rect.width) * maxRotation, maxRotation),
        -maxRotation
      );
      const rotateX = Math.max(
        Math.min(-(deltaY / rect.height) * maxRotation, maxRotation),
        -maxRotation
      );

      setRotation({ x: rotateX, y: rotateY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled, maxRotation, maxDistance]);

  return rotation;
};