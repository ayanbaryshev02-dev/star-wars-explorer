import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFilm } from '../services/swapi';
import DetailModal from '../components/DetailModal';
import { filmImages } from '../constants/imageMapping';
import { useBreakpoint } from '../hooks/useBreakpoint';
import type { Film } from '../types';

const FilmDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDesktop } = useBreakpoint();
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);

  const filmIds = [4, 5, 6];
  const currentIndex = filmIds.indexOf(Number(id));

  useEffect(() => {
    const fetchFilm = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getFilm(Number(id));
        setFilm(data);
      } catch (error) {
        console.error('Error fetching film:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFilm();
  }, [id]);

  const handlePageChange = (newIndex: number) => {
    navigate(`/film/${filmIds[newIndex]}`);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn">
        <div className="text-primary font-stellar-light text-xl">Loading...</div>
      </div>
    );
  }

  if (!film) return null;

  const imageSize = isDesktop
    ? { width: 234, height: 345 }
    : { width: 140, height: 200 };

  return (
    <DetailModal
      title={film.title}
      subtitle={`(Episode ${film.episode_id})`}
      beshIcon="/images/ui/films-besh.svg"
      characteristics={[
        { label: 'Director', value: film.director },
        { label: 'Release Date', value: film.release_date }
      ]}
      description={film.opening_crawl}
      contentType="film"
      leftContent={
        <img 
          src={filmImages[Number(id)]}
          alt={film.title}
          className="object-cover"
          style={{
            width: imageSize.width,
            height: imageSize.height,
            borderRadius: isDesktop ? '0' : '10px'
          }}
        />
      }
      totalItems={filmIds.length}
      currentIndex={currentIndex}
      onPageChange={handlePageChange}
      sectionId="films"
    />
  );
};

export default FilmDetail;