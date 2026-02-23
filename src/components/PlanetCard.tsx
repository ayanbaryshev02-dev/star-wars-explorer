import { useBreakpoint } from '../hooks/useBreakpoint';
import PlanetCardDesktop from './desktop/PlanetCardDesktop';
import PlanetCardMobile from './mobile/PlanetCardMobile';

interface PlanetCardProps {
  id: number;
  name: string;
  imageUrl: string;
}

const PlanetCard = (props: PlanetCardProps) => {
  const { isDesktop } = useBreakpoint();

  return isDesktop ? (
    <PlanetCardDesktop {...props} />
  ) : (
    <PlanetCardMobile {...props} />
  );
};

export default PlanetCard;