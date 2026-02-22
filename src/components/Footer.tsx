const Footer = () => {
  return (
    <footer className="py-12 text-center">
      <div className="max-w-container mx-auto px-8">
        <p className="font-stellar-light text-sm text-primary mb-8">
            by Ayan Barsyhev • May the Force be with you
            </p>
        <div className="flex justify-center gap-6 mb-6">
          <a href="https://github.com/ayanbaryshev02-dev" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="transition-transform duration-300 hover:scale-110">
            <img 
            src="/images/socials/github.svg" 
            alt="GitHub" 
            className="w-5 h-5 hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a href="https://www.linkedin.com/in/ayan-baryshev-4a38a2366/" 
          target="_blank" rel="noopener noreferrer" 
          className="transition-transform duration-300 hover:scale-110">
            <img src="/images/socials/linkedIn.svg" 
            alt="LinkedIn" 
            className="w-5 h-5 hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a href="https://t.me/Ayanbaryshev" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="transition-transform duration-300 hover:scale-110">
            <img 
            src="/images/socials/telegram.svg" 
            alt="Telegram" 
            className="w-5 h-5  hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;