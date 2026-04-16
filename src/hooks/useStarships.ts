import { useState, useEffect } from 'react';
import { getStarships } from '../services/swapi';
import { STARSHIP_IDS } from '../constants/imageMapping';
import type { Starship } from '../types';

export const useStarships = () => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStarships = async () => {
      try {
        setLoading(true);
        const data = await getStarships(STARSHIP_IDS);
        setStarships(data);
      } catch (err) {
        setError('Failed to load starships');
        console.error('Error fetching starships:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStarships();
  }, []);

  return { starships, loading, error };
};