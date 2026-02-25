import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Lightsaber from './Lightsaber';

interface FilmCardProps {
  id: number;
  title: string;
  episodeId: number;
  imageUrl: string;
}

const FilmCard = ({ id, title, episodeId, imageUrl }: FilmCardProps) => {
  const [, setSearchParams] = useSearchParams();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setSearchParams({ type: 'film', id: String(id) });
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

      {isHovered && <Lightsaber color="green" />}
    </div>
  );
};

export default FilmCard;