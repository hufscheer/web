'use client';

import { createContext, useContext } from 'react';

import type * as styles from '../select.css';
import type { SelectStore } from './store';

type Variants = styles.RootVariants & styles.ContainerVariants;

export interface SelectContext extends Variants {
  descriptionId: string;
  store: SelectStore;
}

export const SelectContext = createContext<SelectContext | undefined>(undefined);

export function useSelectContext() {
  const context = useContext(SelectContext);

  if (context === undefined) {
    throw new Error('SelectContext is missing. Select parts must be placed within <Select.Root>.');
  }

  return context;
}
