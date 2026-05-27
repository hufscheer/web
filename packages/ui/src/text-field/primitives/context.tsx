'use client';

import type { ChangeEvent, RefObject } from 'react';

import { createContext, useContext } from 'react';

import type * as styles from '../text-field.css';
import type { BaseInputProps } from './input';

type Variants = styles.RootVariants & styles.ContainerVariants;
export interface TextFieldContext extends Variants, Omit<BaseInputProps, 'onValueChange'> {
  id: string;
  inputRef?: RefObject<HTMLInputElement | null>;
  onValueChange: (value: string, event?: ChangeEvent<HTMLInputElement>) => void;
  clearValue: () => void;
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
