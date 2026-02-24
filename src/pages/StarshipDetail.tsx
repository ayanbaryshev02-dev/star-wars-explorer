import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStarship } from '../services/swapi';
import DetailModal from '../components/DetailModal';
import { starshipImages, STARSHIP_IDS } from '../constants/imageMapping';
import { useBreakpoint } from '../hooks/useBreakpoint';
import type { Starship } from '../types';
import starshipsData from '../../public/data/starships.json';

interface StarshipSettings {
  size: { width: number; height: number };
  rotation: number;
  offsetX: number;
  offsetY: number;
  scaleX?: number;
}

interface StarshipSettingsMobile {
  size: { width: number; height: number };
  rotation: number;
  offsetX: number;
  offsetY: number;
  scaleX?: number;
}

const STARSHIP_SETTINGS: Record<number, StarshipSettings> = {
  2: { size: { width: 800, height: 800 }, rotation: 10, offsetX: -90, offsetY: -15, scaleX: -1 },
  3: { size: { width: 900, height: 900 }, rotation: 12, offsetX: 0, offsetY: 30, scaleX: -1 },
  5: { size: { width: 700, height: 505 }, rotation: 0, offsetX: 0, offsetY: 20, scaleX: -1 },
  9: { size: { width: 600, height: 605 }, rotation: 0, offsetX: -10, offsetY: 90 },
  21: { size: { width: 489, height: 445 }, rotation: 0, offsetX: 120, offsetY: -15 },
  31: { size: { width: 809, height: 845 }, rotation: 10, offsetX: 20, offsetY: 90 },
  32: { size: { width: 589, height: 545 }, rotation: 0, offsetX: 40, offsetY: -15, scaleX: -1 },
  39: { size: { width: 589, height: 445 }, rotation: 0, offsetX: 100, offsetY: 5, scaleX: -1 },
  40: { size: { width: 550, height: 550 }, rotation: 0, offsetX: 120, offsetY: 50, scaleX: -1 },
  48: { size: { width: 489, height: 445 }, rotation: 0, offsetX: 160, offsetY: -15 },
  58: { size: { width: 489, height: 445 }, rotation: 20, offsetX: 130, offsetY: -15, scaleX: -1 },
  59: { size: { width: 589, height: 545 }, rotation: 20, offsetX: 120, offsetY: 55 },
  61: { size: { width: 689, height: 645 }, rotation: 0, offsetX: 20, offsetY: -15, scaleX: -1 },
  63: { size: { width: 589, height: 545 }, rotation: 0, offsetX: 80, offsetY: 0, scaleX: -1 },
  64: { size: { width: 489, height: 445 }, rotation: 0, offsetX: 120, offsetY: -15 },
  66: { size: { width: 589, height: 545 }, rotation: 0, offsetX: 150, offsetY: -15 },
  68: { size: { width: 550, height: 550 }, rotation: 20, offsetX: 150, offsetY: 55, scaleX: -1 },
  74: { size: { width: 489, height: 445 }, rotation: 0, offsetX: 150, offsetY: -15, scaleX: -1 },
  75: { size: { width: 489, height: 445 }, rotation: 0, offsetX: 150, offsetY: -15 },
};

const DEFAULT_SETTINGS: StarshipSettings = {
  size: { width: 800, height: 445 },
  offsetX: 0,
  offsetY: -15,
  rotation: 0,
};

