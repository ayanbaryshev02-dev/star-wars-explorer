import type { DeviceType } from '../hooks/useBreakpoint';

interface CardSizes {
  character: { width: number; height: number; imageHeight: number; nameHeight: number; fontSize: string };
  film: { width: number; height: number; imageWidth: number; imageHeight: number; padding: number };
  planet: { width: number; height: number; imageSize: number; padding: number };
  starship: { width: number; height: number; imageContainer: number; padding: number };
}

interface LayoutConfig {
  padding: number;
  gap: number;
  gridCols: {
    films: number;
    characters: number;
    planets: number;
    starships: number;
  };
  itemsPerPage: {
    films: number;
    characters: number;
    planets: number;
    starships: number;
  };
  cardSizes: CardSizes;
  planetsGapX?: number;
}

export const RESPONSIVE_CONFIG: Record<DeviceType, LayoutConfig> = {
  'phone-small': {
    padding: 16,
    gap: 8,
    gridCols: { films: 1, characters: 3, planets: 3, starships: 3 },
    itemsPerPage: { films: 1, characters: 9, planets: 6, starships: 6 },
    planetsGapX: 12,
    cardSizes: {
      character: { width: 85, height: 100, imageHeight: 85, nameHeight: 15, fontSize: 'text-[9px]' },
      film: { width: 250, height: 400, imageWidth: 195, imageHeight: 290, padding: 28 },
      planet: { width: 85, height: 100, imageSize: 72, padding: 6 },
      starship: { width: 85, height: 95, imageContainer: 62, padding: 5 },
    },
  },
  'phone-standard': {
    padding: 16,
    gap: 8,
    gridCols: { films: 1, characters: 3, planets: 3, starships: 3 },
    itemsPerPage: { films: 1, characters: 9, planets: 6, starships: 6 },
    planetsGapX: 15,
    cardSizes: {
      character: { width: 95, height: 110, imageHeight: 95, nameHeight: 15, fontSize: 'text-[10px]' },
      film: { width: 270, height: 430, imageWidth: 210, imageHeight: 310, padding: 30 },
      planet: { width: 95, height: 150, imageSize: 82, padding: 6 },
      starship: { width: 95, height: 113, imageContainer: 69, padding: 6 },
    },
  },
  'phone-large': {
    padding: 20,
    gap: 8,
    gridCols: { films: 1, characters: 3, planets: 3, starships: 3 },
    itemsPerPage: { films: 1, characters: 9, planets: 6, starships: 6 },
    planetsGapX: 20,
    cardSizes: {
      character: { width: 115, height: 122, imageHeight: 100, nameHeight: 17, fontSize: 'text-[11px]' },
      film: { width: 280, height: 450, imageWidth: 220, imageHeight: 325, padding: 30 },
      planet: { width: 115, height: 162, imageSize: 102, padding: 7 },
      starship: { width: 115, height: 125, imageContainer: 75, padding: 7 },
    },
  },
  'phone-landscape': {
    padding: 24,
    gap: 8,
    gridCols: { films: 2, characters: 4, planets: 3, starships: 3 },
    itemsPerPage: { films: 2, characters: 12, planets: 6, starships: 6 },
    planetsGapX: 10,
    cardSizes: {
      character: { width: 110, height: 128, imageHeight: 110, nameHeight: 18, fontSize: 'text-[11px]' },
      film: { width: 260, height: 420, imageWidth: 205, imageHeight: 305, padding: 28 },
      planet: { width: 95, height: 157, imageSize: 82, padding: 7 },
      starship: { width: 160, height: 145, imageContainer: 122, padding: 10 },
    },
  },
  'tablet-portrait': {
    padding: 40,
    gap: 8,
    gridCols: { films: 2, characters: 5, planets: 3, starships: 3 },
    itemsPerPage: { films: 2, characters: 15, planets: 6, starships: 6 },
    planetsGapX: 20,
    cardSizes: {
      character: { width: 115, height: 134, imageHeight: 115, nameHeight: 19, fontSize: 'text-[11px]' },
      film: { width: 270, height: 435, imageWidth: 210, imageHeight: 315, padding: 30 },
      planet: { width: 160, height: 187, imageSize: 147, padding: 11 },
      starship: { width: 185, height: 170, imageContainer: 143, padding: 12 },
    },
  },
  'tablet-landscape': {
    padding: 50,
    gap: 8,
    gridCols: { films: 3, characters: 5, planets: 3, starships: 3 },
    itemsPerPage: { films: 3, characters: 15, planets: 6, starships: 6 },
    planetsGapX: 30,
    cardSizes: {
      character: { width: 125, height: 145, imageHeight: 125, nameHeight: 20, fontSize: 'text-[12px]' },
      film: { width: 280, height: 450, imageWidth: 220, imageHeight: 325, padding: 30 },
      planet: { width: 190, height: 223, imageSize: 177, padding: 13 },
      starship: { width: 220, height: 200, imageContainer: 170, padding: 15 },
    },
  },
  'desktop-small': {
    padding: 60,
    gap: 8,
    gridCols: { films: 4, characters: 6, planets: 3, starships: 3 },
    itemsPerPage: { films: 4, characters: 18, planets: 6, starships: 6 },
    planetsGapX: 50,
    cardSizes: {
      character: { width: 134, height: 156, imageHeight: 134, nameHeight: 22, fontSize: 'text-[12px]' },
      film: { width: 297, height: 476, imageWidth: 234, imageHeight: 345, padding: 32 },
      planet: { width: 230, height: 270, imageSize: 205, padding: 16 },
      starship: { width: 265, height: 250, imageContainer: 210, padding: 18 },
    },
  },
  'desktop': {
    padding: 60,
    gap: 30,
    gridCols: { films: 6, characters: 6, planets: 3, starships: 3 },
    itemsPerPage: { films: 6, characters: 18, planets: 6, starships: 6 },
    planetsGapX: 80,
    cardSizes: {
      character: { width: 134, height: 156, imageHeight: 134, nameHeight: 22, fontSize: 'text-[12px]' },
      film: { width: 297, height: 476, imageWidth: 234, imageHeight: 345, padding: 32 },
      planet: { width: 255, height: 299, imageSize: 219, padding: 18 },
      starship: { width: 297, height: 282, imageContainer: 234, padding: 20 },
    },
  },
};