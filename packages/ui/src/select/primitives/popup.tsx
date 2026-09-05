'use client';

import { Select as BaseSelect } from '@base-ui/react/select';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from '../select.css';

export const SelectPopup = forwardRef<HTMLDivElement, SelectPopupProps>(
  (
    {
      container,
      side = 'bottom',
      align = 'start',
      sideOffset = 4,
      alignOffset,
      className,
      children,
    },
    ref,
  ) => {
    return (
      <BaseSelect.Portal container={container}>
        <BaseSelect.Positioner
          alignItemWithTrigger={false}
          className={styles.positioner}
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          <BaseSelect.Popup ref={ref} className={clsx(styles.popup, className)}>
            {children}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    );
  },
);

/* ----- types ----- */

type PortalProps = Pick<BaseSelect.Portal.Props, 'container'>;
type PositionerProps = Pick<
  BaseSelect.Positioner.Props,
  'side' | 'align' | 'sideOffset' | 'alignOffset'
>;

export interface SelectPopupProps extends PortalProps, PositionerProps, BaseSelect.Popup.Props {}

export namespace SelectPopup {
  export type State = BaseSelect.Popup.State;
  export type Props = SelectPopupProps;
}
