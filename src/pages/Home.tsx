import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBreakpoint } from '../hooks/useBreakpoint';
import FilmsSection from '../sections/FilmsSection';
import CharactersSection from '../sections/CharactersSection';
import PlanetsSection from '../sections/PlanetsSection';
import StarshipsSection from '../sections/StarshipsSection';
import Footer from '../components/Footer';

const Home = () => {
  const [isExiting, setIsExiting] = useState(false);
  const location = useLocation();
  const { isDesktop } = useBreakpoint();

  useEffect(() => {
    setIsExiting(false);
  }, [location]);

  const handleFilmClick = () => {
    setIsExiting(true);
  };

  return (
    <div 
      className={`
        max-w-content mx-auto px-8
        transition-opacity duration-300
        ${isExiting ? 'animate-fadeOut' : 'animate-fadeIn'}
      `}
      style={{ paddingTop: isDesktop ? '134px' : '100px' }}
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