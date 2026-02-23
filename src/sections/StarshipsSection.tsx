import { useBreakpoint } from '../hooks/useBreakpoint';
import StarshipsSectionDesktop from './StarshipsSectionDesktop';
import StarshipsSectionMobile from './StarshipsSectionMobile';

const StarshipsSection = () => {
  const { isDesktop } = useBreakpoint();

  return isDesktop ? (
    <StarshipsSectionDesktop />
  ) : (
    <StarshipsSectionMobile />
  );
};

export default StarshipsSection;