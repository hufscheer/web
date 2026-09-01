'use client';

import type { ReactNode } from 'react';

import { useId } from 'react-aria';

import type { SlotsProps } from '../_utils/slot';

import { createSlots } from '../_utils/slot';
import * as SelectPrimitives from './primitives';

/* ----- slots ----- */

const slots = createSlots(['left', 'right']);

/* ----- select ----- */

export const Select = ({
  labelId,
  descriptionId: descriptionIdProp,

  labelPosition,
  size,

  value,
  defaultValue,
  onValueChange,

  placeholder,
  disabled,
  readOnly,

  label,
  description,
  left,
  right,
  clear,
  renderValue: renderValueProp,

  side,
  align,

  children,
}: SelectProps) => {
  const renderValue = renderValueProp
    ? (value: string) => renderValueProp(value) ?? placeholder
    : undefined;

  const descriptionId = useId(descriptionIdProp);

  return (
    <SelectPrimitives.Root
      labelId={labelId}
      descriptionId={descriptionId}
      labelPosition={labelPosition}
      size={size}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      readOnly={readOnly}
    >
      <SelectPrimitives.Label>{label}</SelectPrimitives.Label>

      <SelectPrimitives.Container>
        <slots.left render={left} />
        <SelectPrimitives.Value placeholder={placeholder}>{renderValue}</SelectPrimitives.Value>
        {clear && <SelectPrimitives.Clear />}
        <SelectPrimitives.Icon />
        <slots.right render={right} />
      </SelectPrimitives.Container>

      <SelectPrimitives.Description>{description}</SelectPrimitives.Description>

      <SelectPrimitives.Popup side={side} align={align}>
        {children}
      </SelectPrimitives.Popup>
    </SelectPrimitives.Root>
  );
};

/* ----- types ----- */

type RootProps = Pick<
  SelectPrimitives.Root.Props,
  | 'labelId'
  | 'descriptionId'
  | 'labelPosition'
  | 'size'
  | 'disabled'
  | 'readOnly'
  | 'value'
  | 'defaultValue'
  | 'onValueChange'
>;

type ValueProps = Pick<SelectPrimitives.Value.Props, 'placeholder'>;

type PopupProps = Pick<SelectPrimitives.Popup.Props, 'side' | 'align' | 'children'>;

type Slots = SlotsProps<typeof slots>;

export interface SelectProps extends RootProps, ValueProps, PopupProps, Slots {
  label?: ReactNode;
  description?: ReactNode;
  clear?: boolean;
  renderValue?: (value: string) => ReactNode;
}

export namespace Select {
  export type Props = SelectProps;
}
