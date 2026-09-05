'use client';

import type { ReactNode } from 'react';

import * as CheckboxPrimitives from './primitives';

export const Checkbox = ({
  inputId,

  labelPosition,
  size,

  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  readOnly,
  required,
  indeterminate,
  name,
  value,

  label,

  ...props
}: Checkbox.Props) => {
  return (
    <CheckboxPrimitives.Root inputId={inputId} labelPosition={labelPosition} size={size}>
      <CheckboxPrimitives.Indicator
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        indeterminate={indeterminate}
        name={name}
        value={value}
        {...props}
      />
      <CheckboxPrimitives.Label>{label}</CheckboxPrimitives.Label>
    </CheckboxPrimitives.Root>
  );
};

/* ----- types ----- */

type RootProps = Pick<CheckboxPrimitives.Root.Props, 'inputId' | 'labelPosition' | 'size'>;

type IndicatorProps = Pick<
  CheckboxPrimitives.Indicator.Props,
  | 'checked'
  | 'defaultChecked'
  | 'onCheckedChange'
  | 'disabled'
  | 'readOnly'
  | 'required'
  | 'indeterminate'
  | 'name'
  | 'value'
  | 'className'
  | 'style'
>;

export interface CheckboxProps extends RootProps, IndicatorProps {
  label?: ReactNode;
}

export namespace Checkbox {
  export type Props = CheckboxProps;
}
