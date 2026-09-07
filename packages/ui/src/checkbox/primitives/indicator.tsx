'use client';

import { Checkbox as BaseCheckbox } from '@base-ui/react';
import { CheckSmallIcon } from '@hcc/icons';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from '../checkbox.css';
import { useCheckboxContext } from './context';

export const CheckboxIndicator = forwardRef<HTMLButtonElement, CheckboxIndicator.Props>(
  ({ id: idProp, className, children, render, ...props }, ref) => {
    const { inputId, size } = useCheckboxContext();
    const id = idProp ?? inputId;

    return (
      <BaseCheckbox.Root
        ref={ref}
        id={id}
        render={render}
        className={clsx(styles.indicator({ size }), className)}
        {...props}
      >
        <BaseCheckbox.Indicator keepMounted className={styles.container}>
          {children ?? <CheckSmallIcon size="24" />}
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
    );
  },
);
CheckboxIndicator.displayName = 'CheckboxIndicator';

/* ----- types ----- */

export type BaseIndicatorProps = BaseCheckbox.Root.Props;
export interface CheckboxIndicatorProps extends BaseIndicatorProps {}

export namespace CheckboxIndicator {
  export type Props = CheckboxIndicatorProps;
}
