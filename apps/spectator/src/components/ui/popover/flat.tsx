import { Popover as PrimitivePopover } from '.';

interface PopoverProps extends PrimitivePopover.Root.Props {
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
  className,
  children,
  ...props
}: PopoverProps) => {
  return (
    <PrimitivePopover.Root {...props}>
      <PrimitivePopover.Trigger delay={delay} closeDelay={closeDelay} openOnHover={openOnHover}>
        {trigger}
      </PrimitivePopover.Trigger>
      <PrimitivePopover.Portal>
        <PrimitivePopover.Positioner>
          <PrimitivePopover.Popup className={className}>
            {children}
            <PrimitivePopover.Arrow />
          </PrimitivePopover.Popup>
        </PrimitivePopover.Positioner>
      </PrimitivePopover.Portal>
    </PrimitivePopover.Root>
  );
};
