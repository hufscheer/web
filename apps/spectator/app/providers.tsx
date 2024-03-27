'use client';

import { init, track } from '@amplitude/analytics-browser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

type ProviderProps = {
  children: ReactNode;
};

export default function Provider({ children }: ProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchInterval: false,
            staleTime: 1000 * 60 * 10,
            retry: 0,
          },
        },
      }),
  );

  useEffect(() => {});

  return (
    <AmplitudeContextProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      </QueryClientProvider>
    </AmplitudeContextProvider>
  );
}

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || '';

type Tracker = (eventName: string, properties: Record<string, unknown>) => void;
type AmplitudeContextType = {
  tracker: Tracker;
};

export const AmplitudeContext = createContext<AmplitudeContextType>({
  tracker: () => {},
});
const AmplitudeContextProvider = ({ children }: ProviderProps) => {
  useEffect(() => {
    init(AMPLITUDE_API_KEY, undefined, {});
  }, []);

  const tracker = (eventName: string, properties: Record<string, unknown>) => {
    track(eventName, properties);
  };

  return (
    <AmplitudeContext.Provider value={{ tracker }}>
      {children}
    </AmplitudeContext.Provider>
  );
};
