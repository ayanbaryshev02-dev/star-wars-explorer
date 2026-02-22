import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FilmCardProps {
  id: number;
  title: string;
  episodeId: number;
  imageUrl: string;
}

const FilmCard = ({ id, title, episodeId, imageUrl }: FilmCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/film/${id}`);
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
          w-[297px] h-[476px] 
          border border-primary rounded-xl
          p-8
          transition-all duration-300
          ${isHovered ? 'glow-border' : ''}
        `}
      >
        <div className="mb-8">
          <img 
            src={imageUrl}
            alt={title}
            className="w-[234px] h-[345px] object-cover"
          />
        </div>

        <h3 className="font-stellar-light text-base text-primary text-center leading-tight">
          {title}
          <br />
          <span className="text-sm">(Episode {episodeId})</span>
        </h3>
      </div>

      {isHovered && (
        <img 
          src="/images/ui/lightsaber-icon.svg"
          alt=""
          className="absolute left-0 w-[70px] h-[3px] transition-all duration-300"
          style={{ 
             top: 'calc(100% + 8px)',
             filter: 'drop-shadow(0 0 8px rgb(0, 245, 82)) drop-shadow(0 0 16px rgba(102, 255, 0, 0.8)) brightness(1.5)',
            }}
          onError={(e) => e.currentTarget.style.display = 'none'}
        />
      )}
    </div>
  );
};

export default FilmCard;