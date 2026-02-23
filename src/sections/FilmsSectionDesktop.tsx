import FilmCard from '../components/FilmCard';
import { useFilms } from '../hooks/useFilms';
import { filmImages } from '../constants/imageMapping';
import { useBreakpoint } from '../hooks/useBreakpoint';
import FilmsSectionDesktop from './FilmsSection';
import FilmsSectionMobile from './FilmsSectionMobile';

interface FilmsSectionProps {
  onCardClick: () => void;
}

const FilmsSection = ({ onCardClick }: FilmsSectionProps) => {
  
  const { films, loading } = useFilms();

  if (loading) {
    return <div className="text-primary font-stellar-light">Loading films...</div>;
  }

  return (
    <section id="films" className="mb-[149px]">
      <div className="flex gap-[30px]" onClick={onCardClick}>
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