import { Popover as BasePopover } from '@base-ui/react';
import clsx from 'clsx';

import * as styles from '../popover.css';

export const PopoverTrigger = ({ className, ...props }: PopoverTrigger.Props) => {
  return <BasePopover.Trigger className={clsx(styles.trigger, className)} {...props} />;
};

export namespace PopoverTrigger {
  export type Props = BasePopover.Trigger.Props;
  export type State = BasePopover.Trigger.State;
}
