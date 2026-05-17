import { Popover as BasePopover } from '@base-ui/react';

import { cn } from '~/utils/cn';

export const PopoverRoot = (props: BasePopover.Root.Props) => {
  return <BasePopover.Root {...props} />;
};

export const PopoverTrigger = ({ className, ...props }: BasePopover.Trigger.Props) => {
  return <BasePopover.Trigger className={cn('cursor-pointer', className)} {...props} />;
};

export const PopoverPortal = (props: BasePopover.Portal.Props) => {
  return <BasePopover.Portal {...props} />;
};

export const PopoverPositioner = ({
  side = 'bottom',
  sideOffset = 8,
  ...props
}: BasePopover.Positioner.Props) => {
  return <BasePopover.Positioner side={side} sideOffset={sideOffset} {...props} />;
};

export const PopoverArrow = ({ className, ...props }: BasePopover.Arrow.Props) => {
  return (
    <BasePopover.Arrow
      className={cn('absolute top-0 -z-[1] -translate-y-full', className)}
      {...props}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="8" viewBox="0 0 16 8" fill="none">
        <path
          d="M0 8L16 8L9.41421 1.41421C8.63317 0.633166 7.36684 0.633166 6.58579 1.41421L0 8Z"
          fill="#F5F5F7"
        />
      </svg>
    </BasePopover.Arrow>
  );
};

export const PopoverPopup = ({ className, ...props }: BasePopover.Popup.Props) => {
  return (
    <BasePopover.Popup
      className={cn(
        'relative rounded-lg bg-greyscale-25 px-3 py-1 text-sm text-greyscale-300 shadow-md',
        className,
      )}
      {...props}
    />
  );
};

export const PopoverClose = (props: BasePopover.Close.Props) => {
  return <BasePopover.Close {...props} />;
};

interface PopoverProps extends BasePopover.Root.Props {
  trigger: React.ReactNode;
  openOnHover?: boolean;
  delay?: number;
  closeDelay?: number;
  className?: string;
  children: React.ReactNode;
}

export const Popover = ({
  trigger,
  openOnHover = false,
  delay = 300,
  closeDelay = 300,
  children,
  className,
  ...props
}: PopoverProps) => {
  return (
    <PopoverRoot {...props}>
      <PopoverTrigger delay={delay} closeDelay={closeDelay} openOnHover={openOnHover}>
        {trigger}
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverPositioner>
          <PopoverPopup className={className}>
            {children}
            <PopoverArrow />
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </PopoverRoot>
  );
};
