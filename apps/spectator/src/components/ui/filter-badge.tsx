import { CheckSmallIcon } from '@hcc/icons';
import type { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface FilterBadgeProps extends ComponentProps<'button'> {
  children: ReactNode;
  isActive: boolean;
}

export const FilterBadge = ({
  children,
  isActive,
  onClick,
  className,
  ...props
}: FilterBadgeProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        'center shrink-0 cursor-pointer gap-0.5 rounded-lg px-2 py-1.5 font-medium text-sm transition-colors duration-150',
        isActive
          ? 'bg-[var(--color-primary-100)] text-[var(--color-primary-600)] hover:bg-[var(--color-primary-200)]'
          : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200',
        className,
      )}
      {...props}
    >
      {isActive && <CheckSmallIcon />}
      {children}
    </button>
  );
};
