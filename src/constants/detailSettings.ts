export interface PlanetSettings {
  size: { width: number; height: number };
  rotation: number;
  offsetX: number;
  offsetY: number;
}

export interface PlanetSettingsMobile {
  size: { width: number; height: number };
  rotation: number;
  offsetY: number;
}

export const PLANET_SETTINGS: Record<number, PlanetSettings> = {
  1: { size: { width: 800, height: 800 }, rotation: 90, offsetX: -90, offsetY: 150 },
  2: { size: { width: 800, height: 800 }, rotation: 20, offsetX: -90, offsetY: -120 },
  8: { size: { width: 800, height: 800 }, rotation: 190, offsetX: -90, offsetY: 160 },
  9: { size: { width: 800, height: 800 }, rotation: 190, offsetX: -90, offsetY: 10 },
  10: { size: { width: 800, height: 800 }, rotation: 100, offsetX: -90, offsetY: 160 },
  11: { size: { width: 800, height: 800 }, rotation: 0, offsetX: -120, offsetY: 0 },
  13: { size: { width: 800, height: 800 }, rotation: 0, offsetX: -150, offsetY: -162 },
  14: { size: { width: 800, height: 800 }, rotation: 10, offsetX: -90, offsetY: 150 },
  15: { size: { width: 800, height: 800 }, rotation: 30, offsetX: -90, offsetY: 0 },
  16: { size: { width: 800, height: 800 }, rotation: 0, offsetX: -150, offsetY: -162 },
  17: { size: { width: 800, height: 800 }, rotation: 90, offsetX: -90, offsetY: 150 },
  18: { size: { width: 800, height: 800 }, rotation: 190, offsetX: -90, offsetY: -180 },
  19: { size: { width: 800, height: 800 }, rotation: 90, offsetX: -90, offsetY: 150 },
};

export const PLANET_SETTINGS_MOBILE: Record<number, PlanetSettingsMobile> = {
  1: { size: { width: 500, height: 450 }, rotation: 0, offsetY: -260 },
  2: { size: { width: 500, height: 500 }, rotation: 0, offsetY: -270 },
  8: { size: { width: 450, height: 450 }, rotation: 0, offsetY: -260 },
  9: { size: { width: 500, height: 500 }, rotation: 0, offsetY: -295 },
  10: { size: { width: 400, height: 400 }, rotation: 0, offsetY: -210 },
  11: { size: { width: 500, height: 500 }, rotation: 0, offsetY: 0 },
  13: { size: { width: 480, height: 480 }, rotation: 0, offsetY: -270 },
  14: { size: { width: 450, height: 450 }, rotation: 0, offsetY: -250 },
  15: { size: { width: 350, height: 350 }, rotation: 20, offsetY: -70 },
  16: { size: { width: 355, height: 355 }, rotation: 60, offsetY: -150 },
  17: { size: { width: 370, height: 370 }, rotation: 150, offsetY: -165 },
  18: { size: { width: 352, height: 352 }, rotation: -70, offsetY: -160 },
  19: { size: { width: 360, height: 360 }, rotation: 140, offsetY: -170 },
};

export const DEFAULT_PLANET_SETTINGS: PlanetSettings = {
  size: { width: 800, height: 800 }, rotation: 0, offsetX: -150, offsetY: -15,
};

export const DEFAULT_PLANET_SETTINGS_MOBILE: PlanetSettingsMobile = {
  size: { width: 500, height: 500 }, offsetY: 0, rotation: 0,
};


export interface StarshipSettings {
  size: { width: number; height: number };
  rotation: number;
  offsetX: number;
  offsetY: number;
  scaleX?: number;
}

