'use client';

import type { MouseEvent, ReactNode } from 'react';

import { clsx } from 'clsx';

import type { CustomProps as SlotProps } from '../_utils/create-slots';

import { createCustomSlots } from '../_utils/create-slots';
import * as styles from './Button.css';

const buttonSlots = {
  left: { comp: 'span', renderWhenEmpty: false },
  button: { comp: 'button' },
  right: { comp: 'span', renderWhenEmpty: false },
} as const;

const { useSlots } = createCustomSlots(buttonSlots);

export interface ButtonProps extends styles.ButtonVariants {
  asChild?: boolean;

  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;

  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  customProps?: SlotProps<typeof buttonSlots>;
}

export const Button = ({
  asChild,

  size = 'md',
  color = 'primary',
  variant = 'solid',

  type = 'submit',
  disabled = false,
  loading = false,

  className,
  onClick,
  children,
  customProps,
  ...props
}: ButtonProps) => {
  const { slots } = useSlots(customProps);

  return (
    <slots.button
      asChild={asChild}
      type={type}
      disabled={disabled || loading}
      className={clsx(styles.button({ size, color, variant }), className)}
      data-loading={loading ? 'true' : undefined}
      onClick={onClick}
      {...props}
    >
      <slots.left />

      {children}

      <slots.right />
    </slots.button>
  );
};
