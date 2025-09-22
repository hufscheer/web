import { type DependencyList, useEffect } from 'react';

import { useTimeout } from './useTimeout';

export const useDebounce = (fn: () => void, ms: number, deps: DependencyList) => {
  const [run, clear] = useTimeout(fn, ms);

  // biome-ignore lint/correctness/useExhaustiveDependencies: deps is controlled by user
  useEffect(run, [run, ...deps]);

  return clear;
};
