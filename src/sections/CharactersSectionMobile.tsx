import { useState, useRef } from 'react';
import CharacterCard from '../components/CharacterCard';
import Pagination from '../components/Pagination';
import { useCharacters } from '../hooks/useCharacters';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { RESPONSIVE_CONFIG } from '../config/responsiveConfig';
import { characterImages } from '../constants/imageMapping';

const CharactersSectionMobile = () => {
  const { characters, loading } = useCharacters();
  const { device } = useBreakpoint();
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const config = RESPONSIVE_CONFIG[device];
  const itemsPerPage = config.itemsPerPage.characters;
  const gridCols = config.gridCols.characters;
  const cardSize = config.cardSizes.character;

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;
    setSlideDirection(newPage > currentPage ? 'left' : 'right');
    setTimeout(() => {
      setCurrentPage(newPage);
      setSlideDirection(null);
    }, 150);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchEndX.current === 0) {
      touchStartX.current = 0;
      return;
    }

    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    
    const totalPages = Math.ceil(characters.length / itemsPerPage);
    
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
    return <div className="text-primary font-stellar-light">Loading characters...</div>;
  }

  const totalPages = Math.ceil(characters.length / itemsPerPage);
  const displayedCharacters = characters.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const placeholderCount = itemsPerPage - displayedCharacters.length;
  const placeholders = Array.from({ length: placeholderCount });

  return (
    <section id="characters" className="mb-[120px]" style={{ marginTop: '130px' }}>
      <div className="mb-[50px]">
        <div className="flex items-center gap-2">
          <img 
            src="/images/ui/characters-icon.svg" 
            alt="" 
            className="w-8 h-8"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
          <h2 className="font-avant-garde text-[40px] leading-[40px] text-primary">
            CHARACTERS
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
        {displayedCharacters.map((character) => {
          const characterId = parseInt(character.url.match(/\/(\d+)\/?$/)?.[1] || '0');
          return (
            <CharacterCard
              key={characterId}
              id={characterId}
              name={character.name}
              imageUrl={characterImages[characterId]}
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

export default CharactersSectionMobile;