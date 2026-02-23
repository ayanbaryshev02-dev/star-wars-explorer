import { useBreakpoint } from '../hooks/useBreakpoint';
import CharacterCardDesktop from './desktop/CharacterCardDesktop';
import CharacterCardMobile from './mobile/CharacterCardMobile';

interface CharacterCardProps {
  id: number;
  name: string;
  imageUrl: string;
}

const CharacterCard = (props: CharacterCardProps) => {
  const { isDesktop } = useBreakpoint();

  return isDesktop ? (
    <CharacterCardDesktop {...props} />
  ) : (
    <CharacterCardMobile {...props} />
  );
};

export default CharacterCard;