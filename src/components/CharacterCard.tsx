import { useBreakpoint } from '../hooks/useBreakpoint';
import CharacterCardDesktop from './CharacterCardDesktop';
import CharacterCardMobile from './CharacterCardMobile';

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