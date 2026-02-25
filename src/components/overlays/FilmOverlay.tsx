import DetailModal from '../DetailModal';
import { filmImages } from '../../constants/imageMapping';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { FILM_IDS } from '../../constants/detailSettings';
import type { Film } from '../../types';

interface FilmOverlayProps {
  film: Film;
  id: number;
  onPageChange: (newIndex: number) => void;
  onClose: () => void;
}

const FilmOverlay = ({ film, id, onPageChange, onClose }: FilmOverlayProps) => {
  const { isDesktop } = useBreakpoint();
  const imageSize = isDesktop ? { width: 234, height: 345 } : { width: 140, height: 200 };

  return (
    <DetailModal
      title={film.title}
      subtitle={`(Episode ${film.episode_id})`}
      beshIcon="/images/ui/films-besh.svg"
      characteristics={[
        { label: 'Director', value: film.director },
        { label: 'Release Date', value: film.release_date },
      ]}
      description={film.opening_crawl}
      contentType="film"
      leftContent={
        <img
          src={filmImages[id]}
          alt={film.title}
          className="object-cover"
          style={{
            width: imageSize.width,
            height: imageSize.height,
            borderRadius: isDesktop ? '0' : '10px',
          }}
        />
      }
      totalItems={FILM_IDS.length}
      currentIndex={FILM_IDS.indexOf(id)}
      onPageChange={onPageChange}
      onClose={onClose}
      sectionId="films"
    />
  );
};

export default FilmOverlay;