import { Popover as PrimitivePopover } from '.';

interface PopoverProps extends PrimitivePopover.Root.Props {
  // trigger props
  trigger: React.ReactNode;
  openOnHover?: boolean;
  delay?: number;
  closeDelay?: number;

  // accessibility
  label: string;

  className?: string;
  children: React.ReactNode;
}

export const Popover = ({
  trigger,
  openOnHover = false,
  delay = 300,
  closeDelay = 300,

  label,

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
          <PrimitivePopover.Popup className={className} aria-label={label}>
            {children}
            <PrimitivePopover.Arrow />
          </PrimitivePopover.Popup>
        </PrimitivePopover.Positioner>
      </PrimitivePopover.Portal>
    </PrimitivePopover.Root>
  );
};
