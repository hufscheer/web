'use client';

import { Select as BaseSelect } from '@base-ui/react/select';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from '../select.css';

export const SelectValue = forwardRef<HTMLSpanElement, SelectValue.Props>(
  ({ className, ...props }, ref) => {
    return <BaseSelect.Value ref={ref} className={clsx(styles.value, className)} {...props} />;
  },
);

/* ----- types ----- */

export namespace SelectValue {
  export type State = BaseSelect.Value.State;
  export type Props = BaseSelect.Value.Props;
}