export const STARSHIP_SETTINGS: Record<number, StarshipSettings> = {
  2: { size: { width: 800, height: 800 }, rotation: 10, offsetX: -90, offsetY: -15, scaleX: -1 },
  3: { size: { width: 900, height: 900 }, rotation: 12, offsetX: 0, offsetY: 30, scaleX: -1 },
  5: { size: { width: 700, height: 505 }, rotation: 0, offsetX: 0, offsetY: 20, scaleX: -1 },
  9: { size: { width: 600, height: 605 }, rotation: 0, offsetX: -10, offsetY: 90 },
  21: { size: { width: 489, height: 445 }, rotation: 0, offsetX: 120, offsetY: -15 },
  31: { size: { width: 809, height: 845 }, rotation: 10, offsetX: 20, offsetY: 90 },
  32: { size: { width: 589, height: 545 }, rotation: 0, offsetX: 40, offsetY: -15, scaleX: -1 },
  39: { size: { width: 589, height: 445 }, rotation: 0, offsetX: 100, offsetY: 5, scaleX: -1 },
  40: { size: { width: 550, height: 550 }, rotation: 0, offsetX: 120, offsetY: 50, scaleX: -1 },
  48: { size: { width: 489, height: 445 }, rotation: 0, offsetX: 160, offsetY: -15 },
  58: { size: { width: 489, height: 445 }, rotation: 20, offsetX: 130, offsetY: -15, scaleX: -1 },
  59: { size: { width: 589, height: 545 }, rotation: 20, offsetX: 120, offsetY: 55 },
  61: { size: { width: 689, height: 645 }, rotation: 0, offsetX: 20, offsetY: -15, scaleX: -1 },
  63: { size: { width: 589, height: 545 }, rotation: 0, offsetX: 80, offsetY: 0, scaleX: -1 },
  64: { size: { width: 489, height: 445 }, rotation: 0, offsetX: 120, offsetY: -15 },
  66: { size: { width: 589, height: 545 }, rotation: 0, offsetX: 150, offsetY: -15 },
  68: { size: { width: 550, height: 550 }, rotation: 20, offsetX: 150, offsetY: 55, scaleX: -1 },
  74: { size: { width: 489, height: 445 }, rotation: 0, offsetX: 150, offsetY: -15, scaleX: -1 },
  75: { size: { width: 489, height: 445 }, rotation: 0, offsetX: 150, offsetY: -15 },
};

export const STARSHIP_SETTINGS_MOBILE: Record<number, StarshipSettings> = {
  2: { size: { width: 320, height: 320 }, rotation: 5, offsetX: 0, offsetY: -5, scaleX: 1 },
  3: { size: { width: 320, height: 320 }, rotation: 15, offsetX: 6, offsetY: 30, scaleX: -1 },
  5: { size: { width: 300, height: 255 }, rotation: 0, offsetX: 0, offsetY: 20, scaleX: -1 },
  9: { size: { width: 400, height: 405 }, rotation: 0, offsetX: 0, offsetY: 160 },
  21: { size: { width: 220, height: 200 }, rotation: 0, offsetX: 0, offsetY: 10 },
  31: { size: { width: 809, height: 845 }, rotation: 10, offsetX: 0, offsetY: 0 },
  32: { size: { width: 589, height: 545 }, rotation: 0, offsetX: 0, offsetY: 0, scaleX: 1 },
  39: { size: { width: 300, height: 400 }, rotation: 0, offsetX: 0, offsetY: 5, scaleX: 1 },
  40: { size: { width: 300, height: 350 }, rotation: 0, offsetX: 0, offsetY: 0, scaleX: -1 },
  48: { size: { width: 250, height: 250 }, rotation: 0, offsetX: 0, offsetY: 0, scaleX: -1 },
  58: { size: { width: 300, height: 300 }, rotation: 20, offsetX: 0, offsetY: 0, scaleX: -1 },
  59: { size: { width: 300, height: 300 }, rotation: 0, offsetX: 0, offsetY: 30 },
  61: { size: { width: 400, height: 400 }, rotation: 0, offsetX: 0, offsetY: -15, scaleX: 1 },
  63: { size: { width: 300, height: 250 }, rotation: 10, offsetX: 0, offsetY: 0, scaleX: 1 },
  64: { size: { width: 200, height: 205 }, rotation: 0, offsetX: 0, offsetY: 0 },
  66: { size: { width: 300, height: 345 }, rotation: -20, offsetX: 10, offsetY: -15 },
  68: { size: { width: 400, height: 400 }, rotation: 5, offsetX: 0, offsetY: 0, scaleX: -1 },
  74: { size: { width: 200, height: 200 }, rotation: 0, offsetX: 0, offsetY: 0, scaleX: -1 },
  75: { size: { width: 220, height: 220 }, rotation: 0, offsetX: 30, offsetY: 0 },
};

export const DEFAULT_STARSHIP_SETTINGS: StarshipSettings = {
  size: { width: 800, height: 445 }, offsetX: 0, offsetY: -15, rotation: 0,
};

export const DEFAULT_STARSHIP_SETTINGS_MOBILE: StarshipSettings = {
  size: { width: 400, height: 400 }, offsetX: 0, offsetY: -15, rotation: 0,
};

export const FILM_IDS = [4, 5, 6];
export const CHARACTERS_WITH_CARDS = [11, 2, 4, 67, 79, 51, 44, 10, 35, 21, 3, 20];