import { useState } from 'react';
import FilmCard from '../components/FilmCard';
import Pagination from '../components/Pagination';
import { useFilms } from '../hooks/useFilms';
import { filmImages } from '../constants/imageMapping';

interface FilmsSectionMobileProps {
  onCardClick: () => void;
}

const FilmsSectionMobile = ({ onCardClick }: FilmsSectionMobileProps) => {
  const { films, loading } = useFilms();
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;
    
    setSlideDirection(newPage > currentPage ? 'left' : 'right');
    
    setTimeout(() => {
      setCurrentPage(newPage);
      setSlideDirection(null);
    }, 150);
  };

  if (loading) {
    return <div className="text-primary font-stellar-light">Loading films...</div>;
  }

  const displayedFilm = films[currentPage];
  if (!displayedFilm) return null;

  const filmId = parseInt(displayedFilm.url.match(/\/(\d+)\/?$/)?.[1] || '0');

  return (
    <section id="films" className="mb-[149px]">
      <div 
        className={`
          flex justify-center
          transition-all duration-300
          ${slideDirection === 'left' ? 'animate-slideOutLeft' : ''}
          ${slideDirection === 'right' ? 'animate-slideOutRight' : ''}
          ${!slideDirection ? 'animate-slideIn' : ''}
        `}
        onClick={onCardClick}
      >
        <FilmCard
          id={filmId}
          title={displayedFilm.title}
          episodeId={displayedFilm.episode_id}
          imageUrl={filmImages[filmId]}
        />
      </div>

      {films.length > 1 && (
        <div className="mt-[60px] flex justify-center">
          <Pagination
            totalItems={films.length}
            currentIndex={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
};

export default FilmsSectionMobile;