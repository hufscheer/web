import { Popover as BasePopover } from '@base-ui/react';
import clsx from 'clsx';

import * as styles from '../popover.css';

export const PopoverArrow = ({ className, ...props }: PopoverArrow.Props) => {
  return (
    <BasePopover.Arrow className={clsx(styles.arrow, className)} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="currentColor"
      >
        <path d="M0 0 L6 6 L12 0" />
      </svg>
    </BasePopover.Arrow>
  );
};

export namespace PopoverArrow {
  export type Props = BasePopover.Arrow.Props;
  export type State = BasePopover.Arrow.State;
}
