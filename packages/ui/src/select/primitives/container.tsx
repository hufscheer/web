'use client';

import { Select as BaseSelect } from '@base-ui/react/select';
import { useMergedRefs } from '@base-ui/utils/useMergedRefs';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from '../select.css';
import { useSelectContext } from './context';

export const SelectContainer = forwardRef<HTMLButtonElement, SelectContainer.Props>(
  ({ render, className, ...props }, ref) => {
    const { size, store } = useSelectContext();
    const mergedRefs = useMergedRefs(ref, store.context.triggerRef);

    return (
      <BaseSelect.Trigger
        ref={mergedRefs}
        render={render}
        className={clsx(styles.container({ size }), className)}
        {...props}
      />
    );
  },
);

/* ----- types ----- */

export namespace SelectContainer {
  export type State = {};
  export type Props = BaseSelect.Trigger.Props;
}
