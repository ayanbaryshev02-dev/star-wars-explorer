import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { RESPONSIVE_CONFIG } from '../../config/responsiveConfig';
import Lightsaber from '../Lightsaber';

interface CharacterCardMobileProps {
  id: number;
  name: string;
  imageUrl: string;
}

const CharacterCardMobile = ({ id, name, imageUrl }: CharacterCardMobileProps) => {
  const navigate = useNavigate();
  const { device } = useBreakpoint();
  const [isHovered, setIsHovered] = useState(false);

  const config = RESPONSIVE_CONFIG[device].cardSizes.character;

  const handleClick = () => {
    navigate(`/character/${id}`);
  };

  return (
    <div
      className="relative cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ width: config.width, height: config.height }}
    >
      <div 
        className={`
          w-full h-full
          border border-primary rounded-[10px]
          overflow-hidden
          transition-all duration-300
          ${isHovered ? 'glow-border' : ''}
        `}
      >
        <div style={{ width: '100%', height: config.imageHeight }}>
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>

        <div 
          style={{ width: '100%', height: config.nameHeight }}
          className="bg-black border-t border-primary/50 flex items-center justify-center px-1"
        >
          <p className={`font-stellar ${config.fontSize} font-bold text-primary text-center truncate leading-tight`}>
            {name}
          </p>
        </div>
      </div>

      {isHovered && <Lightsaber color="blue" />}
    </div>
  );
};

export default CharacterCardMobile;