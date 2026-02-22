interface LightsaberProps {
  color?: 'blue' | 'green' | 'yellow' | 'red';
  className?: string;
  centered?: boolean;
}

const LIGHTSABER_GLOW = {
  blue: {
    filter: `
      drop-shadow(0 0 2px rgba(100, 150, 255, 0.6))
      drop-shadow(0 0 4px rgba(80, 130, 255, 0.5))
      drop-shadow(0 0 6px rgba(50, 120, 255, 0.4))
      drop-shadow(0 1px 4px rgba(28, 100, 255, 0.3))
      drop-shadow(0 -1px 4px rgba(28, 100, 255, 0.3))
    `,
  },
  green: {
    filter: `
      drop-shadow(0 0 2px rgba(120, 255, 160, 0.6))
      drop-shadow(0 0 4px rgba(100, 255, 150, 0.5))
      drop-shadow(0 0 6px rgba(74, 255, 134, 0.4))
      drop-shadow(0 1px 4px rgba(75, 255, 129, 0.3))
      drop-shadow(0 -1px 4px rgba(75, 255, 129, 0.3))
    `,
  },
  yellow: {
    filter: `
      drop-shadow(0 0 2px rgba(255, 255, 220, 0.6))
      drop-shadow(0 0 4px rgba(255, 255, 200, 0.5))
      drop-shadow(0 0 6px rgba(247, 255, 184, 0.4))
      drop-shadow(0 1px 4px rgba(247, 255, 184, 0.3))
      drop-shadow(0 -1px 4px rgba(247, 255, 184, 0.3))
    `,
  },
  red: {
    filter: `
      drop-shadow(0 0 2px rgba(255, 100, 100, 0.6))
      drop-shadow(0 0 4px rgba(255, 60, 60, 0.5))
      drop-shadow(0 0 6px rgba(255, 30, 30, 0.4))
      drop-shadow(0 1px 4px rgba(220, 20, 20, 0.3))
      drop-shadow(0 -1px 4px rgba(220, 20, 20, 0.3))
    `,
  },
};

const Lightsaber = ({ color = 'yellow', className = '', centered = false }: LightsaberProps) => {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        top: 'calc(100% + 8px)',
        left: centered ? '53%' : '0rem',
        transform: centered ? 'translateX(-50%)' : undefined,
        ...LIGHTSABER_GLOW[color],
      }}
    >
      <img
        src="/images/ui/lightsaber-icon.svg"
        alt=""
        className="w-[70px] h-[3px] animate-lightsaber-ignite"
        onError={(e) => e.currentTarget.style.display = 'none'}
      />
    </div>
  );
};

export default Lightsaber;