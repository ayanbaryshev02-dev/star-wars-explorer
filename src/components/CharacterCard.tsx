import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      {/* Card Container - 134x156px */}
      <div 
        className={`
          w-[134px] h-[156px]
          border border-primary rounded-[10px]
          overflow-hidden
          transition-all duration-300
          ${isHovered ? 'glow-border' : ''}
        `}
      >
        {/* Character Image - fills card */}
        <div className="w-full h-[134px]">
          <img 
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name Container - black background at bottom */}
        <div className="w-full h-[22px] bg-black border-t border-primary/50 flex items-center justify-center px-2">
          <p className="font-stellar text-[12px] font-bold text-primary text-center truncate leading-tight">
            {name}
          </p>
        </div>
      </div>

      {/* Lightsaber Icon - appears on hover */}
      {isHovered && (
        <img 
          src="/images/ui/lightsaber-icon.svg"
          alt=""
          className="absolute left-2 w-[70px] h-[3px] transition-all duration-300"
          style={{ 
            top: 'calc(100% + 8px)',
            filter: 'drop-shadow(0 0 8px rgba(247, 255, 184, 1)) drop-shadow(0 0 16px rgba(247, 255, 184, 0.8)) brightness(1.5)',
          }}
          onError={(e) => e.currentTarget.style.display = 'none'}
        />
      )}
    </div>
  );
};

export default CharacterCard;