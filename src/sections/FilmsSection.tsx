import { useBreakpoint } from '../hooks/useBreakpoint';
import FilmsSectionDesktop from './FilmsSectionDesktop';
import FilmsSectionMobile from './FilmsSectionMobile';

const FilmsSection = () => {
  const { isMobile } = useBreakpoint();

  return isMobile ? (
    <FilmsSectionMobile />
  ) : (
    <FilmsSectionDesktop />
  );
};

export default FilmsSection;