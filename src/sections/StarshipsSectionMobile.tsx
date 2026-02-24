import { useState, useRef } from 'react';
import StarshipCard from '../components/StarshipCard';
import Pagination from '../components/Pagination';
import { useStarships } from '../hooks/useStarships';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { RESPONSIVE_CONFIG } from '../config/responsiveConfig';
import { starshipImages } from '../constants/imageMapping';

const StarshipsSectionMobile = () => {
  const { starships, loading } = useStarships();
  const { device } = useBreakpoint();
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  
  // Swipe state
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const config = RESPONSIVE_CONFIG[device];
  const itemsPerPage = config.itemsPerPage.starships;
  const gridCols = config.gridCols.starships;
  const cardSize = config.cardSizes.starship;

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
    
    const totalPages = Math.ceil(starships.length / itemsPerPage);
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && currentPage < totalPages - 1) {
        handlePageChange(currentPage + 1);
      } else if (swipeDistance < 0 && currentPage > 0) {
        handlePageChange(currentPage - 1);
      }
    }
    
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (loading) {
    return <div className="text-primary font-stellar-light">Loading starships...</div>;
  }

  const totalPages = Math.ceil(starships.length / itemsPerPage);
  const displayedStarships = starships.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const placeholderCount = itemsPerPage - displayedStarships.length;
  const placeholders = Array.from({ length: placeholderCount });

  return (
    <section id="starships" className="mb-[120px]" style={{ marginTop: '130px' }}>
      <div className="mb-[50px]">
        <div className="flex items-center gap-2">
          <img
            src="/images/ui/starships-icon.svg"
            alt=""
            className="w-8 h-8"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
          <h2 className="font-avant-garde text-[40px] leading-[40px] text-primary">
            STARSHIPS
          </h2>
        </div>
      </div>

      <div 
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`
          grid justify-center
          transition-all duration-300
          ${slideDirection === 'left' ? 'animate-slideOutLeft' : ''}
          ${slideDirection === 'right' ? 'animate-slideOutRight' : ''}
          ${!slideDirection ? 'animate-slideIn' : ''}
        `}
        style={{ 
          gridTemplateColumns: `repeat(${gridCols}, auto)`,
          gap: '8px',
          touchAction: 'pan-y'
        }}
      >
        {displayedStarships.map((starship) => {
          const starshipId = parseInt(starship.url.match(/\/(\d+)\/?$/)?.[1] || '0');
          return (
            <StarshipCard
              key={starshipId}
              id={starshipId}
              name={starship.name}
              imageUrl={starshipImages[starshipId]}
            />
          );
        })}
        {placeholders.map((_, index) => (
          <div 
            key={`placeholder-${index}`} 
            style={{ width: cardSize.width, height: cardSize.height }} 
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-[60px] flex justify-center">
          <Pagination
            totalItems={totalPages}
            currentIndex={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
};

export default StarshipsSectionMobile;