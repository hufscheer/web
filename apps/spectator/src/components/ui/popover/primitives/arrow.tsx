import { Popover as BasePopover } from '@base-ui/react';

import { cn } from '~/utils/cn';

export const PopoverArrow = ({ className, ...props }: PopoverArrow.Props) => {
  return (
    <BasePopover.Arrow
      className={cn(
        'absolute top-0 -z-[1] text-greyscale-25 data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180',
        className,
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="8"
        viewBox="0 0 16 8"
        fill="none"
        className="fill-current"
      >
        <path d="M0 8L16 8L9.41421 1.41421C8.63317 0.633166 7.36684 0.633166 6.58579 1.41421L0 8Z" />
      </svg>
    </BasePopover.Arrow>
  );
};

export namespace PopoverArrow {
  export type Props = BasePopover.Arrow.Props;
  export type State = BasePopover.Arrow.State;
}
