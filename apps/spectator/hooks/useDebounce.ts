import { DependencyList, useEffect } from 'react';

import { useTimeout } from './useTimeout';

export const useDebounce = (
  fn: () => void,
  ms: number,
  deps: DependencyList,
) => {
  const [run, clear] = useTimeout(fn, ms);

  useEffect(run, [run, ...deps]);

  return clear;
};
