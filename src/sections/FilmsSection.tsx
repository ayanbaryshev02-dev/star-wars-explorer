import { useBreakpoint } from '../hooks/useBreakpoint';
import FilmsSectionDesktop from './FilmsSectionDesktop';
import FilmsSectionMobile from './FilmsSectionMobile';

interface FilmsSectionProps {
  onCardClick: () => void;
}

const FilmsSection = ({ onCardClick }: FilmsSectionProps) => {
  const { isMobile } = useBreakpoint();

  return isMobile ? (
    <FilmsSectionMobile onCardClick={onCardClick} />
  ) : (
    <FilmsSectionDesktop onCardClick={onCardClick} />
  );
};

export default FilmsSection;