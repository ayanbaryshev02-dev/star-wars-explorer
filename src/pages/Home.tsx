import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilmsSection from '../sections/FilmsSection';
import CharactersSection from '../sections/CharactersSection';
import PlanetsSection from '../sections/PlanetsSection';
import StarshipsSection from '../sections/StarshipsSection';
import Footer from '../components/Footer';

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
      <PlanetsSection />
      <StarshipsSection />
      <Footer />
    </div>
  );
};

export default Home;