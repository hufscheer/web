import { Popover as BasePopover } from '@base-ui/react';

export const PopoverPortal = (props: PopoverPortal.Props) => {
  return <BasePopover.Portal {...props} />;
};

export namespace PopoverPortal {
  export type Props = BasePopover.Portal.Props;
  export type State = BasePopover.Portal.State;
}
