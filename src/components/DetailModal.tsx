import type { ReactNode } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';

interface DetailModalProps {
  title: string;
  subtitle?: string;
  beshIcon: string;
  characteristics?: { label: string; value: string }[];
  description: string;
  leftContent: ReactNode;
  contentType: 'film' | 'photo' | 'card';
  totalItems: number;
  currentIndex: number;
  onPageChange: (index: number) => void;
}

const DetailModal = ({
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
}: DetailModalProps) => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  const handlePageChange = (newIndex: number) => {
    if (newIndex === currentIndex) return;
    
    setSlideDirection(newIndex > currentIndex ? 'left' : 'right');
    
    setTimeout(() => {
      onPageChange(newIndex);
    }, 150);
  };

  const getLeftMargin = () => {
    switch (contentType) {
      case 'film': return '105px';
      case 'photo': return '0px';
      case 'card': return '63px';
    }
  };

  const getRightMargin = () => {
    switch (contentType) {
      case 'film': return '153px';
      case 'photo': return '61px';
      case 'card': return '132px';
    }
  };

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
        <div className="flex h-full overflow-hidden rounded-xl">

        <div 
        className={`flex-shrink-0 relative flex items-center h-full ${contentType === 'photo' ? 'overflow-hidden' : ''}`}
        style={{ marginLeft: getLeftMargin() }}
        >
        <div className="relative">
            {leftContent}
        
            {contentType === 'photo' && (
            <img 
                src="/images/ui/line.svg"
                alt=""
                className="absolute top-0 right-0 h-full"
                style={{ width: 'auto' }}
            />
            )}
        </div>
        </div>


        <div 
            className="flex flex-col"
            style={{ 
            marginLeft: getRightMargin(),
            marginRight: '55px',
            width: '405px',
            paddingTop: '24px'
            }}
        >

            <div className="mb-[27px]">
            <img 
                src={beshIcon}
                alt=""
                className="h-[10px]"
                style={{ width: 'auto' }}
                onError={(e) => e.currentTarget.style.display = 'none'}
            />
            </div>


            <h2 className="font-avant-garde text-2xl text-primary mb-4">
            {title}
            {subtitle && (
                <>
                <br />
                <span className="text-base">{subtitle}</span>
                </>
            )}
            </h2>


            {characteristics && characteristics.length > 0 && (
            <div className="font-stellar text-sm text-accent mb-4">
                <p>
                {characteristics.map((char, idx) => (
                    <span key={idx}>
                    {char.label}: {char.value}
                    {idx < characteristics.length - 1 && ' \u00A0\u00A0|\u00A0\u00A0 '}
                    </span>
                ))}
                </p>
            </div>
            )}


            <div className="flex-1 overflow-hidden">
            <p className="font-stellar-light text-base leading-[25px] text-primary">
                {description}
            </p>
            </div>
        </div>
        </div>


        <div 
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: 'calc(100% + 30px)' }}
        >
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

export default DetailModal;