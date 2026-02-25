import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
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

const DetailOverlay = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [entity, setEntity] = useState<EntityData | null>(null);
  const [loading, setLoading] = useState(false);

  const type = searchParams.get('type');
  const id = searchParams.get('id');
  const numId = Number(id);

  const handleClose = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const handlePageChange = useCallback((newIndex: number) => {
    if (!type) return;
    const ids = IDS_MAP[type];
    if (ids) setSearchParams({ type, id: String(ids[newIndex]) });
  }, [type, setSearchParams]);

  useEffect(() => {
    if (!type || !id || !FETCHERS[type]) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await FETCHERS[type](numId);
        setEntity({ type, data } as EntityData);
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

  if (!entity || entity.type !== type) return null;

  const props = { id: numId, onPageChange: handlePageChange, onClose: handleClose };

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

export default DetailOverlay;