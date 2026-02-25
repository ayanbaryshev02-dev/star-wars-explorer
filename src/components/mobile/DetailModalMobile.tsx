import type { ReactNode } from 'react';
import { useState, useRef } from 'react';
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
  onClose: () => void;
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
  onClose,
}: DetailModalMobileProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handlePageChange = (newIndex: number) => {
    if (newIndex === currentIndex) return;
    setSlideDirection(newIndex > currentIndex ? 'left' : 'right');
    setTimeout(() => onPageChange(newIndex), 150);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchEndX.current === 0) {
      touchStartX.current = 0;
      return;
    }

    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        const nextIndex = currentIndex < totalItems - 1 ? currentIndex + 1 : 0;
        handlePageChange(nextIndex);
      } else {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : totalItems - 1;
        handlePageChange(prevIndex);
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div
      className={`
        fixed inset-0 flex items-center justify-center z-50 p-4
        transition-opacity duration-300
        ${isExiting ? 'animate-fadeOut' : 'animate-fadeIn'}
      `}
      onClick={handleClose}
      style={{ touchAction: 'none', overscrollBehavior: 'none' }}
    >
      <div
        className={`
          relative border border-primary rounded-xl
          w-[350px] h-[600px] bg-transparent
          transition-all duration-300
          ${slideDirection === 'left' ? 'animate-slideOutLeft' : ''}
          ${slideDirection === 'right' ? 'animate-slideOutRight' : ''}
          ${!slideDirection ? 'animate-slideIn' : ''}
        `}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none', overscrollBehavior: 'contain' }}
      >
        <div className="flex flex-col h-full overflow-hidden p-3">

          <div className="flex gap-10 mb-10">

            <div 
              className="flex-shrink-0"
              style={{
                borderRadius: contentType === 'film' || contentType === 'photo' || contentType === 'card' ? '10px' : '0',
                overflow: contentType === 'film' || contentType === 'photo' || contentType === 'card' ? 'hidden' : 'visible'
              }}
            >
              {leftContent}
            </div>

            <div className="flex-1 flex flex-col min-w-0">

              <div className="mb-7">
                <img
                  src={beshIcon}
                  alt=""
                  className="h-[6px]"
                  style={{ width: 'auto' }}
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>

              <h2 className="font-avant-garde text-[16px] text-primary mb-5 leading-[20px]">
                {title}
                {subtitle && (
                  <>
                    <br />
                    <span className="text-sm">{subtitle}</span>
                  </>
                )}
              </h2>

              {characteristics && characteristics.length > 0 && (
                <div className="font-stellar text-[12px] text-accent leading-[20px]">
                  {characteristics.map((char, idx) => (
                    <div key={idx}>
                      {char.label}: {char.value}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto relative"
            style={{ touchAction: 'pan-y', overscrollBehavior: 'contain' }}
          >
            <p className="font-stellar-light text-[16px] leading-[25px] text-primary pr-2 pl-1">
              {description}
            </p>

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