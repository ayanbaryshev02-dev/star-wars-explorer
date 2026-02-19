import { useState, useEffect } from 'react';
import { getCharacter } from '../services/swapi';
import { CHARACTER_IDS } from '../constants/imageMapping';
import type { Character } from '../types';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const promises = CHARACTER_IDS.map(id => getCharacter(id));
        const data = await Promise.all(promises);
        setCharacters(data);
      } catch (err) {
        setError('Failed to load characters');
        console.error('Error fetching characters:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return { characters, loading, error };
};