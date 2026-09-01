import type { SlotsProps } from '../_utils/slot';

import { createSlots } from '../_utils/slot';
import * as PrimitivePopover from './primitives';

/* ----- slots ----- */

const slots = createSlots({ trigger: PrimitivePopover.Trigger });

/* ----- popover ----- */

export const Popover = ({
  trigger,
  openOnHover = false,
  delay = 300,
  closeDelay = 300,

  side = 'bottom',
  align = 'center',

  label,

  className,
  children,
  ...props
}: Popover.Props) => {
  return (
    <PrimitivePopover.Root {...props}>
      <slots.trigger
        render={trigger}
        delay={delay}
        closeDelay={closeDelay}
        openOnHover={openOnHover}
      />

      <PrimitivePopover.Portal>
        <PrimitivePopover.Positioner side={side} align={align}>
          <PrimitivePopover.Popup className={className} aria-label={label}>
            {children}
            <PrimitivePopover.Arrow />
          </PrimitivePopover.Popup>
        </PrimitivePopover.Positioner>
      </PrimitivePopover.Portal>
    </PrimitivePopover.Root>
  );
};

/* ----- types ----- */

export type RootProps = Omit<PrimitivePopover.Root.Props, 'children'>;
export type PositionerProps = Pick<PrimitivePopover.Positioner.Props, 'side' | 'align'>;
export type PopupProps = Pick<PrimitivePopover.Popup.Props, 'className' | 'children'>;
export type TriggerProps = Pick<
  PrimitivePopover.Trigger.Props,
  'delay' | 'closeDelay' | 'openOnHover'
>;

export type Slots = SlotsProps<typeof slots>;
export interface PopoverProps extends RootProps, PositionerProps, TriggerProps, PopupProps, Slots {
  label: string;
}

export namespace Popover {
  export type Props = PopoverProps;
  export type State = PrimitivePopover.Root.State;

  export type ChangeEventReason = PrimitivePopover.Root.ChangeEventReason;
  export type ChangeEventDetails = PrimitivePopover.Root.ChangeEventDetails;
  export type Actions = PrimitivePopover.Root.Actions;
}
