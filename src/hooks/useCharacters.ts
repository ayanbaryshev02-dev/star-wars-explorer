import { useState, useEffect } from 'react';
import { getCharacters } from '../services/swapi';
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
        const data = await getCharacters(CHARACTER_IDS);
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