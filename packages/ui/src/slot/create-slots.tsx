import type { ReactElement } from 'react';

import { Slot } from './slot';

export type SlotsProps<S extends Record<string, unknown>> = {
  [K in keyof S]?: ReactElement;
};

export const createSlots = <T extends string>(slotNames: T[]): Record<T, typeof Slot> => {
  return Object.fromEntries(slotNames.map((name) => [name, Slot])) as Record<T, typeof Slot>;
};
