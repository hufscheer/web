'use client';

import { Select as BaseSelect } from '@base-ui/react';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from '../select.css';
import { useSelectContext } from './context';

export const SelectLabel = forwardRef<HTMLParagraphElement, SelectLabel.Props>(
  ({ render, className, ...props }, ref) => {
    const { labelPosition } = useSelectContext();

    return (
      <BaseSelect.Label
        ref={ref}
        render={render}
        className={clsx(styles.label({ labelPosition }), className)}
        {...props}
      />
    );
  },
);

/* ----- types ----- */

export namespace SelectLabel {
  export type State = BaseSelect.Label.State;
  export type Props = BaseSelect.Label.Props;
}
