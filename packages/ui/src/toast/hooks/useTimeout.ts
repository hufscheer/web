import { useCallback, useEffect, useRef } from 'react';

const useTimeout = (fn: () => void, delay: number) => {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const callback = useRef(fn);

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  const run = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      callback.current();
    }, delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
  }, []);

  useEffect(() => clear, [clear]);

  useEffect(() => {
    run();

    return clear;
  }, [clear, run]);

  return clear;
};

export default useTimeout;
