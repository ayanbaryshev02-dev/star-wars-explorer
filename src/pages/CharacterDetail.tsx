import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCharacter } from '../services/swapi';
import DetailModal from '../components/DetailModal';
import { characterImages, CHARACTER_IDS } from '../constants/imageMapping';
import { useCardRotation } from '../hooks/useCardRotation';
import { useBreakpoint } from '../hooks/useBreakpoint';
import type { Character } from '../types';
import charactersData from '../../public/data/characters.json';

const CHARACTERS_WITH_CARDS = [11, 2, 4, 67, 79, 51, 44, 10, 35, 21, 3, 20];

const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDesktop } = useBreakpoint();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  const currentIndex = CHARACTER_IDS.indexOf(Number(id));
  const hasCard = CHARACTERS_WITH_CARDS.includes(Number(id));
  const cardRotation = useCardRotation({ enabled: hasCard && isDesktop });

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getCharacter(Number(id));
        setCharacter(data);
      } catch (error) {
        console.error('Error fetching character:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  const handlePageChange = (newIndex: number) => {
    navigate(`/character/${CHARACTER_IDS[newIndex]}`);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn">
        <div className="text-primary font-stellar-light text-xl">Loading...</div>
      </div>
    );
  }

  if (!character) return null;

  const characterData = charactersData.find((c) => c.id === Number(id));
  const baseImageName = characterImages[Number(id)]?.split('/').pop()?.replace('.webp', '') || '';
  const imageUrl = hasCard
    ? `/images/characters-cards/${baseImageName}-card.png`
    : characterImages[Number(id)];

  const cardStyle = isDesktop
    ? hasCard
      ? {
          width: 'auto',
          height: '388px',
          transform: `perspective(1000px) rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg) rotate(6deg)`,
          transition: 'transform 0.1s ease-out',
        }
      : {
          width: '428px',
          height: '476px',
        }
    : hasCard
    ? {
        width: '160px',
        height: '200px',
        borderRadius: '0px',
      }
    : {
        width: '150px',
        height: '165px',
        borderRadius: '10px',
      };

  return (
    <DetailModal
      title={character.name}
      beshIcon="/images/ui/characters-besh.svg"
      characteristics={[
        { label: 'height', value: character.height },
        { label: 'mass', value: character.mass },
        { label: 'birth year', value: character.birth_year },
      ]}
      description={characterData?.description || 'No description available.'}
      contentType={hasCard ? 'card' : 'photo'}
      leftContent={
        <img
          id={hasCard && isDesktop ? 'collectible-card' : undefined}
          src={imageUrl}
          alt={character.name}
          className="object-contain"
          style={cardStyle}
        />
      }
      totalItems={CHARACTER_IDS.length}
      currentIndex={currentIndex}
      onPageChange={handlePageChange}
      sectionId="characters"
    />
  );
};

export default CharacterDetail;