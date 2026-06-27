'use client';

import { useRender } from '@base-ui/react';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from '../text-field.css';
import { useTextFieldContext } from './context';

export const TextFieldLabel = forwardRef<HTMLLabelElement, TextFieldLabel.Props>(
  ({ render, htmlFor: htmlForProp, className, children, ...props }, ref) => {
    if (!children) return null;

    const { inputId, labelPosition } = useTextFieldContext();

    return useRender({
      ref,
      render,
      defaultTagName: 'label',
      props: {
        htmlFor: htmlForProp ?? inputId,
        className: clsx(styles.label({ labelPosition }), className),
        children,
        ...props,
      },
    });
  },
);

/* ----- types ----- */

export interface TextFieldLabelProps extends useRender.ComponentProps<'label'> {}

export namespace TextFieldLabel {
  export type Props = TextFieldLabelProps;
}
