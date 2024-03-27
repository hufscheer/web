import { useContext } from 'react';

import { AmplitudeContext } from '@/app/providers';

const useTracker = () => {
  const context = useContext(AmplitudeContext);

  if (!context)
    throw new Error(
      'useTracker must be used within a AmplitudeContextProvider',
    );

  return context;
};

export default useTracker;
