import { useState, useEffect } from 'react';
import { getFilms } from '../services/swapi';
import type { Film } from '../types';

export const useFilms = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setLoading(true);
        const data = await getFilms([4, 5, 6]);
        setFilms(data.sort((a, b) => a.episode_id - b.episode_id));
      } catch (err) {
        setError('Failed to load films');
        console.error('Error fetching films:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  return { films, loading, error };
};