import { useState, useRef } from 'react';
import PlanetCard from '../components/PlanetCard';
import Pagination from '../components/Pagination';
import { usePlanets } from '../hooks/usePlanets';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { RESPONSIVE_CONFIG } from '../config/responsiveConfig';
import { planetImages } from '../constants/imageMapping';

const PlanetsSectionMobile = () => {
  const { planets, loading } = usePlanets();
  const { device } = useBreakpoint();
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  
  // Swipe state
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const config = RESPONSIVE_CONFIG[device];
  const itemsPerPage = config.itemsPerPage.planets;
  const gridCols = config.gridCols.planets;
  const gapX = config.planetsGapX ?? config.gap;
  const cardSize = config.cardSizes.planet;

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
    
    const totalPages = Math.ceil(planets.length / itemsPerPage);
    
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
    return <div className="text-primary font-stellar-light">Loading planets...</div>;
  }

  const totalPages = Math.ceil(planets.length / itemsPerPage);
  const displayedPlanets = planets.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const placeholderCount = itemsPerPage - displayedPlanets.length;
  const placeholders = Array.from({ length: placeholderCount });

  return (
    <section id="planets" className="mb-[120px]" style={{ marginTop: '120px' }}>
      <div className="mb-[50px]">
        <div className="flex items-center gap-2">
          <img 
            src="/images/ui/planets-icon.svg" 
            alt="" 
            className="w-8 h-8" 
            onError={(e) => e.currentTarget.style.display = 'none'} 
          />
          <h2 className="font-avant-garde text-[40px] leading-[40px] text-primary">
            PLANETS
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
          columnGap: `${gapX}px`,
          rowGap: '8px',
          touchAction: 'pan-y'
        }}
      >
        {displayedPlanets.map((planet) => {
          const planetId = parseInt(planet.url.match(/\/(\d+)\/?$/)?.[1] || '0');
          return (
            <PlanetCard
              key={planetId}
              id={planetId}
              name={planet.name}
              imageUrl={planetImages[planetId]}
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

export default PlanetsSectionMobile;