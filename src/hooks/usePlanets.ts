import { useState, useEffect } from 'react';
import { getPlanets } from '../services/swapi';
import { PLANET_IDS } from '../constants/imageMapping';
import type { Planet } from '../types';

export const usePlanets = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        setLoading(true);
        const data = await getPlanets(PLANET_IDS);
        setPlanets(data);
      } catch (err) {
        setError('Failed to load planets');
        console.error('Error fetching planets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  return { planets, loading, error };
};