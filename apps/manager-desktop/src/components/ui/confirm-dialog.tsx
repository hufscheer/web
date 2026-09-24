'use client';

import { useEffect, useRef } from 'react';

import { Button } from './button';

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  pending?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = '삭제',
  pending,
  onConfirm,
  onClose,
}: Props) => {
  const confirmRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();

    // Tab 을 다이얼로그 안에 가둔다. 새면 가려진 뒤 화면의 버튼을 Enter 로 누르게 된다
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose();
      if (e.key !== 'Tab') return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || !panelRef.current?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-[var(--z-index-modal)] flex items-center justify-center bg-[var(--color-neutral-900)]/25 p-6 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-sm rounded-[10px] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] p-4 shadow-[0_16px_48px_-12px_rgba(23,24,28,0.28)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-t5 font-bold">{title}</h2>
        {description && (
          <p className="text-t6 mt-2 whitespace-pre-line text-[var(--color-neutral-500)]">
            {description}
          </p>
        )}
        <div className="mt-4 flex justify-end gap-1.5">
          <Button size="md" color="black" variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button ref={confirmRef} size="md" color="danger" disabled={pending} onClick={onConfirm}>
            {pending ? '처리 중…' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
