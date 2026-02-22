import { useState } from 'react';
import PlanetCard from '../components/PlanetCard';
import Pagination from '../components/Pagination';
import { usePlanets } from '../hooks/usePlanets';
import { planetImages, PLANETS_PER_PAGE } from '../constants/imageMapping';

const PlanetsSection = () => {
  const { planets, loading } = usePlanets();
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
    return <div className="text-primary font-stellar-light">Loading planets...</div>;
  }

  const totalPages = Math.ceil(planets.length / PLANETS_PER_PAGE);
  const displayedPlanets = planets.slice(
    currentPage * PLANETS_PER_PAGE,
    (currentPage + 1) * PLANETS_PER_PAGE
  );

  const placeholderCount = PLANETS_PER_PAGE - displayedPlanets.length;
  const placeholders = Array.from({ length: placeholderCount });

  return (
    <section 
      id="planets" 
      className="mb-[149px]"
      style={{ marginTop: '130px' }}
    >
      {/* Header */}
      <div className="mb-[82px]">
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

      {/* Grid with animation - 3×2 */}
      <div 
        className={`
          grid grid-cols-3 gap-x-[80px] gap-y-[80px]
          transition-all duration-300
          ${slideDirection === 'left' ? 'animate-slideOutLeft' : ''}
          ${slideDirection === 'right' ? 'animate-slideOutRight' : ''}
          ${!slideDirection ? 'animate-slideIn' : ''}
        `}
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
          <div key={`placeholder-${index}`} className="w-[255px] h-[299px]" />
        ))}
      </div>      

      {/* Pagination */}
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

export default PlanetsSection;