import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { RESPONSIVE_CONFIG } from '../../config/responsiveConfig';
import Lightsaber from '../Lightsaber';

interface PlanetCardMobileProps {
  id: number;
  name: string;
  imageUrl: string;
}

const PlanetCardMobile = ({ id, name, imageUrl }: PlanetCardMobileProps) => {
  const [, setSearchParams] = useSearchParams();
  const { device } = useBreakpoint();
  const [isHovered, setIsHovered] = useState(false);

  const config = RESPONSIVE_CONFIG[device].cardSizes.planet;

  const handleClick = () => {
    setSearchParams({ type: 'planet', id: String(id) });
  };

  return (
    <div
      className="relative cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ width: config.width, height: config.height }}
    >
      <div className="w-full h-full">
        <div style={{ 
          paddingTop: config.padding, 
          paddingLeft: config.padding, 
          paddingRight: config.padding, 
          marginBottom: config.padding * 1.5 
        }}>
          <img 
            src={imageUrl}
            alt={name}
            style={{ width: config.imageSize, height: config.imageSize }}
            className="object-cover rounded-full mx-auto"
          />
        </div>

        <h3 
          className="font-stellar-light text-primary text-center"
          style={{ 
            fontSize: device === 'phone-small' || device === 'phone-standard' ? '9px' : 
                      device === 'phone-large' ? '10px' : '11px',
            paddingBottom: config.padding
          }}
        >
          {name}
        </h3>
      </div>

      {isHovered && <Lightsaber color="yellow" centered />}
    </div>
  );
};

export default PlanetCardMobile;