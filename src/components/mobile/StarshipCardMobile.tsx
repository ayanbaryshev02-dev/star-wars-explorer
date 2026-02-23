import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { RESPONSIVE_CONFIG } from '../../config/responsiveConfig';
import Lightsaber from '../Lightsaber';

interface StarshipCardMobileProps {
  id: number;
  name: string;
  imageUrl: string;
}

const StarshipCardMobile = ({ id, name, imageUrl }: StarshipCardMobileProps) => {
  const navigate = useNavigate();
  const { device } = useBreakpoint();
  const [isHovered, setIsHovered] = useState(false);

  const config = RESPONSIVE_CONFIG[device].cardSizes.starship;

  const handleClick = () => {
    navigate(`/starship/${id}`);
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
          transition-all duration-300
          ${isHovered ? 'glow-border' : ''}
        `}
      >
        <div 
          style={{ 
            height: config.imageContainer, 
            padding: config.padding 
          }}
          className="flex items-center justify-center"
        >
          <img
            src={imageUrl}
            alt={name}
            style={{
              maxWidth: config.width - (config.padding * 2),
              maxHeight: config.imageContainer - (config.padding * 2)
            }}
            className="object-contain"
          />
        </div>
        <div 
          style={{ 
            height: config.height - config.imageContainer,
            padding: `0 ${config.padding}px` 
          }}
          className="flex items-center justify-center"
        >
          <h3 
            className="font-stellar font-bold text-primary text-center leading-tight"
            style={{ 
              fontSize: device === 'phone-small' || device === 'phone-standard' ? '9px' : 
                        device === 'phone-large' ? '10px' : '11px'
            }}
          >
            {name}
          </h3>
        </div>
      </div>
      {isHovered && <Lightsaber color="red" />}
    </div>
  );
};

export default StarshipCardMobile;