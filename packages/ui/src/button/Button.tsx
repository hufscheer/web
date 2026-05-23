'use client';

import type { UseRenderRenderProp } from '@base-ui/react';
import type { MouseEvent, ReactNode } from 'react';

import { useRender } from '@base-ui/react';
import { clsx } from 'clsx';

import { createSlots, type SlotsProps } from '../slot';
import * as styles from './Button.css';

/* ------ slots ------ */

const slots = createSlots(['left', 'right']);

/* ------ button ------ */

export const Button = ({
  render,

  size = 'md',
  color = 'primary',
  variant = 'solid',

  type = 'submit',
  disabled: disabledProp = false,
  loading = false,

  left,
  right,

  className,
  onClick,
  children,

  ...props
}: ButtonProps) => {
  const disabled = disabledProp || loading;

  const defaultProps: useRender.ElementProps<'button'> = {
    type,
    disabled,
    className: clsx(styles.button({ size, color, variant }), className),
    onClick,
    children: (
      <>
        <slots.left render={left} />

        {children}

        <slots.right render={right} />
      </>
    ),
    ...props,
  };

  return useRender({
    render,
    defaultTagName: 'button',
    state: { loading },
    props: { ...defaultProps },
  });
};

/* ------ types ------ */

export interface ButtonProps extends styles.ButtonVariants, SlotsProps<typeof slots> {
  render?: UseRenderRenderProp;

  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;

  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}
