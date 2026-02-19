import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCharacter } from '../services/swapi';
import DetailModal from '../components/DetailModal';
import { characterImages, CHARACTER_IDS } from '../constants/imageMapping';
import type { Character } from '../types';

import charactersData from '../../public/data/characters.json';

const CHARACTERS_WITH_CARDS = [11, 2, 4, 67, 79, 51, 44, 10, 35, 21, 3, 20];

const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  const currentIndex = CHARACTER_IDS.indexOf(Number(id));

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

  const characterData = charactersData.find(c => c.id === Number(id));
  const hasCard = CHARACTERS_WITH_CARDS.includes(Number(id));
  
  const baseImageName = characterImages[Number(id)]?.split('/').pop()?.replace('.webp', '') || '';
  const imageUrl = hasCard 
    ? `/images/characters-cards/${baseImageName}-card.png`
    : characterImages[Number(id)];

  return (
    <DetailModal
      title={character.name}
      beshIcon="/images/ui/characters-besh.svg"
      characteristics={[
        { label: 'height', value: character.height },
        { label: 'mass', value: character.mass },
        { label: 'birth year', value: character.birth_year }
      ]}
      description={characterData?.description || 'No description available.'}
      contentType={hasCard ? 'card' : 'photo'}
      leftContent={
        hasCard ? (

          <img 
            src={imageUrl}
            alt={character.name}
            className="object-contain"
            style={{ 
              width: 'auto',
              height: '388px',
              transform: 'rotate(6deg)'
            }}
          />
        ) : (

          <img 
            src={imageUrl}
            alt={character.name}
            className="object-cover"
            style={{
              width: '428px',
              height: '476px'
            }}
          />
        )
      }
      totalItems={CHARACTER_IDS.length}
      currentIndex={currentIndex}
      onPageChange={handlePageChange}
    />
  );
};

export default CharacterDetail;