'use client';

import { init, track } from '@amplitude/analytics-browser';
import { useEffect, createContext } from 'react';

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || '';

type AmplitudeContextType = {
  tracker(eventName: string, eventProperties?: Record<string, unknown>): void;
};

export const AmplitudeContext = createContext<AmplitudeContextType>({
  tracker: () => {},
});

type AmplitudeContextProviderProps = {
  children: React.ReactNode;
};

export default function AmplitudeContextProvider({
  children,
}: AmplitudeContextProviderProps) {
  useEffect(() => {
    init(AMPLITUDE_API_KEY, undefined, {
      defaultTracking: {
        sessions: true,
      },
    });
  }, []);

  const tracker = (
    eventName: string,
    eventProperties: Record<string, unknown>,
  ) => {
    track(eventName, eventProperties);
  };

  const value = { tracker };

  return (
    <AmplitudeContext.Provider value={value}>
      {children}
    </AmplitudeContext.Provider>
  );
}
