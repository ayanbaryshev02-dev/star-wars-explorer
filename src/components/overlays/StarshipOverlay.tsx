import DetailModal from '../DetailModal';
import { starshipImages, STARSHIP_IDS } from '../../constants/imageMapping';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import {
  STARSHIP_SETTINGS, STARSHIP_SETTINGS_MOBILE,
  DEFAULT_STARSHIP_SETTINGS, DEFAULT_STARSHIP_SETTINGS_MOBILE,
} from '../../constants/detailSettings';
import type { Starship } from '../../types';
import starshipsData from '../../../public/data/starships.json';

interface StarshipOverlayProps {
  starship: Starship;
  id: number;
  onPageChange: (newIndex: number) => void;
  onClose: () => void;
}

const StarshipOverlay = ({ starship, id, onPageChange, onClose }: StarshipOverlayProps) => {
  const { isDesktop } = useBreakpoint();

  const starshipData = starshipsData.find((s) => s.id === id);
  const settings = STARSHIP_SETTINGS[id] || DEFAULT_STARSHIP_SETTINGS;
  const mobileSettings = STARSHIP_SETTINGS_MOBILE[id] || DEFAULT_STARSHIP_SETTINGS_MOBILE;

  const style = isDesktop
    ? {
        width: `${settings.size.width}px`,
        height: `${settings.size.height}px`,
        transform: `rotate(${settings.rotation}deg) scaleX(${settings.scaleX || 1})`,
        marginLeft: `${settings.offsetX}px`,
        marginTop: `${settings.offsetY}px`,
        objectFit: 'contain' as const,
      }
    : {
        width: `${mobileSettings.size.width}px`,
        height: `${mobileSettings.size.height}px`,
        transform: `rotate(${mobileSettings.rotation}deg) scaleX(${mobileSettings.scaleX || 1})`,
        marginLeft: `${mobileSettings.offsetX}px`,
        marginTop: `${mobileSettings.offsetY}px`,
        objectFit: 'contain' as const,
      };

  return (
    <DetailModal
      title={starship.name}
      beshIcon="/images/ui/starships-besh.svg"
      characteristics={[
        { label: 'Manufacturer', value: starship.manufacturer },
        { label: 'Length', value: `${starship.length}m` },
        { label: 'Crew', value: starship.crew },
        { label: 'Max speed', value: starship.max_atmosphering_speed },
        { label: 'Passengers', value: starship.passengers },
      ]}
      description={starshipData?.description || 'No description available.'}
      contentType="starship"
      leftContent={
        <img
          src={starshipImages[id]}
          alt={starship.name}
          className="object-contain"
          style={style}
        />
      }
      totalItems={STARSHIP_IDS.length}
      currentIndex={STARSHIP_IDS.indexOf(id)}
      onPageChange={onPageChange}
      onClose={onClose}
      sectionId="starships"
    />
  );
};

export default StarshipOverlay;