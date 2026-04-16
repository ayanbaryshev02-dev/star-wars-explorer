import { useEffect } from 'react';
import { characterImages, planetImages, starshipImages, filmImages } from '../constants/imageMapping';

const preloadImage = (src: string): Promise<void> =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });

export const useImagePreloader = () => {
  useEffect(() => {
    const allImages = [
      ...Object.values(filmImages),
      ...Object.values(characterImages),
      ...Object.values(planetImages),
      ...Object.values(starshipImages),
    ];

    const BATCH_SIZE = 6;
    let index = 0;

    const loadBatch = () => {
      const batch = allImages.slice(index, index + BATCH_SIZE);
      if (batch.length === 0) return;
      index += BATCH_SIZE;
      Promise.all(batch.map(preloadImage)).then(loadBatch);
    };

    loadBatch();
  }, []);
};