import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lightsaber from '../Lightsaber';

interface CharacterCardProps {
  id: number;
  name: string;
  imageUrl: string;
}

const CharacterCard = ({ id, name, imageUrl }: CharacterCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/character/${id}`);
  };

  return (
    <div
      className="relative cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div 
        className={`
          w-[134px] h-[156px]
          border border-primary rounded-[10px]
          overflow-hidden
          transition-all duration-300
          ${isHovered ? 'glow-border' : ''}
        `}
      >

        <div className="w-full h-[134px]">
          <img 
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full h-[22px] bg-black border-t border-primary/50 flex items-center justify-center px-2">
          <p className="font-stellar text-[12px] font-bold text-primary text-center truncate leading-tight">
            {name}
          </p>
        </div>
      </div>

      {isHovered && <Lightsaber color="blue" />}
    </div>
  );
};

export default CharacterCard;