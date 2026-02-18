import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (section: string) => {
    if (section === 'films' && location.pathname === '/') return true;
    if (section === 'films' && location.pathname.includes('/film/')) return true;
    if (section === 'characters' && location.pathname.includes('/character/')) return true;
    if (section === 'planets' && location.pathname.includes('/planet/')) return true;
    if (section === 'starships' && location.pathname.includes('/starship/')) return true;
    return false;
  };

  const navItems = [
    { name: 'FILMS', section: 'films', icon: '/images/ui/films-icon.svg' },
    { name: 'CHARACTERS', section: 'characters', icon: '/images/ui/characters-icon.svg' },
    { name: 'PLANETS', section: 'planets', icon: '/images/ui/planets-icon.svg' },
    { name: 'STARSHIPS', section: 'starships', icon: '/images/ui/starships-icon.svg' },
  ];

  const scrollToSection = (section: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${section}`;
    } else {
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-container mx-auto px-8 h-20 flex justify-between items-center">
        <div className="flex-shrink-0">
          <img 
            src="/images/ui/star-wars-logo.svg" 
            alt="Star Wars" 
            className="h-[53px] w-[118px]"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.className = 'text-4xl font-avant-garde font-bold text-primary';
              fallback.textContent = 'STAR WARS';
              target.parentNode?.appendChild(fallback);
            }}
          />
        </div>
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.section}
              onClick={() => scrollToSection(item.section)}
              className={`
                flex items-center gap-2
                font-avant-garde text-[20px] leading-[21px]
                transition-colors duration-300
                ${isActive(item.section) ? 'text-accent' : 'text-primary hover:text-accent'}
              `}
            >
              <img 
                src={item.icon} 
                alt="" 
                className="w-4 h-4"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;