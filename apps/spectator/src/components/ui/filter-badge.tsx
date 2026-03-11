import { useRender } from '@base-ui/react';
import { CheckSmallIcon } from '@hcc/icons';
import { twMerge } from 'tailwind-merge';

interface FilterBadgeProps extends useRender.ComponentProps<'button'> {
  isActive: boolean;
}

export const FilterBadge = ({
  render,
  isActive,
  className,
  children,
  ...props
}: FilterBadgeProps) => {
  return useRender({
    render,
    defaultTagName: 'button',
    props: {
      className: twMerge(
        'center shrink-0 cursor-pointer gap-0.5 rounded-lg px-2 py-1.5 font-medium text-sm transition-colors duration-150',
        isActive
          ? 'bg-[var(--color-primary-100)] text-[var(--color-primary-600)] hover:bg-[var(--color-primary-200)]'
          : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200',
        className,
      ),

      children: (
        <>
          {isActive && <CheckSmallIcon />}
          {children}
        </>
      ),

      ...props,
    },
  });
};
