import { useState, useRef } from 'react';
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
  
  // Swipe state
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;
    
    setSlideDirection(newPage > currentPage ? 'left' : 'right');
    
    setTimeout(() => {
      setCurrentPage(newPage);
      setSlideDirection(null);
    }, 150);
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && currentPage < films.length - 1) {
        handlePageChange(currentPage + 1);
      } else if (swipeDistance < 0 && currentPage > 0) {
        handlePageChange(currentPage - 1);
      }
    }
    
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (loading) {
    return <div className="text-primary font-stellar-light">Loading films...</div>;
  }

  const displayedFilm = films[currentPage];
  if (!displayedFilm) return null;

  const filmId = parseInt(displayedFilm.url.match(/\/(\d+)\/?$/)?.[1] || '0');

  return (
    <section id="films" className="mb-[120px]">
      <div 
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`
          flex justify-center
          transition-all duration-300
          ${slideDirection === 'left' ? 'animate-slideOutLeft' : ''}
          ${slideDirection === 'right' ? 'animate-slideOutRight' : ''}
          ${!slideDirection ? 'animate-slideIn' : ''}
        `}
        style={{ touchAction: 'pan-y' }}
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