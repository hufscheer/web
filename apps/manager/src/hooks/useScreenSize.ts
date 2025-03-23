'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const setScreenSize = () => {
  const vw = document.documentElement.clientWidth / 100;
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const useScreenSize = () => {
  const pathname: string = usePathname();

  useEffect(() => {
    setScreenSize();
    window.addEventListener('resize', setScreenSize);

    return () => window.removeEventListener('resize', setScreenSize);
  }, [pathname]);
};

export default useScreenSize;
