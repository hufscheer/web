import { Popover as BasePopover } from '@base-ui/react';

import { cn } from '~/utils/cn';

export const PopoverPopup = ({ className, ...props }: PopoverPopup.Props) => {
  return (
    <BasePopover.Popup
      className={cn(
        'relative origin-[var(--transform-origin)] rounded-lg bg-greyscale-25 px-3 py-1 text-sm text-greyscale-300 shadow-md transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0',
        className,
      )}
      {...props}
    />
  );
};

export namespace PopoverPopup {
  export type Props = BasePopover.Popup.Props;
  export type State = BasePopover.Popup.State;
}
