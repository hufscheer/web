'use client';

import type { RefObject } from 'react';

import { ReactStore } from '@base-ui/utils/store';

export interface SelectState {
  value: string | null;
}

export interface SelectStoreContext {
  triggerRef: RefObject<HTMLButtonElement | null>;
  clear: () => void;
}

const selectors = {
  value: (state: SelectState) => state.value,
};

export type SelectStore = ReactStore<SelectState, SelectStoreContext, typeof selectors>;

export function createSelectStore(triggerRef: RefObject<HTMLButtonElement | null>): SelectStore {
  return new ReactStore<SelectState, SelectStoreContext, typeof selectors>(
    { value: '' },
    { triggerRef, clear: () => {} },
    selectors,
  );
}
