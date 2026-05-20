import { Popover as BasePopover } from '@base-ui/react';

export const PopoverPositioner = ({
  side = 'bottom',
  sideOffset = 8,
  ...props
}: PopoverPositioner.Props) => {
  return <BasePopover.Positioner side={side} sideOffset={sideOffset} {...props} />;
};

export namespace PopoverPositioner {
  export type Props = BasePopover.Positioner.Props;
  export type State = BasePopover.Positioner.State;
}
