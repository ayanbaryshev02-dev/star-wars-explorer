import { useState, useEffect } from 'react';

export type DeviceType = 
  | 'phone-small'      // 320-375px
  | 'phone-standard'   // 375-425px
  | 'phone-large'      // 425-480px
  | 'phone-landscape'  // 480-640px
  | 'tablet-portrait'  // 640-768px
  | 'tablet-landscape' // 768-1024px
  | 'desktop-small'    // 1024-1280px
  | 'desktop';         // 1280px+

export const useBreakpoint = () => {
  const [device, setDevice] = useState<DeviceType>('desktop');

  useEffect(() => {
    const getDevice = (width: number): DeviceType => {
      if (width < 375) return 'phone-small';
      if (width < 425) return 'phone-standard';
      if (width < 480) return 'phone-large';
      if (width < 640) return 'phone-landscape';
      if (width < 768) return 'tablet-portrait';
      if (width < 1024) return 'tablet-landscape';
      if (width < 1280) return 'desktop-small';
      return 'desktop';
    };

    const handleResize = () => {
      setDevice(getDevice(window.innerWidth));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = ['phone-small', 'phone-standard', 'phone-large'].includes(device);
  const isTablet = ['phone-landscape', 'tablet-portrait', 'tablet-landscape'].includes(device);
  const isDesktop = ['desktop-small', 'desktop'].includes(device);

  return { device, isMobile, isTablet, isDesktop };
};