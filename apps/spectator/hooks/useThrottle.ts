import { useRef, useCallback } from 'react';

export const useThrottle = (fn: () => void, ms: number) => {
  const lastCall = useRef<number>(0);
  const frameId = useRef<number | null>(null);
  const callbackRef = useRef(fn);

  callbackRef.current = fn;

  const throttledFunction = useCallback(() => {
    const now = Date.now();

    if (now - lastCall.current < ms) {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }

      frameId.current = requestAnimationFrame(() => throttledFunction());
    } else {
      lastCall.current = now;
      callbackRef.current();
    }
  }, [ms]);

  return throttledFunction;
};
