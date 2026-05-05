import type { ReactNode } from 'react';

interface TimeProps {
  children: ReactNode;
}

export const Time = ({ children }: TimeProps) => {
  return (
    <div className="w-full px-2.5 py-2 text-center text-[15px] font-medium text-greyscale-300">
      {children}
    </div>
  );
};
