import { Popover as BasePopover } from '@base-ui/react';

export const PopoverClose = (props: PopoverClose.Props) => {
  return <BasePopover.Close {...props} />;
};

export namespace PopoverClose {
  export type Props = BasePopover.Close.Props;
  export type State = BasePopover.Close.State;
}
