import type { ReactNode } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  sectionId,
}: DetailModalMobileLargeProps) => {
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
          w-[350px] h-[600px] bg-black
          transition-all duration-300
          ${slideDirection === 'left' ? 'animate-slideOutLeft' : ''}
          ${slideDirection === 'right' ? 'animate-slideOutRight' : ''}
          ${!slideDirection ? 'animate-slideIn' : ''}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top: Large Image (crops) */}
        <div className="w-full h-[210px] overflow-hidden flex items-center justify-center rounded-t-xl">
          {leftContent}
        </div>

        {/* Content Below Image */}
        <div className="flex flex-col px-4 pt-3 pb-3 h-[450px]">
          {/* Besh Icon */}
          <div className="mb-4 flex justify-center">
            <img
              src={beshIcon}
              alt=""
              className="h-[5px]"
              style={{ width: 'auto' }}
              onError={(e) => e.currentTarget.style.display = 'none'}
            />
          </div>

          {/* Title - Centered */}
          <h2 className="font-avant-garde text-[25px] text-primary text-center mb-6 leading-[20px]">
            {title}
          </h2>

          {/* Characteristics - 2 Lines */}
          {characteristics && characteristics.length > 0 && (
            <div className="font-stellar text-[12px] text-accent leading-[20px] mb-6 text-center">
              {characteristics.slice(0, 4).map((char, idx) => (
                <span key={idx}>
                  {char.label}: {char.value}
                  {idx < 3 && idx < characteristics.length - 1 && ' | '}
                  {idx === 1 && <br />}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="flex-1 overflow-y-auto relative">
            <p className="font-stellar-light text-[16px] leading-[25px] text-primary pr-8">
              {description}
            </p>

            {/* Close Button */}
            
          </div>
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

export default DetailModalMobileLarge;