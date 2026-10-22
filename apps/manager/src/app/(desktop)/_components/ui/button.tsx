import type { ComponentProps } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/utils/cn';

const button = cva(
  [
    'inline-flex shrink-0 items-center justify-center whitespace-nowrap',
    'font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-100',
    'outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-600)]/35',
    'disabled:pointer-events-none disabled:opacity-40',
    'active:translate-y-px',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      size: {
        xs: 'h-7 gap-1 rounded-[var(--radius-chip)] px-2 text-t7 [&_svg]:size-3.5',
        sm: 'h-8 gap-1.5 rounded-[var(--radius-control)] px-3 text-t7 [&_svg]:size-4',
        md: 'h-9 gap-1.5 rounded-[var(--radius-control)] px-3.5 text-t6 [&_svg]:size-4',
        lg: 'h-10 gap-2 rounded-[var(--radius-control)] px-4 text-t5 [&_svg]:size-[18px]',
      },
      color: { primary: '', black: '', danger: '' },
      variant: { solid: '', soft: '', ghost: '', outline: '' },
    },
    compoundVariants: [
      {
        color: 'primary',
        variant: 'solid',
        class:
          'bg-[var(--color-primary-600)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] hover:bg-[var(--color-primary-700)]',
      },
      {
        color: 'primary',
        variant: 'soft',
        class:
          'bg-[var(--color-primary-100)] text-[var(--color-primary-700)] hover:bg-[var(--color-primary-200)]',
      },
      {
        color: 'primary',
        variant: 'ghost',
        class: 'text-[var(--color-primary-600)] hover:bg-[var(--color-primary-100)]',
      },
      {
        color: 'primary',
        variant: 'outline',
        class:
          'border border-[var(--color-primary-200)] text-[var(--color-primary-700)] hover:bg-[var(--color-primary-50)]',
      },

      {
        color: 'black',
        variant: 'solid',
        class:
          'bg-[var(--color-neutral-900)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-[var(--color-neutral-800)]',
      },
      {
        color: 'black',
        variant: 'soft',
        class:
          'bg-[var(--color-neutral-100)] text-[var(--color-neutral-800)] hover:bg-[var(--color-neutral-200)]',
      },
      {
        color: 'black',
        variant: 'ghost',
        class: 'text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)]',
      },
      {
        color: 'black',
        variant: 'outline',
        class:
          'border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] text-[var(--color-neutral-700)] shadow-[0_1px_2px_rgba(23,24,28,0.05)] hover:border-[var(--color-neutral-300)] hover:bg-[var(--color-greyscale-25)]',
      },

      {
        color: 'danger',
        variant: 'solid',
        class: 'bg-[var(--color-danger-700)] text-white hover:bg-[var(--color-danger-800)]',
      },
      {
        color: 'danger',
        variant: 'soft',
        class:
          'bg-[var(--color-danger-100)] text-[var(--color-danger-800)] hover:bg-[var(--color-danger-200)]',
      },
      {
        color: 'danger',
        variant: 'ghost',
        class: 'text-[var(--color-danger-700)] hover:bg-[var(--color-danger-100)]',
      },
      {
        color: 'danger',
        variant: 'outline',
        class:
          'border border-[var(--color-danger-200)] text-[var(--color-danger-700)] hover:bg-[var(--color-danger-50)]',
      },
    ],
    defaultVariants: { size: 'sm', color: 'primary', variant: 'solid' },
  },
);

type Props = ComponentProps<'button'> & VariantProps<typeof button>;

export const Button = ({
  size,
  color,
  variant,
  // form 안에 놓인 버튼의 HTML 기본값은 submit 이다. 제출 버튼만 명시적으로 지정한다
  type = 'button',
  className,
  ...props
}: Props) => (
  <button type={type} className={cn(button({ size, color, variant }), className)} {...props} />
);
