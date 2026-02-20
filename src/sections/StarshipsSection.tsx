import { useState } from 'react';
import StarshipCard from '../components/StarshipCard';
import Pagination from '../components/Pagination';
import { useStarships } from '../hooks/useStarships';
import { starshipImages, STARSHIPS_PER_PAGE } from '../constants/imageMapping';

const StarshipsSection = () => {
  const { starships, loading } = useStarships();
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
    return <div className="text-primary font-stellar-light">Loading starships...</div>;
  }

  const totalPages = Math.ceil(starships.length / STARSHIPS_PER_PAGE);
  const displayedStarships = starships.slice(
    currentPage * STARSHIPS_PER_PAGE,
    (currentPage + 1) * STARSHIPS_PER_PAGE
  );

  return (
    <section id="starships" className="mb-[149px]" style={{ marginTop: '130px' }}>
      {/* Header */}
      <div className="mb-[82px]">
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

      {/* Grid - 3×2 */}
      <div
        className={`
          grid grid-cols-3 gap-[30px]
          transition-all duration-300
          ${slideDirection === 'left' ? 'animate-slideOutLeft' : ''}
          ${slideDirection === 'right' ? 'animate-slideOutRight' : ''}
          ${!slideDirection ? 'animate-slideIn' : ''}
        `}
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

export default StarshipsSection;