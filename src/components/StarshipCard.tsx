import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface StarshipCardProps {
  id: number;
  name: string;
  imageUrl: string;
}

const StarshipCard = ({ id, name, imageUrl }: StarshipCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/starship/${id}`);
  };

  return (
    <div
      className="relative cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Card Container - 297×282px */}
      <div
        className={`
          w-[297px] h-[282px]
          border border-primary rounded-[10px]
          transition-all duration-300
          ${isHovered ? 'glow-border' : ''}
        `}
      >
        {/* Starship Image - 256×234px, отступы 20.5px по бокам */}
        <div className="px-[20.5px] flex items-center justify-center h-[234px]">
          <img
            src={imageUrl}
            alt={name}
            className="max-w-[256px] max-h-[234px] object-contain"
          />
        </div>

        {/* Name - отступ снизу 16px (32px от границы - половина высоты текста) */}
        <div className="px-4 h-[48px] flex items-center justify-center">
          <h3 className="font-stellar text-base font-bold text-primary text-center leading-tight">
            {name}
          </h3>
        </div>
      </div>

      {/* Lightsaber Icon */}
      {isHovered && (
        <img
          src="/images/ui/lightsaber-icon.svg"
          alt=""
          className="absolute left-2 w-[70px] h-[3px] transition-all duration-300"
          style={{
            top: 'calc(100% + 8px)',
            filter:
              'drop-shadow(0 0 8px rgba(247, 255, 184, 1)) drop-shadow(0 0 16px rgba(247, 255, 184, 0.8)) brightness(1.5)',
          }}
          onError={(e) => e.currentTarget.style.display = 'none'}
        />
      )}
    </div>
  );
};

export default StarshipCard;