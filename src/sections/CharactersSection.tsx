import { useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import Pagination from '../components/Pagination';
import { useCharacters } from '../hooks/useCharacters';
import { characterImages, ITEMS_PER_PAGE } from '../constants/imageMapping';

const CharactersSection = () => {
  const { characters, loading } = useCharacters();
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
    return <div className="text-primary font-stellar-light">Loading characters...</div>;
  }

  const totalPages = Math.ceil(characters.length / ITEMS_PER_PAGE);
  const displayedCharacters = characters.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <section 
      id="characters" 
      className="mb-[149px]"
      style={{ marginTop: '130px' }}
    >
      {/* Header */}
      <div className="mb-[82px]">
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

      {/* Grid with animation */}
      <div 
        className={`
          grid grid-cols-6 gap-[30px]
          transition-all duration-300
          ${slideDirection === 'left' ? 'animate-slideOutLeft' : ''}
          ${slideDirection === 'right' ? 'animate-slideOutRight' : ''}
          ${!slideDirection ? 'animate-slideIn' : ''}
        `}
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

export default CharactersSection;