const STARSHIP_SETTINGS_MOBILE: Record<number, StarshipSettingsMobile> = {
  2: { size: { width: 320, height: 320 }, rotation: 5, offsetX: 0, offsetY: -5, scaleX: 1 },
  3: { size: { width: 320, height: 320 }, rotation: 15, offsetX: 6, offsetY: 30, scaleX: -1 },
  5: { size: { width: 300, height: 255 }, rotation: 0, offsetX: 0, offsetY: 20, scaleX: -1 },
  9: { size: { width: 400, height: 405 }, rotation: 0, offsetX: 0, offsetY: 160 },
  21: { size: { width: 220, height: 200 }, rotation: 0, offsetX: 0, offsetY: 10 },
  31: { size: { width: 809, height: 845 }, rotation: 10, offsetX: 0, offsetY: 0 },
  32: { size: { width: 589, height: 545 }, rotation: 0, offsetX: 0, offsetY: 0, scaleX: 1 },
  39: { size: { width: 300, height: 400 }, rotation: 0, offsetX: 0, offsetY: 5, scaleX: 1 },
  40: { size: { width: 300, height: 350 }, rotation: 0, offsetX: 0, offsetY: 0, scaleX: -1 },
  48: { size: { width: 250, height: 250 }, rotation: 0, offsetX: 0, offsetY: 0, scaleX: -1 },
  58: { size: { width: 300, height: 300 }, rotation: 20, offsetX: 0, offsetY: 0, scaleX: -1 },
  59: { size: { width: 300, height: 300 }, rotation: 0, offsetX: 0, offsetY: 30 },
  61: { size: { width: 400, height: 400 }, rotation: 0, offsetX: 0, offsetY: -15, scaleX: 1 },
  63: { size: { width: 300, height: 250 }, rotation: 10, offsetX: 0, offsetY: 0, scaleX: 1 },
  64: { size: { width: 200, height: 205 }, rotation: 0, offsetX: 0, offsetY: 0 },
  66: { size: { width: 300, height: 345 }, rotation: -20, offsetX: 10, offsetY: -15 },
  68: { size: { width: 400, height: 400 }, rotation: 5, offsetX: 0, offsetY: 0, scaleX: -1 },
  74: { size: { width: 200, height: 200 }, rotation: 0, offsetX: 0, offsetY: 0, scaleX: -1 },
  75: { size: { width: 220, height: 220 }, rotation: 0, offsetX: 30, offsetY: 0 },
};

const DEFAULT_SETTINGS_MOBILE: StarshipSettings = {
  size: { width: 400, height: 400 },
  offsetX: 0,
  offsetY: -15,
  rotation: 0,
};

const StarshipDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDesktop } = useBreakpoint();
  const [starship, setStarship] = useState<Starship | null>(null);
  const [loading, setLoading] = useState(true);

  const currentIndex = STARSHIP_IDS.indexOf(Number(id));

  useEffect(() => {
    const fetchStarship = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getStarship(Number(id));
        setStarship(data);
      } catch (error) {
        console.error('Error fetching starship:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStarship();
  }, [id]);

  const handlePageChange = (newIndex: number) => {
    navigate(`/starship/${STARSHIP_IDS[newIndex]}`);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn">
        <div className="text-primary font-stellar-light text-xl">Loading...</div>
      </div>
    );
  }

  if (!starship) return null;

  const starshipData = starshipsData.find((s) => s.id === Number(id));
  const settings = STARSHIP_SETTINGS[Number(id)] || DEFAULT_SETTINGS;
   const mobileSettings = STARSHIP_SETTINGS_MOBILE[Number(id)] || DEFAULT_SETTINGS_MOBILE;

  const mobileStyle = {
    width: `${mobileSettings.size.width}px`,
    height: `${mobileSettings.size.height}px`,
    transform: `rotate(${mobileSettings.rotation}deg) scaleX(${mobileSettings.scaleX || 1})`,
    marginLeft: `${mobileSettings.offsetX}px`,
    marginTop: `${mobileSettings.offsetY}px`,
    objectFit: 'contain' as const,
  };

  const desktopStyle = {
    width: `${settings.size.width}px`,
    height: `${settings.size.height}px`,
    transform: `rotate(${settings.rotation}deg) scaleX(${settings.scaleX || 1})`,
    marginLeft: `${settings.offsetX}px`,
    marginTop: `${settings.offsetY}px`,
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
          src={starshipImages[Number(id)]}
          alt={starship.name}
          className="object-contain"
          style={isDesktop ? desktopStyle : mobileStyle}
        />
      }
      totalItems={STARSHIP_IDS.length}
      currentIndex={currentIndex}
      onPageChange={handlePageChange}
      sectionId="starships"
    />
  );
};

export default StarshipDetail;