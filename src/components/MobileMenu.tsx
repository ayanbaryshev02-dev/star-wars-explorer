import { useState } from 'react';

interface MobileMenuProps {
  navItems: Array<{ name: string; section: string; icon: string }>;
  isActive: (section: string) => boolean;
  scrollToSection: (section: string) => void;
}

const MobileMenu = ({ navItems, isActive, scrollToSection }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (section: string) => {
    scrollToSection(section);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-primary hover:text-accent transition-colors"
        aria-label="Menu"
      >
        <img src="/images/ui/menu-bar.svg" alt="Menu" className="w-8 h-8" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center" onClick={() => setIsOpen(false)}>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 text-primary text-4xl hover:text-accent"
          >
            ✕
          </button>

          <div className="flex flex-col gap-8">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleItemClick(item.section)}
                className={`
                  flex items-center gap-4
                  font-avant-garde text-2xl
                  transition-colors duration-300
                  ${isActive(item.section) ? 'text-accent' : 'text-primary hover:text-accent'}
                `}
              >
                <img src={item.icon} alt="" className="w-6 h-6" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;