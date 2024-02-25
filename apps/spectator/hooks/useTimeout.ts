import { useCallback, useEffect, useRef } from 'react';

export const useTimeout = (callback: () => void, ms: number) => {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const run = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      callback();
    }, ms);
  }, [callback, ms]);

  const clear = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
  }, []);

  useEffect(() => clear, [clear]);

  return [run, clear];
};
