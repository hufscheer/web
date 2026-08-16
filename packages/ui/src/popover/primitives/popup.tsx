import { Popover as BasePopover } from '@base-ui/react';
import clsx from 'clsx';

import * as styles from '../popover.css';

export const PopoverPopup = ({ className, ...props }: PopoverPopup.Props) => {
  return <BasePopover.Popup className={clsx(styles.popup, className)} {...props} />;
};

export namespace PopoverPopup {
  export type Props = BasePopover.Popup.Props;
  export type State = BasePopover.Popup.State;
}
