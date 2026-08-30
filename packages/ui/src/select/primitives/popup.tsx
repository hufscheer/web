'use client';

import { Select as BaseSelect } from '@base-ui/react/select';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from '../select.css';

export const SelectPopup = forwardRef<HTMLDivElement, SelectPopupProps>(
  ({ side = 'bottom', align = 'start', sideOffset = 4, alignOffset, className, children }, ref) => {
    return (
      <BaseSelect.Portal>
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

export interface SelectPopupProps extends BaseSelect.Popup.Props {
  side?: BaseSelect.Positioner.Props['side'];
  align?: BaseSelect.Positioner.Props['align'];
  sideOffset?: BaseSelect.Positioner.Props['sideOffset'];
  alignOffset?: BaseSelect.Positioner.Props['alignOffset'];
}

export namespace SelectPopup {
  export type State = BaseSelect.Popup.State;
  export type Props = SelectPopupProps;
}
