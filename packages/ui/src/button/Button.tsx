import type { ReactNode } from 'react';

import { clsx } from 'clsx';

import type { CustomProps as SlotProps } from '../utils/create-slots';

import { Spinner } from '../spinner';
import { createCustomSlots } from '../utils/create-slots';
import * as styles from './Button.css';

const buttonSlots = {
  left: { comp: 'span', renderWhenEmpty: false },
  button: { comp: 'button' },
  right: { comp: 'span', renderWhenEmpty: false },
} as const;

const { useSlots } = createCustomSlots(buttonSlots);

export interface ButtonProps extends styles.ButtonVariants {
  disabled?: boolean;
  loading?: boolean;

  className?: string;
  children?: ReactNode;
  customProps?: SlotProps<typeof buttonSlots>;
}

export const Button = ({
  size = 'md',
  color = 'primary',
  variant = 'solid',

  disabled = false,
  loading = false,

  className,
  children,
  customProps,
  ...props
}: ButtonProps) => {
  const { slots } = useSlots(customProps);

  return (
    <slots.button
      disabled={disabled || loading}
      className={clsx(styles.button({ size, color, variant }), className)}
      data-loading={loading ? 'true' : undefined}
      {...props}
    >
      <slots.left>{loading ? <Spinner size="sm" color="white" /> : null}</slots.left>

      {children}

      <slots.right />
    </slots.button>
  );
};
