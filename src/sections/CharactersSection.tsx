import { useBreakpoint } from '../hooks/useBreakpoint';
import CharactersSectionDesktop from './CharactersSectionDesktop';
import CharactersSectionMobile from './CharactersSectionMobile';

const CharactersSection = () => {
  const { isMobile } = useBreakpoint();

  return isMobile ? (
    <CharactersSectionMobile />
  ) : (
    <CharactersSectionDesktop />
  );
};

export default CharactersSection;