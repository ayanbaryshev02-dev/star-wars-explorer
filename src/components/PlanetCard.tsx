import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PlanetCardProps {
  id: number;
  name: string;
  imageUrl: string;
}

const PlanetCard = ({ id, name, imageUrl }: PlanetCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/planet/${id}`);
  };

  return (
    <div
      className="relative cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="w-[255px] h-[299px]">

        <div className="pt-[18px] px-[18px] mb-[42px]">
          <img 
            src={imageUrl}
            alt={name}
            className="w-[219px] h-[222px] object-cover rounded-full"
          />
        </div>


        <h3 className="font-stellar-bold text-base text-primary text-center pb-[18px]">
          {name}
        </h3>
      </div>

      {isHovered && (
        <img 
          src="/images/ui/lightsaber-icon.svg"
          alt=""
          className="absolute right-20 w-[70px] h-[3px] transition-all duration-300 mt-4"
          style={{ 
            top: 'calc(100% + 8px)',
            filter: 'drop-shadow(0 0 8px rgb(74, 255, 134)) drop-shadow(0 0 16px rgba(75, 255, 129, 0.8)) brightness(1.5)',
          }}
          onError={(e) => e.currentTarget.style.display = 'none'}
        />
      )}
    </div>
  );
};

export default PlanetCard;