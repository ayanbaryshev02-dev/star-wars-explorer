interface PaginationProps {
  totalItems: number;
  currentIndex: number;
  onPageChange: (index: number) => void;
  alwaysShowThree?: boolean; 
}

const Pagination = ({ 
  totalItems, 
  currentIndex, 
  onPageChange,
  alwaysShowThree = false 
}: PaginationProps) => {
  
  if (alwaysShowThree && totalItems > 3) {
    const visibleDots = [];
    
    for (let i = -1; i <= 1; i++) {
      let dotIndex = currentIndex + i;
      
      if (dotIndex < 0) dotIndex = totalItems - 1;
      if (dotIndex >= totalItems) dotIndex = 0;
      
      const isActive = i === 0;
      
      visibleDots.push(
        <button
          key={`${dotIndex}-${i}`}
          onClick={() => onPageChange(dotIndex)}
          className={`
            w-4 h-4 rounded-full transition-all duration-300
            ${isActive 
              ? 'bg-primary' 
              : 'bg-transparent border border-primary hover:bg-primary/30'
            }
          `}
        />
      );
    }
    
    return (
      <div className="flex items-center gap-[28px]">
        {visibleDots}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-[28px]">
      {Array.from({ length: totalItems }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index)}
          className={`
            w-4 h-4 rounded-full transition-all duration-300
            ${currentIndex === index 
              ? 'bg-primary' 
              : 'bg-transparent border border-primary hover:bg-primary/30'
            }
          `}
        />
      ))}
    </div>
  );
};

export default Pagination;