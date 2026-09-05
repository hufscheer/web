'use client';

import { useRender } from '@base-ui/react';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from '../checkbox.css';
import { useCheckboxContext } from './context';

export const CheckboxLabel = forwardRef<HTMLLabelElement, CheckboxLabel.Props>(
  ({ render, htmlFor: htmlForProp, className, children, ...props }, ref) => {
    const { inputId } = useCheckboxContext();

    return useRender({
      ref,
      render,
      enabled: !!children,
      defaultTagName: 'label',
      props: {
        htmlFor: htmlForProp ?? inputId,
        className: clsx(styles.label, className),
        children,
        ...props,
      },
    });
  },
);
CheckboxLabel.displayName = 'CheckboxLabel';

/* ----- types ----- */

export interface CheckboxLabelProps extends useRender.ComponentProps<'label'> {}

export namespace CheckboxLabel {
  export type Props = CheckboxLabelProps;
}
