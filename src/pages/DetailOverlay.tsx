import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getFilm, getCharacter, getPlanet, getStarship } from '../services/swapi';
import { CHARACTER_IDS, PLANET_IDS, STARSHIP_IDS } from '../constants/imageMapping';
import { FILM_IDS } from '../constants/detailSettings';
import FilmOverlay from '../components/overlays/FilmOverlay';
import CharacterOverlay from '../components/overlays/CharacterOverlay';
import PlanetOverlay from '../components/overlays/PlanetOverlay';
import StarshipOverlay from '../components/overlays/StarshipOverlay';
import type { Film, Character, Planet, Starship } from '../types';

type EntityData =
  | { type: 'film'; data: Film }
  | { type: 'character'; data: Character }
  | { type: 'planet'; data: Planet }
  | { type: 'starship'; data: Starship };

const IDS_MAP: Record<string, number[]> = {
  film: FILM_IDS,
  character: CHARACTER_IDS,
  planet: PLANET_IDS,
  starship: STARSHIP_IDS,
};

const FETCHERS: Record<string, (id: number) => Promise<unknown>> = {
  film: getFilm,
  character: getCharacter,
  planet: getPlanet,
  starship: getStarship,
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
    scale: 0.95,
  }),
};

const DetailOverlay = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [entity, setEntity] = useState<EntityData | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchIdRef = useRef(0);
  const directionRef = useRef(0);

  const type = searchParams.get('type');
  const id = searchParams.get('id');
  const numId = Number(id);

  const handleClose = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const handlePageChange = useCallback((newIndex: number) => {
    if (!type) return;
    const ids = IDS_MAP[type];
    if (!ids) return;

    const currentIndex = ids.indexOf(numId);
    directionRef.current = newIndex > currentIndex ? 1 : -1;

    setSearchParams({ type, id: String(ids[newIndex]) });
  }, [type, numId, setSearchParams]);

  useEffect(() => {
    if (!type || !id || !FETCHERS[type]) return;

    const currentFetchId = ++fetchIdRef.current;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await FETCHERS[type](numId);
        if (currentFetchId === fetchIdRef.current) {
          setEntity({ type, data } as EntityData);
          setLoading(false);
        }
      } catch (error) {
        if (currentFetchId === fetchIdRef.current) {
          console.error(`Error fetching ${type}:`, error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [type, id, numId]);

  if (!type || !id) return null;

  if (loading || !entity || entity.type !== type) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="text-primary font-stellar text-xl">Loading...</div>
      </div>
    );
  }

  const props = { id: numId, onPageChange: handlePageChange, onClose: handleClose };
  const overlayKey = `${type}-${numId}`;

  const renderOverlay = () => {
    switch (entity.type) {
      case 'film':
        return <FilmOverlay film={entity.data} {...props} />;
      case 'character':
        return <CharacterOverlay character={entity.data} {...props} />;
      case 'planet':
        return <PlanetOverlay planet={entity.data} {...props} />;
      case 'starship':
        return <StarshipOverlay starship={entity.data} {...props} />;
    }
  };

  return (
    <AnimatePresence mode="wait" custom={directionRef.current}>
      <motion.div
        key={overlayKey}
        custom={directionRef.current}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        style={{ position: 'fixed', inset: 0, zIndex: 50 }}
      >
        {renderOverlay()}
      </motion.div>
    </AnimatePresence>
  );
};

export default DetailOverlay;