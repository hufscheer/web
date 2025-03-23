import { useCallback, useEffect, useRef } from 'react';

type IntersectHandler = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;

export default function useIntersectionObserver<T extends HTMLElement>(
  onIntersect: IntersectHandler,
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T | null>(null);
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect],
  );

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(callback, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options, callback]);

  return { ref };
}
