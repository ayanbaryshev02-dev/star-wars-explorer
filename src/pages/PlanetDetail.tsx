import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlanet } from '../services/swapi';
import DetailModal from '../components/DetailModal';
import { planetImages, PLANET_IDS } from '../constants/imageMapping';
import { useBreakpoint } from '../hooks/useBreakpoint';
import type { Planet } from '../types';
import planetsData from '../../public/data/planets.json';

interface PlanetSettings {
  size: { width: number; height: number };
  rotation: number;
  offsetX: number;
  offsetY: number;
}

interface PlanetSettingsMobile {
  size: { width: number; height: number };
  rotation: number;
  offsetY: number;
}

const PLANET_SETTINGS: Record<number, PlanetSettings> = {
  1: { size: { width: 800, height: 800 }, rotation: 90, offsetX: -90, offsetY: 150 },
  2: { size: { width: 800, height: 800 }, rotation: 20, offsetX: -90, offsetY: -120 },
  8: { size: { width: 800, height: 800 }, rotation: 190, offsetX: -90, offsetY: 160 },
  9: { size: { width: 800, height: 800 }, rotation: 190, offsetX: -90, offsetY: 10 },
  10: { size: { width: 800, height: 800 }, rotation: 100, offsetX: -90, offsetY: 160 },
  11: { size: { width: 800, height: 800 }, rotation: 0, offsetX: -120, offsetY: 0 },
  13: { size: { width: 800, height: 800 }, rotation: 0, offsetX: -150, offsetY: -162 },
  14: { size: { width: 800, height: 800 }, rotation: 10, offsetX: -90, offsetY: 150 },
  15: { size: { width: 800, height: 800 }, rotation: 30, offsetX: -90, offsetY: 0 },
  16: { size: { width: 800, height: 800 }, rotation: 0, offsetX: -150, offsetY: -162 },
  17: { size: { width: 800, height: 800 }, rotation: 90, offsetX: -90, offsetY: 150 },
  18: { size: { width: 800, height: 800 }, rotation: 190, offsetX: -90, offsetY: -180 },
  19: { size: { width: 800, height: 800 }, rotation: 90, offsetX: -90, offsetY: 150 },
};

const PLANET_SETTINGS_MOBILE: Record<number, PlanetSettingsMobile> = {
  1: { size: { width: 500, height: 450 }, rotation: 0, offsetY: -260 },
  2: { size: { width: 500, height: 500 }, rotation: 0, offsetY: -270 },
  8: { size: { width: 450, height: 450 }, rotation: 0, offsetY: -260 },
  9: { size: { width: 500, height: 500 }, rotation: 0, offsetY: -295 },
  10: { size: { width: 400, height: 400 }, rotation: 0, offsetY: -210 },
  11: { size: { width: 500, height: 500 }, rotation: 0, offsetY: 0 },
  13: { size: { width: 480, height: 480 }, rotation: 0, offsetY: -270 },
  14: { size: { width: 450, height: 450 }, rotation: 0, offsetY: -250 },
  15: { size: { width: 350, height: 350 }, rotation: 20, offsetY: -70 },
  16: { size: { width: 355, height: 355 }, rotation: 60, offsetY: -150 },
  17: { size: { width: 370, height: 370 }, rotation: 150, offsetY: -165 },
  18: { size: { width: 352, height: 352 }, rotation: -70, offsetY: -160 },
  19: { size: { width: 360, height: 360 }, rotation: 140, offsetY: -170 },
};

const DEFAULT_SETTINGS: PlanetSettings = {
  size: { width: 800, height: 800 },
  rotation: 0,
  offsetX: -150,
  offsetY: -15,
};

const DEFAULT_SETTINGS_MOBILE: PlanetSettingsMobile = {
  size: { width: 500, height: 500 },
  offsetY: 0,
  rotation: 0,
};

const PlanetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDesktop } = useBreakpoint();
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [loading, setLoading] = useState(true);

  const currentIndex = PLANET_IDS.indexOf(Number(id));

  useEffect(() => {
    const fetchPlanet = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getPlanet(Number(id));
        setPlanet(data);
      } catch (error) {
        console.error('Error fetching planet:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanet();
  }, [id]);

  const handlePageChange = (newIndex: number) => {
    navigate(`/planet/${PLANET_IDS[newIndex]}`);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn">
        <div className="text-primary font-stellar-light text-xl">Loading...</div>
      </div>
    );
  }

  if (!planet) return null;

  const planetData = planetsData.find((p) => p.id === Number(id));
  const isGeonosis = Number(id) === 11;
  const imageUrl = isGeonosis
    ? '/images/planets/geonosis.webp'
    : planetImages[Number(id)];

  const settings = PLANET_SETTINGS[Number(id)] || DEFAULT_SETTINGS;
  const mobileSettings = PLANET_SETTINGS_MOBILE[Number(id)] || DEFAULT_SETTINGS_MOBILE;

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
      currentIndex={currentIndex}
      onPageChange={handlePageChange}
      sectionId="planets"
    />
  );
};

export default PlanetDetail;