import { Popover as BasePopover } from '@base-ui/react';

import { cn } from '~/utils/cn';

export const PopoverTrigger = ({ className, ...props }: PopoverTrigger.Props) => {
  return <BasePopover.Trigger className={cn('cursor-pointer', className)} {...props} />;
};

export namespace PopoverTrigger {
  export type Props = BasePopover.Trigger.Props;
  export type State = BasePopover.Trigger.State;
}
