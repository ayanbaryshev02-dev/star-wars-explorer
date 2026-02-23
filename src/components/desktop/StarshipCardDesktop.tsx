import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lightsaber from '../Lightsaber';

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
      <div
        className={`
          w-[297px] h-[282px]
          border border-primary rounded-[10px]
          transition-all duration-300
          ${isHovered ? 'glow-border' : ''}
        `}
      >
        <div className="px-[20.5px] flex items-center justify-center h-[234px]">
          <img
            src={imageUrl}
            alt={name}
            className="max-w-[256px] max-h-[234px] object-contain"
          />
        </div>
        <div className="px-4 h-[48px] flex items-center justify-center">
          <h3 className="font-stellar text-base font-bold text-primary text-center leading-tight">
            {name}
          </h3>
        </div>
      </div>
      {isHovered && <Lightsaber color="red" />}
    </div>
  );
};

export default StarshipCard;