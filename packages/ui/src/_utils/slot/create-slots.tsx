import type { ComponentType, ReactElement } from 'react';

import { Slot } from './slot';

export type SlotsProps<S extends Record<string, unknown>> = {
  [K in keyof S]?: ReactElement;
};

type SlotComponent = (props: { render?: ReactElement }) => ReactElement | null;
type ExplicitSlotComponent = Record<string, ComponentType<{ render?: ReactElement }>>;

export function createSlots<T extends string>(slotNames: T[]): Record<T, SlotComponent>;
export function createSlots<Input extends ExplicitSlotComponent>(slotDefaults: Input): Input;
export function createSlots(input: string[] | ExplicitSlotComponent) {
  if (Array.isArray(input)) {
    return Object.fromEntries(input.map((name) => [name, Slot]));
  }

  return input;
}
