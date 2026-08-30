'use client';

import { Select as BaseSelect } from '@base-ui/react/select';
import { KeyboardArrowDownIcon } from '@hcc/icons';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from '../select.css';

export const SelectIcon = forwardRef<HTMLSpanElement, SelectIcon.Props>(
  ({ className, children: childrenProp, ...props }, ref) => {
    const children = childrenProp ?? <KeyboardArrowDownIcon size={20} />;

    return (
      <BaseSelect.Icon ref={ref} className={clsx(styles.icon, className)} {...props}>
        {children}
      </BaseSelect.Icon>
    );
  },
);

/* ----- types ----- */

export namespace SelectIcon {
  export type State = BaseSelect.Icon.State;
  export type Props = BaseSelect.Icon.Props;
}
