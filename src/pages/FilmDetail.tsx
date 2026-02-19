import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFilm } from '../services/swapi';
import Pagination from '../components/Pagination';
import type { Film } from '../types';

const FilmDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  const filmIds = [4, 5, 6];
  const currentIndex = filmIds.indexOf(Number(id));

  useEffect(() => {
    const fetchFilm = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setSlideDirection(null);
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

  

const goToFilm = (newIndex: number) => {
  if (newIndex === currentIndex) return;
  
  setSlideDirection(newIndex > currentIndex ? 'left' : 'right');
  
  setTimeout(() => {
    navigate(`/film/${filmIds[newIndex]}`);
  }, 150);
};

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  const filmImages: Record<number, string> = {
    4: '/images/films/episode-1.jpg',
    5: '/images/films/episode-2.jpg',
    6: '/images/films/episode-3.jpg',
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn">
        <div className="text-primary font-stellar-light text-xl">Loading...</div>
      </div>
    );
  }

  if (!film) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 p-8 transition-opacity duration-300 ${
        isExiting ? 'animate-fadeOut' : 'animate-fadeIn'
      }`}
      onClick={handleClose}
    >

      <div 
        className={`
          relative border border-primary rounded-xl w-[952px] h-[476px] bg-transparent
          transition-all duration-300
          ${slideDirection === 'left' ? 'animate-slideOutLeft' : ''}
          ${slideDirection === 'right' ? 'animate-slideOutRight' : ''}
          ${!slideDirection ? 'animate-slideIn' : ''}
        `}
        onClick={(e) => e.stopPropagation()}
      >
 
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 w-[35px] h-[35px] flex items-center justify-center text-primary hover:text-accent transition-colors z-10"
        >
          <img 
            src="/images/ui/close-button.svg"
            alt="Close"
            className="w-full h-full"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.insertAdjacentHTML('afterend', '<span class="text-3xl">✕</span>');
            }}
          />
        </button>

  
        <div className="flex h-full items-center">

          <div className="flex-shrink-0 ml-[105px]">
            <img 
              src={filmImages[Number(id)] || filmImages[4]}
              alt={film.title}
              className="w-[234px] h-[345px] object-cover"
            />
          </div>


          <div 
            className="ml-[153px] mr-[55px]"
            style={{ 
              width: '405px', 
              maxHeight: '330px',
              marginTop: '-150px'
            }}
          >

            <div className="mb-8" style={{ paddingTop: '24px' }}>
              <img 
                src="/images/ui/films-besh.svg"
                alt=""
                className="w-[84px] h-[10px]"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            </div>


            <h2 className="font-avant-garde text-2xl text-primary mb-4">
              {film.title}
              <br />
              <span className="text-base">(Episode {film.episode_id})</span>
            </h2>


            <div className="font-stellar text-sm text-accent mt-4 mb-4">
              <p>
                Director: {film.director} &nbsp;&nbsp;|&nbsp;&nbsp; Release Date: {film.release_date}
              </p>
            </div>

            <div style={{ maxHeight: '220px' }}>
              <p className="font-stellar-light text-base leading-[25px] text-primary">
                {film.opening_crawl}
              </p>
            </div>
          </div>
        </div>

        <div 
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: 'calc(100% + 30px)' }}
        >
          <Pagination
            totalItems={filmIds.length}
            currentIndex={currentIndex}
            onPageChange={goToFilm}
            alwaysShowThree={false} 
          />
        </div>
      </div>
    </div>
  );
};

export default FilmDetail;