'use client';

import { Select as BaseSelect } from '@base-ui/react/select';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from '../select.css';

export const SelectItem = forwardRef<HTMLDivElement, SelectItem.Props>(
  ({ className, ...props }, ref) => {
    return <BaseSelect.Item ref={ref} className={clsx(styles.item, className)} {...props} />;
  },
);

/* ----- types ----- */

export namespace SelectItem {
  export type State = BaseSelect.Item.State;
  export type Props = BaseSelect.Item.Props;
}
