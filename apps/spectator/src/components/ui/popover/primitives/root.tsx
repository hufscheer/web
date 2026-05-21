import { Popover as BasePopover } from '@base-ui/react';

export const PopoverRoot = (props: PopoverRoot.Props) => {
  return <BasePopover.Root {...props} />;
};

export namespace PopoverRoot {
  export type Props = BasePopover.Root.Props;
  export type State = BasePopover.Root.State;

  export type Actions = BasePopover.Root.Actions;
  export type ChangeEventDetails = BasePopover.Root.ChangeEventDetails;
  export type ChangeEventReason = BasePopover.Root.ChangeEventReason;
}
