import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Lightsaber from '../Lightsaber';

interface PlanetCardDesktopProps {
  id: number;
  name: string;
  imageUrl: string;
}

const PlanetCardDesktop = ({ id, name, imageUrl }: PlanetCardDesktopProps) => {
  const [, setSearchParams] = useSearchParams();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setSearchParams({ type: 'planet', id: String(id) });
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

        <h3 className="font-stellar-light text-base text-primary text-center pb-[18px]">
          {name}
        </h3>
      </div>

      {isHovered && <Lightsaber color="yellow" centered className="right-10 mt-4" />}
    </div>
  );
};

export default PlanetCardDesktop;