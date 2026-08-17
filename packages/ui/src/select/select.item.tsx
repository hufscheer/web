import { createSlots, type SlotsProps } from '../_utils/slot';
import * as SelectPrimitives from './primitives';

/* ----- slots ----- */

const slots = createSlots(['left', 'right']);

/* ----- select item ----- */

export const SelectItem = ({ left, right, children, ...props }: SelectItem.Props) => {
  return (
    <SelectPrimitives.Item {...props}>
      <slots.left render={left} />
      <SelectPrimitives.ItemText>{children}</SelectPrimitives.ItemText>
      <slots.right render={right} />
    </SelectPrimitives.Item>
  );
};

/* ----- types ----- */

type ItemProps = Pick<SelectPrimitives.Item.Props, 'value' | 'children'>;

type Slots = SlotsProps<typeof slots>;

export interface SelectItemProps extends ItemProps, Slots {}

export namespace SelectItem {
  export type Props = SelectItemProps;
}
