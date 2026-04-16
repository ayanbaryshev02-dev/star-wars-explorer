import FilmCard from '../components/FilmCard';
import { useFilms } from '../hooks/useFilms';
import { filmImages } from '../constants/imageMapping';

const FilmsSection = () => {
  
  const { films, loading } = useFilms();

  if (loading) {
    return <div className="text-primary font-stellar-light">Loading films...</div>;
  }

  return (
    <section id="films" className="mb-[149px]">
      <div className="flex gap-[30px]">
        {films.map((film) => {
          const filmId = parseInt(film.url.match(/\/(\d+)\/?$/)?.[1] || '0');
          return (
            <FilmCard
              key={filmId}
              id={filmId}
              title={film.title}
              episodeId={film.episode_id}
              imageUrl={filmImages[filmId]}
            />
          );
        })}
      </div>
    </section>
  );
};

export default FilmsSection;