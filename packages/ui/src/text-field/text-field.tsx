'use client';

import type { SlotsProps } from '../_utils/slot';

import { createSlots } from '../_utils/slot';
import * as TextFieldPrimitives from './index.primitives';

/* ----- slots ----- */

export const slots = createSlots(['left', 'right']);

/* ----- text field ----- */

export const TextField = ({
  id,

  labelPosition,
  size,

  value,
  defaultValue = '',
  onValueChange,

  label,
  description,
  left,
  right,
  clear,

  ...props
}: TextField.Props) => {
  return (
    <TextFieldPrimitives.Root
      id={id}
      labelPosition={labelPosition}
      size={size}
      value={value}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
    >
      <TextFieldPrimitives.Label>{label}</TextFieldPrimitives.Label>

      <TextFieldPrimitives.Container>
        <slots.left render={left} />
        <TextFieldPrimitives.Input {...props} />
        {clear && <TextFieldPrimitives.Clear />}
        <slots.right render={right} />
      </TextFieldPrimitives.Container>

      <TextFieldPrimitives.Description>{description}</TextFieldPrimitives.Description>
    </TextFieldPrimitives.Root>
  );
};

/* ----- types ----- */

export type RootProps = Pick<
  TextFieldPrimitives.Root.Props,
  'id' | 'labelPosition' | 'size' | 'value' | 'onValueChange' | 'defaultValue'
>;
export type InputProps = Pick<
  TextFieldPrimitives.Input.Props,
  'placeholder' | 'disabled' | 'className' | 'style'
>;

export type Slots = SlotsProps<typeof slots>;
export interface TextFieldProps extends RootProps, InputProps, Slots {
  label: string;
  description?: string;
  clear?: boolean;

  onValueChange?: (value: string) => void;
}

export namespace TextField {
  export type Props = TextFieldProps;
}
