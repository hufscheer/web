import { useCallback, useEffect, useRef } from 'react';

export const useTimeout = (callback: () => void, ms: number) => {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const run = useCallback(() => {
    if (timeoutId.current) clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      callbackRef.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clear();
  }, [clear]);

  return [run, clear] as const;
};
