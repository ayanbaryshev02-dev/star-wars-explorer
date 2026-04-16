import DetailModal from '../DetailModal';
import { planetImages, PLANET_IDS } from '../../constants/imageMapping';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import {
  PLANET_SETTINGS, PLANET_SETTINGS_MOBILE,
  DEFAULT_PLANET_SETTINGS, DEFAULT_PLANET_SETTINGS_MOBILE,
} from '../../constants/detailSettings';
import type { Planet } from '../../types';
import planetsData from '../../../public/data/planets.json';

interface PlanetOverlayProps {
  planet: Planet;
  id: number;
  onPageChange: (newIndex: number) => void;
  onClose: () => void;
}

const PlanetOverlay = ({ planet, id, onPageChange, onClose }: PlanetOverlayProps) => {
  const { isDesktop } = useBreakpoint();

  const planetData = planetsData.find((p) => p.id === id);
  const imageUrl = id === 11 ? '/images/planets/geonosis.webp' : planetImages[id];
  const settings = PLANET_SETTINGS[id] || DEFAULT_PLANET_SETTINGS;
  const mobileSettings = PLANET_SETTINGS_MOBILE[id] || DEFAULT_PLANET_SETTINGS_MOBILE;

  return (
    <DetailModal
      title={planet.name}
      beshIcon="/images/ui/planets-besh.svg"
      characteristics={[
        { label: 'Rotation period', value: planet.rotation_period },
        { label: 'Diameter', value: planet.diameter },
        { label: 'Climate', value: planet.climate },
        { label: 'Population', value: planet.population },
      ]}
      description={planetData?.description || 'No description available.'}
      contentType="planet"
      leftContent={
        isDesktop ? (
          <img
            src={imageUrl}
            alt={planet.name}
            className="rounded-full object-cover"
            style={{
              transform: `rotate(${settings.rotation}deg)`,
              marginLeft: `${settings.offsetX}px`,
              marginTop: `${settings.offsetY}px`,
            }}
          />
        ) : (
          <img
            src={imageUrl}
            alt={planet.name}
            className="object-cover"
            style={{
              width: `${mobileSettings.size.width}px`,
              height: `${mobileSettings.size.height}px`,
              marginTop: `${mobileSettings.offsetY}px`,
              transform: `rotate(${mobileSettings.rotation}deg)`,
            }}
          />
        )
      }
      totalItems={PLANET_IDS.length}
      currentIndex={PLANET_IDS.indexOf(id)}
      onPageChange={onPageChange}
      onClose={onClose}
      sectionId="planets"
    />
  );
};

export default PlanetOverlay;