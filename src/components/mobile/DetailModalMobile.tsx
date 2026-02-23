import type { ReactNode } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination';

interface DetailModalMobileProps {
  title: string;
  subtitle?: string;
  beshIcon: string;
  characteristics?: { label: string; value: string }[];
  description: string;
  leftContent: ReactNode;
  contentType: 'film' | 'photo' | 'card' | 'planet' | 'starship';
  totalItems: number;
  currentIndex: number;
  onPageChange: (index: number) => void;
  sectionId?: string;
}

const DetailModalMobile = ({
  title,
  subtitle,
  beshIcon,
  characteristics,
  description,
  leftContent,
  contentType,
  totalItems,
  currentIndex,
  onPageChange,
  sectionId,
}: DetailModalMobileProps) => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (sectionId) {
        navigate(`/#${sectionId}`);
      } else {
        navigate('/');
      }
    }, 300);
  };

  const handlePageChange = (newIndex: number) => {
    if (newIndex === currentIndex) return;
    setSlideDirection(newIndex > currentIndex ? 'left' : 'right');
    setTimeout(() => onPageChange(newIndex), 150);
  };

  return (
    <div
      className={`
        fixed inset-0 flex items-center justify-center z-50 p-4
        transition-opacity duration-300
        ${isExiting ? 'animate-fadeOut' : 'animate-fadeIn'}
      `}
      onClick={handleClose}
    >
      <div
        className={`
          relative border border-primary rounded-xl
          w-[300px] h-[500px] bg-black
          transition-all duration-300
          ${slideDirection === 'left' ? 'animate-slideOutLeft' : ''}
          ${slideDirection === 'right' ? 'animate-slideOutRight' : ''}
          ${!slideDirection ? 'animate-slideIn' : ''}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div className="flex flex-col h-full overflow-hidden p-3">
          {/* Top Section: Photo/Card + Info */}
          <div className="flex gap-5 mb-4">
            {/* Left: Photo/Poster/Card */}
            <div 
              className="flex-shrink-0"
              style={{
                borderRadius: contentType === 'film' || contentType === 'photo' || contentType === 'card' ? '10px' : '0',
                overflow: contentType === 'film' || contentType === 'photo' || contentType === 'card' ? 'hidden' : 'visible'
              }}
            >
              {leftContent}
            </div>

            {/* Right: Besh + Title + Characteristics */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Besh Icon */}
              <div className="mb-7">
                <img
                  src={beshIcon}
                  alt=""
                  className="h-[8px]"
                  style={{ width: 'auto' }}
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>

              {/* Title */}
              <h2 className="font-avant-garde text-base text-primary mb-5 leading-[20px]">
                {title}
                {subtitle && (
                  <>
                    <br />
                    <span className="text-sm">{subtitle}</span>
                  </>
                )}
              </h2>

              {/* Characteristics */}
              {characteristics && characteristics.length > 0 && (
                <div className="font-stellar text-[10px] text-accent leading-[20px]">
                  {characteristics.map((char, idx) => (
                    <div key={idx}>
                      {char.label}: {char.value}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Section: Description + Close Button */}
          <div className="flex-1 overflow-y-auto relative">
            <p className="font-stellar-light text-[13px] leading-[22px] text-primary pr-2 pl-1">
              {description}
            </p>
            
            {/* Close Button - Right Bottom Corner */}
            <button
              onClick={handleClose}
              className="absolute bottom-0 right-0 w-[25px] h-[25px] flex items-center justify-center text-primary hover:text-accent transition-colors"
              aria-label="Close"
            >
              <img
                src="/images/ui/close-button.svg"
                alt="Close"
                className="w-full h-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.insertAdjacentHTML('afterend', '<span class="text-xl">✕</span>');
                }}
              />
            </button>
          </div>
        </div>

        {/* Pagination */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 'calc(100% + 20px)' }}>
          <Pagination
            totalItems={totalItems}
            currentIndex={currentIndex}
            onPageChange={handlePageChange}
            alwaysShowThree={totalItems > 3}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailModalMobile;