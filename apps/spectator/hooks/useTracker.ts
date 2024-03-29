import { useContext } from 'react';

import { AmplitudeContext } from '@/contexts/AmplitudeContext';

export default function useTracker() {
  const context = useContext(AmplitudeContext);

  if (!context)
    throw new Error(
      'useTracker must be used within a AmplitudeContextProvider',
    );

  return context;
}
