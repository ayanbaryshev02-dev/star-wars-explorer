import { useState, useEffect } from 'react';
import { getFilms } from '../services/swapi';
import FilmCard from '../components/FilmCard';
import type { Film } from '../types';

const Home = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setLoading(true);
        const data = await getFilms([4, 5, 6]);
        setFilms(data);
      } catch (error) {
        console.error('Error fetching films:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  const sections = [
    { id: 'characters', title: 'CHARACTERS', icon: '/images/ui/characters-icon.svg' },
    { id: 'planets', title: 'PLANETS', icon: '/images/ui/planets-icon.svg' },
    { id: 'starships', title: 'STARSHIPS', icon: '/images/ui/starships-icon.svg' },
  ];

  const filmImages: Record<number, string> = {
    4: '/images/films/episode-1.jpg',
    5: '/images/films/episode-2.jpg',
    6: '/images/films/episode-3.jpg',
  };

  return (
    <div className="pt-[134px] max-w-content mx-auto px-8">
      <section id="films" className="mb-[149px]">
        {loading ? (
          <div className="text-primary font-stellar-light">Loading films...</div>
        ) : (
          <div className="flex gap-[30px]">
            {films
              .sort((a, b) => a.episode_id - b.episode_id)
              .map((film) => {
                const filmId = parseInt(film.url.match(/\/(\d+)\/?$/)?.[1] || '0');
                return (
                  <FilmCard
                    key={filmId}
                    id={filmId}
                    title={film.title}
                    episodeId={film.episode_id}
                    imageUrl={filmImages[filmId] || '/images/films/episode-1.jpg'}
                  />
                );
              })}
          </div>
        )}
      </section>

      {sections.map((section) => (
        <section 
          key={section.id} 
          id={section.id} 
          className="mb-[149px]"
          style={{ marginTop: '130px' }}
        >
          <div className="mb-[82px]">
            <div className="flex items-center gap-2">
              <img 
                src={section.icon} 
                alt="" 
                className="w-8 h-8"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
              <h2 className="font-avant-garde text-[40px] leading-[40px] text-primary">
                {section.title}
              </h2>
            </div>
          </div>

          <div className="text-primary font-stellar-light text-base">
            Coming soon...
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;