import { useBreakpoint } from '../hooks/useBreakpoint';
import StarshipCardDesktop from './desktop/StarshipCardDesktop';
import StarshipCardMobile from './mobile/StarshipCardMobile';

interface StarshipCardProps {
  id: number;
  name: string;
  imageUrl: string;
}

const StarshipCard = (props: StarshipCardProps) => {
  const { isDesktop } = useBreakpoint();

  return isDesktop ? (
    <StarshipCardDesktop {...props} />
  ) : (
    <StarshipCardMobile {...props} />
  );
};

export default StarshipCard;