import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBreakpoint } from '../hooks/useBreakpoint';
import FilmsSection from '../sections/FilmsSection';
import CharactersSection from '../sections/CharactersSection';
import PlanetsSection from '../sections/PlanetsSection';
import StarshipsSection from '../sections/StarshipsSection';
import Footer from '../components/Footer';
import DetailOverlay from './DetailOverlay';

const Home = () => {
  const { isDesktop } = useBreakpoint();
  const [searchParams] = useSearchParams();
  const isModalOpen = searchParams.has('type') && searchParams.has('id');

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <>
      <div 
        className="max-w-content mx-auto px-8"
        style={{ 
          paddingTop: isDesktop ? '134px' : '100px',
          opacity: isModalOpen ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        <FilmsSection />
        <CharactersSection />
        <PlanetsSection />
        <StarshipsSection />
        <Footer />
      </div>

      <DetailOverlay />
    </>
  );
};

export default Home;