'use client';

import { useCallback, useRef, useState } from 'react';

export type Toast = { id: number; message: string; tone: 'info' | 'error' };

export const useToasts = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const seq = useRef(0);

  const show = useCallback((message: string, tone: Toast['tone']) => {
    const id = ++seq.current;
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      tone === 'error' ? 6000 : 2800,
    );
  }, []);

  const push = useCallback((message: string) => show(message, 'info'), [show]);
  const pushError = useCallback((message: string) => show(message, 'error'), [show]);

  return { toasts, push, pushError };
};

export const Toasts = ({ items }: { items: Toast[] }) => (
  <div
    role="status"
    aria-live="polite"
    className="pointer-events-none fixed bottom-5 left-1/2 z-[var(--z-index-overlay)] flex -translate-x-1/2 flex-col gap-1.5"
  >
    {items.map((t) => (
      <div
        key={t.id}
        className={[
          'rounded-[var(--radius-control)] px-3 py-2 text-t6 font-medium text-white shadow-[0_8px_24px_-6px_rgba(23,24,28,0.35)]',
          t.tone === 'error' ? 'bg-[var(--color-danger-700)]' : 'bg-[var(--color-neutral-900)]',
        ].join(' ')}
      >
        {t.message}
      </div>
    ))}
  </div>
);
