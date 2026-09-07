'use client';

import { createContext, useContext } from 'react';

import type * as styles from '../checkbox.css';

type Variants = styles.RootVariants & styles.IndicatorVariants;

export interface CheckboxContext extends Variants {
  inputId: string;
}

export const CheckboxContext = createContext<CheckboxContext | undefined>(undefined);

export function useCheckboxContext() {
  const context = useContext(CheckboxContext);

  if (context === undefined) {
    throw new Error(
      'CheckboxContext is missing. Checkbox parts must be placed within <Checkbox.Root>.',
    );
  }

  return context;
}
