import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFilm, getCharacter, getPlanet, getStarship } from '../services/swapi';
import DetailModal from '../components/DetailModal';
import { filmImages, characterImages, planetImages, starshipImages, CHARACTER_IDS, PLANET_IDS, STARSHIP_IDS } from '../constants/imageMapping';
import { useCardRotation } from '../hooks/useCardRotation';
import { useBreakpoint } from '../hooks/useBreakpoint';
import type { Film, Character, Planet, Starship } from '../types';
import charactersData from '../../public/data/characters.json';
import planetsData from '../../public/data/planets.json';
import starshipsData from '../../public/data/starships.json';

const FILM_IDS = [4, 5, 6];
const CHARACTERS_WITH_CARDS = [11, 2, 4, 67, 79, 51, 44, 10, 35, 21, 3, 20];

interface PlanetSettings {
  size: { width: number; height: number };
  rotation: number;
  offsetX: number;
  offsetY: number;
}
interface PlanetSettingsMobile {
  size: { width: number; height: number };
  rotation: number;
  offsetY: number;
}

const PLANET_SETTINGS: Record<number, PlanetSettings> = {
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

const PLANET_SETTINGS_MOBILE: Record<number, PlanetSettingsMobile> = {
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

const DEFAULT_PLANET_SETTINGS: PlanetSettings = {
  size: { width: 800, height: 800 }, rotation: 0, offsetX: -150, offsetY: -15,
};
const DEFAULT_PLANET_SETTINGS_MOBILE: PlanetSettingsMobile = {
  size: { width: 500, height: 500 }, offsetY: 0, rotation: 0,
};

interface StarshipSettings {
  size: { width: number; height: number };
  rotation: number;
  offsetX: number;
  offsetY: number;
  scaleX?: number;
}

const STARSHIP_SETTINGS: Record<number, StarshipSettings> = {
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

const STARSHIP_SETTINGS_MOBILE: Record<number, StarshipSettings> = {
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

const DEFAULT_STARSHIP_SETTINGS: StarshipSettings = {
  size: { width: 800, height: 445 }, offsetX: 0, offsetY: -15, rotation: 0,
};
const DEFAULT_STARSHIP_SETTINGS_MOBILE: StarshipSettings = {
  size: { width: 400, height: 400 }, offsetX: 0, offsetY: -15, rotation: 0,
};

const DetailOverlay = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDesktop } = useBreakpoint();

  const type = searchParams.get('type');
  const id = searchParams.get('id');

  const [film, setFilm] = useState<Film | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [starship, setStarship] = useState<Starship | null>(null);
  const [loading, setLoading] = useState(false);

  const numId = Number(id);
  const hasCard = type === 'character' && CHARACTERS_WITH_CARDS.includes(numId);
  const cardRotation = useCardRotation({ enabled: hasCard && isDesktop });

  const handleClose = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const handlePageChange = useCallback((entityType: string, ids: number[], newIndex: number) => {
    setSearchParams({ type: entityType, id: String(ids[newIndex]) });
  }, [setSearchParams]);

  useEffect(() => {
    if (!type || !id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        switch (type) {
          case 'film': {
            const data = await getFilm(numId);
            setFilm(data);
            setCharacter(null); setPlanet(null); setStarship(null);
            break;
          }
          case 'character': {
            const data = await getCharacter(numId);
            setCharacter(data);
            setFilm(null); setPlanet(null); setStarship(null);
            break;
          }
          case 'planet': {
            const data = await getPlanet(numId);
            setPlanet(data);
            setFilm(null); setCharacter(null); setStarship(null);
            break;
          }
          case 'starship': {
            const data = await getStarship(numId);
            setStarship(data);
            setFilm(null); setCharacter(null); setPlanet(null);
            break;
          }
        }
      } catch (error) {
        console.error(`Error fetching ${type}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id, numId]);

  if (!type || !id) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn">
        <div className="text-primary font-stellar-light text-xl">Loading...</div>
      </div>
    );
  }

  if (type === 'film' && film) {
    const currentIndex = FILM_IDS.indexOf(numId);
    const imageSize = isDesktop
      ? { width: 234, height: 345 }
      : { width: 140, height: 200 };

    return (
      <DetailModal
        title={film.title}
        subtitle={`(Episode ${film.episode_id})`}
        beshIcon="/images/ui/films-besh.svg"
        characteristics={[
          { label: 'Director', value: film.director },
          { label: 'Release Date', value: film.release_date }
        ]}
        description={film.opening_crawl}
        contentType="film"
        leftContent={
          <img
            src={filmImages[numId]}
            alt={film.title}
            className="object-cover"
            style={{
              width: imageSize.width,
              height: imageSize.height,
              borderRadius: isDesktop ? '0' : '10px'
            }}
          />
        }
        totalItems={FILM_IDS.length}
        currentIndex={currentIndex}
        onPageChange={(newIndex) => handlePageChange('film', FILM_IDS, newIndex)}
        onClose={handleClose}
        sectionId="films"
      />
    );
  }

  if (type === 'character' && character) {
    const currentIndex = CHARACTER_IDS.indexOf(numId);
    const characterData = charactersData.find((c) => c.id === numId);
    const baseImageName = characterImages[numId]?.split('/').pop()?.replace('.webp', '') || '';
    const imageUrl = hasCard
      ? `/images/characters-cards/${baseImageName}-card.png`
      : characterImages[numId];

    const cardStyle = isDesktop
      ? hasCard
        ? {
            width: 'auto',
            height: '388px',
            transform: `perspective(1000px) rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg) rotate(6deg)`,
            transition: 'transform 0.1s ease-out',
          }
        : { width: '428px', height: '476px' }
      : hasCard
      ? { width: '160px', height: '200px', borderRadius: '0px' }
      : { width: '150px', height: '165px', borderRadius: '10px' };

    return (
      <DetailModal
        title={character.name}
        beshIcon="/images/ui/characters-besh.svg"
        characteristics={[
          { label: 'height', value: character.height },
          { label: 'mass', value: character.mass },
          { label: 'birth year', value: character.birth_year },
        ]}
        description={characterData?.description || 'No description available.'}
        contentType={hasCard ? 'card' : 'photo'}
        leftContent={
          <img
            id={hasCard && isDesktop ? 'collectible-card' : undefined}
            src={imageUrl}
            alt={character.name}
            className="object-contain"
            style={cardStyle}
          />
        }
        totalItems={CHARACTER_IDS.length}
        currentIndex={currentIndex}
        onPageChange={(newIndex) => handlePageChange('character', CHARACTER_IDS, newIndex)}
        onClose={handleClose}
        sectionId="characters"
      />
    );
  }

  if (type === 'planet' && planet) {
    const currentIndex = PLANET_IDS.indexOf(numId);
    const planetData = planetsData.find((p) => p.id === numId);
    const isGeonosis = numId === 11;
    const imageUrl = isGeonosis ? '/images/planets/geonosis.webp' : planetImages[numId];
    const settings = PLANET_SETTINGS[numId] || DEFAULT_PLANET_SETTINGS;
    const mobileSettings = PLANET_SETTINGS_MOBILE[numId] || DEFAULT_PLANET_SETTINGS_MOBILE;

    return (
      <DetailModal
        title={planet.name}
        beshIcon="/images/ui/planets-besh.svg"
        characteristics={[
          { label: 'Rotation period', value: planet.rotation_period },
          { label: 'Diameter', value: planet.diameter },
          { label: 'Climate', value: planet.climate },
          { label: 'Population', value: planet.population },
        ]}
        description={planetData?.description || 'No description available.'}
        contentType="planet"
        leftContent={
          isDesktop ? (
            <img
              src={imageUrl}
              alt={planet.name}
              className="rounded-full object-cover"
              style={{
                transform: `rotate(${settings.rotation}deg)`,
                marginLeft: `${settings.offsetX}px`,
                marginTop: `${settings.offsetY}px`,
              }}
            />
          ) : (
            <img
              src={imageUrl}
              alt={planet.name}
              className="object-cover"
              style={{
                width: `${mobileSettings.size.width}px`,
                height: `${mobileSettings.size.height}px`,
                marginTop: `${mobileSettings.offsetY}px`,
                transform: `rotate(${mobileSettings.rotation}deg)`,
              }}
            />
          )
        }
        totalItems={PLANET_IDS.length}
        currentIndex={currentIndex}
        onPageChange={(newIndex) => handlePageChange('planet', PLANET_IDS, newIndex)}
        onClose={handleClose}
        sectionId="planets"
      />
    );
  }

  if (type === 'starship' && starship) {
    const currentIndex = STARSHIP_IDS.indexOf(numId);
    const starshipData = starshipsData.find((s) => s.id === numId);
    const settings = STARSHIP_SETTINGS[numId] || DEFAULT_STARSHIP_SETTINGS;
    const mobileSettings = STARSHIP_SETTINGS_MOBILE[numId] || DEFAULT_STARSHIP_SETTINGS_MOBILE;

    const mobileStyle = {
      width: `${mobileSettings.size.width}px`,
      height: `${mobileSettings.size.height}px`,
      transform: `rotate(${mobileSettings.rotation}deg) scaleX(${mobileSettings.scaleX || 1})`,
      marginLeft: `${mobileSettings.offsetX}px`,
      marginTop: `${mobileSettings.offsetY}px`,
      objectFit: 'contain' as const,
    };

    const desktopStyle = {
      width: `${settings.size.width}px`,
      height: `${settings.size.height}px`,
      transform: `rotate(${settings.rotation}deg) scaleX(${settings.scaleX || 1})`,
      marginLeft: `${settings.offsetX}px`,
      marginTop: `${settings.offsetY}px`,
      objectFit: 'contain' as const,
    };

    return (
      <DetailModal
        title={starship.name}
        beshIcon="/images/ui/starships-besh.svg"
        characteristics={[
          { label: 'Manufacturer', value: starship.manufacturer },
          { label: 'Length', value: `${starship.length}m` },
          { label: 'Crew', value: starship.crew },
          { label: 'Max speed', value: starship.max_atmosphering_speed },
          { label: 'Passengers', value: starship.passengers },
        ]}
        description={starshipData?.description || 'No description available.'}
        contentType="starship"
        leftContent={
          <img
            src={starshipImages[numId]}
            alt={starship.name}
            className="object-contain"
            style={isDesktop ? desktopStyle : mobileStyle}
          />
        }
        totalItems={STARSHIP_IDS.length}
        currentIndex={currentIndex}
        onPageChange={(newIndex) => handlePageChange('starship', STARSHIP_IDS, newIndex)}
        onClose={handleClose}
        sectionId="starships"
      />
    );
  }

  return null;
};

export default DetailOverlay;