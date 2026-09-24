'use client';

import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from 'react';

import { MoreHorizIcon, SearchIcon } from '~/components/icons';
import { cn } from '~/utils/cn';

export const Chip = ({
  active,
  count,
  className,
  children,
  ...props
}: ComponentProps<'button'> & { active: boolean; count?: number }) => (
  <button
    type="button"
    aria-pressed={active}
    className={cn(
      'text-t7 inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-chip)] px-2.5 font-medium transition-colors',
      active
        ? 'bg-[var(--color-neutral-800)] text-white'
        : // 미선택도 면을 준다. 글자만 두면 눌리는 것인지 라벨인지 구분이 안 됐다
          'bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-200)]',
      className,
    )}
    {...props}
  >
    {children}
    {count !== undefined && (
      <span
        className={cn('tnum text-t8', active ? 'text-white/70' : 'text-[var(--color-neutral-400)]')}
      >
        {count}
      </span>
    )}
  </button>
);

export const FilterBar = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">{children}</div>
);

export const FilterGroup = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex items-center gap-1.5">
    <span className="text-t7 mr-0.5 text-[var(--color-neutral-400)]">{label}</span>
    {children}
  </div>
);

export const FilterDivider = () => (
  <span aria-hidden className="mx-2 h-4 w-px bg-[var(--color-greyscale-50)]" />
);

export const SearchInput = ({
  value,
  onValueChange,
  placeholder,
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}) => (
  <label className="relative flex h-8 items-center">
    <SearchIcon
      size={14}
      className="pointer-events-none absolute left-2.5 text-[var(--color-neutral-400)]"
    />
    <input
      type="search"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      placeholder={placeholder}
      className="text-t7 h-8 w-56 rounded-[var(--radius-control)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] pr-2.5 pl-8 transition-colors placeholder:text-[var(--color-neutral-300)] hover:border-[var(--color-neutral-300)] focus:border-[var(--color-neutral-400)] focus:outline-none"
    />
  </label>
);

export const Th = ({ children, align }: { children?: ReactNode; align?: 'right' }) => (
  <th
    className={cn(
      'text-t7 h-9 border-b border-[var(--color-greyscale-50)] px-3.5 font-medium text-[var(--color-neutral-400)]',
      align === 'right' ? 'text-right' : 'text-left',
    )}
  >
    {children}
  </th>
);

export const rowClass =
  'group h-12 cursor-pointer border-b border-[var(--color-hairline)] last:border-0 hover:bg-[var(--color-greyscale-25)]';

/** 머리(Th)와 같은 값이라야 글자 세로줄이 맞는다 */
export const tdClass = 'px-3.5';

export const TableShell = ({ children }: { children: ReactNode }) => (
  <div className="overflow-x-auto">
    <table className="text-t6 w-full">{children}</table>
  </div>
);

export const ListFooterCta = ({ message, children }: { message: string; children: ReactNode }) => (
  <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-[var(--color-greyscale-50)] px-6 py-8">
    <p className="text-t6 text-[var(--color-neutral-400)]">{message}</p>
    {children}
  </div>
);

export const EmptyRow = ({ colSpan, children }: { colSpan: number; children: ReactNode }) => (
  <tr>
    <td
      colSpan={colSpan}
      className="text-t6 px-3.5 py-12 text-center text-[var(--color-neutral-400)]"
    >
      {children}
    </td>
  </tr>
);

export type RowAction = { label: string; href?: string; onSelect?: () => void; danger?: boolean };

/** 행 전체에 onClick 이 걸려 있어 메뉴 안의 클릭은 전부 stopPropagation 한다 */
export const RowMenu = ({ actions, label }: { actions: RowAction[]; label: string }) => {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onAway = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onAway);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onAway);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      role="presentation"
      ref={box}
      className="relative flex justify-end"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex size-7 items-center justify-center rounded-[var(--radius-chip)] text-[var(--color-neutral-400)] transition-colors',
          'opacity-0 group-hover:opacity-100 focus-visible:opacity-100',
          open && 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] opacity-100',
          'hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-neutral-700)]',
        )}
      >
        <MoreHorizIcon size={16} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-8 right-0 z-20 min-w-40 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] py-1 shadow-[0_8px_24px_rgba(23,24,28,0.12)]"
        >
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                action.onSelect?.();
              }}
              className={cn(
                'text-t7 flex w-full items-center px-3 py-2 text-left transition-colors hover:bg-[var(--color-greyscale-25)]',
                action.danger
                  ? 'text-[var(--color-danger-700)]'
                  : 'text-[var(--color-neutral-700)]',
              )}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
