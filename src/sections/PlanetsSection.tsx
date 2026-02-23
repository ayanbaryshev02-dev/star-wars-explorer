import { useBreakpoint } from '../hooks/useBreakpoint';
import PlanetsSectionDesktop from './PlanetsSectionDesktop';
import PlanetsSectionMobile from './PlanetsSectionMobile';

const PlanetsSection = () => {
  const { isDesktop } = useBreakpoint();

  return isDesktop ? (
    <PlanetsSectionDesktop />
  ) : (
    <PlanetsSectionMobile />
  );
};

export default PlanetsSection;