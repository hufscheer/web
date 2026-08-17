'use client';

import { createSlots, type SlotsProps } from '../_utils/slot';
import * as PrimitiveButton from './primitives';

/* ------ slots ------ */

const slots = createSlots(['left', 'right']);

/* ------ button ------ */

export const Button = ({
  render,

  size = 'md',
  color = 'primary',
  variant = 'solid',

  disabled: disabledProp,
  loading,

  left,
  right,

  children,

  ...props
}: ButtonProps) => {
  const disabled = disabledProp || loading;

  return (
    <PrimitiveButton.Root
      render={render}
      size={size}
      color={color}
      variant={variant}
      disabled={disabled}
      data-loading={loading ? '' : undefined}
      {...props}
    >
      <slots.left render={left} />

      {children}

      <slots.right render={right} />
    </PrimitiveButton.Root>
  );
};

/* ------ types ------ */

type RootProps = Pick<
  PrimitiveButton.Root.Props,
  | 'render'
  | 'type'
  | 'disabled'
  | 'size'
  | 'variant'
  | 'color'
  | 'className'
  | 'onClick'
  | 'children'
>;

type Slots = SlotsProps<typeof slots>;
export interface ButtonProps extends RootProps, Slots {
  loading?: boolean;
}

export namespace Button {
  export type Props = ButtonProps;
  export type State = PrimitiveButton.Root.State;
}
