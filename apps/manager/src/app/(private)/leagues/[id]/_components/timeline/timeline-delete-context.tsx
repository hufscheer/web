'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

const TimelineDeleteContext = createContext<
  { isDeleteMode: boolean; toggleDeleteMode: () => void } | undefined
>(undefined);

export const TimelineDeleteProvider = ({ children }: { children: ReactNode }) => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  return (
    <TimelineDeleteContext.Provider
      value={{ isDeleteMode, toggleDeleteMode: () => setIsDeleteMode((value) => !value) }}
    >
      {children}
    </TimelineDeleteContext.Provider>
  );
};

export const useTimelineDeleteMode = () => {
  const context = useContext(TimelineDeleteContext);
  if (!context) throw new Error('TimelineDeleteProvider is missing');
  return context;
};
