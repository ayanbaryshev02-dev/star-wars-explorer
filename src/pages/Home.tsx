import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilmsSection from '../sections/FilmsSection';
import CharactersSection from '../sections/CharactersSection';

const Home = () => {
  const [isExiting, setIsExiting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsExiting(false);
  }, [location]);

  const handleFilmClick = () => {
    setIsExiting(true);
  };

  return (
    <div 
      className={`
        pt-[134px] max-w-content mx-auto px-8
        transition-opacity duration-300
        ${isExiting ? 'animate-fadeOut' : 'animate-fadeIn'}
      `}
    >
      <FilmsSection onCardClick={handleFilmClick} />
      <CharactersSection />

      {/* Planets & Starships - Coming Soon */}
      {['planets', 'starships'].map((id) => (
        <section 
          key={id} 
          id={id} 
          className="mb-[149px]"
          style={{ marginTop: '130px' }}
        >
          <div className="mb-[82px]">
            <div className="flex items-center gap-2">
              <img 
                src={`/images/ui/${id}-icon.svg`}
                alt="" 
                className="w-8 h-8"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
              <h2 className="font-avant-garde text-[40px] leading-[40px] text-primary uppercase">
                {id}
              </h2>
            </div>
          </div>
          <div className="text-primary font-stellar-light text-base">
            Coming soon...
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;