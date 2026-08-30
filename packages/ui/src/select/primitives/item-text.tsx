import { Select as BaseSelect } from '@base-ui/react';
import { forwardRef } from 'react';

export const SelectItemText = forwardRef<HTMLDivElement, SelectItemText.Props>((props, ref) => {
  return <BaseSelect.ItemText ref={ref} {...props} />;
});

export namespace SelectItemText {
  export type State = BaseSelect.ItemText.State;
  export type Props = BaseSelect.ItemText.Props;
}
