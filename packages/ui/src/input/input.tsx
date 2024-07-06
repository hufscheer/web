'use client';

import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, forwardRef, useRef } from 'react';

import * as styles from './styles.css';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    const toggleFocus = () => {
      const div = divRef.current;

      if (!div) return;

      div.classList.toggle('focused');
    };

    return (
      <div ref={divRef} className={styles.wrapper}>
        <input
          ref={ref}
          type={type}
          className={clsx(styles.input, className)}
          {...props}
          onFocus={toggleFocus}
          onBlur={toggleFocus}
        />
      </div>
    );
  },
);
Input.displayName = 'Input';
