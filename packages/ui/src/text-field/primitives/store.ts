'use client';

import type { ChangeEvent, RefObject } from 'react';

import { ReactStore } from '@base-ui/utils/store';

export interface TextFieldState {
  value: string;
}

export interface TextFieldStoreContext {
  inputRef: RefObject<HTMLInputElement | null>;
  setValue: (value: string, event?: ChangeEvent<HTMLInputElement>) => void;
}

const selectors = {
  value: (state: TextFieldState) => state.value,
};

export type TextFieldStore = ReactStore<TextFieldState, TextFieldStoreContext, typeof selectors>;

export function createTextFieldStore(inputRef: RefObject<HTMLInputElement | null>): TextFieldStore {
  return new ReactStore<TextFieldState, TextFieldStoreContext, typeof selectors>(
    { value: '' },
    { inputRef, setValue: () => {} },
    selectors,
  );
}
