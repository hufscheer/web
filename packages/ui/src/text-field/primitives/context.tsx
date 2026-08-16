'use client';

import { createContext, useContext } from 'react';

import type * as styles from '../text-field.css';
import type { TextFieldStore } from './store';

type Variants = styles.RootVariants & styles.ContainerVariants;

export interface TextFieldContext extends Variants {
  inputId: string;
  descriptionId: string;
  store: TextFieldStore;
}

export const TextFieldContext = createContext<TextFieldContext | undefined>(undefined);

export function useTextFieldContext() {
  const context = useContext(TextFieldContext);

  if (context === undefined) {
    throw new Error(
      'TextFieldContext is missing. TextField parts must be placed within <TextField.Root>.',
    );
  }

  return context;
}
