import type { ReactNode } from 'react';
import { useState, useRef } from 'react';
import Pagination from '../Pagination';

interface DetailModalMobileLargeProps {
  title: string;
  beshIcon: string;
  characteristics?: { label: string; value: string }[];
  description: string;
  leftContent: ReactNode;
  totalItems: number;
  currentIndex: number;
  onPageChange: (index: number) => void;
  onClose: () => void;
  sectionId?: string;
}

const DetailModalMobileLarge = ({
  title,
  beshIcon,
  characteristics,
  description,
  leftContent,
  totalItems,
  currentIndex,
  onPageChange,
  onClose,
}: DetailModalMobileLargeProps) => {
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
        <div className="w-full h-[210px] overflow-hidden flex items-center justify-center rounded-t-xl">
          {leftContent}
        </div>

        <div className="flex flex-col px-4 pt-3 pb-3 h-[450px]">

          <div className="mb-4 flex justify-center">
            <img
              src={beshIcon}
              alt=""
              className="h-[5px]"
              style={{ width: 'auto' }}
              onError={(e) => e.currentTarget.style.display = 'none'}
            />
          </div>

          <h2 className="font-avant-garde text-[25px] text-primary text-center mb-6 leading-[20px]">
            {title}
          </h2>

          {characteristics && characteristics.length > 0 && (
            <div className="font-stellar text-[10px] text-accent leading-[18px] mb-6 text-center">
              {characteristics.slice(0, 5).map((char, idx) => (
                <span key={idx}>
                  {char.label}: {char.value}
                  {idx < 4 && idx < characteristics.length - 1 && ' | '}
                  {idx === 1 && <br />}
                </span>
              ))}
            </div>
          )}

          <div
            className="flex-1 overflow-y-auto relative"
            style={{ touchAction: 'pan-y', overscrollBehavior: 'contain' }}
          >
            <p className="font-stellar-light text-[16px] leading-[25px] text-primary pr-8">
              {description}
            </p>
            
          </div>
          <button
              onClick={handleClose}
              className="absolute bottom-2 right-2 w-[25px] h-[25px] flex items-center justify-center text-primary hover:text-accent transition-colors"
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

export default DetailModalMobileLarge;