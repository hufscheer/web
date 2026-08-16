'use client';

import { useRender } from '@base-ui/react';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from '../text-field.css';
import { useTextFieldContext } from './context';

export const TextFieldContainer = forwardRef<HTMLDivElement, TextFieldContainerProps>(
  ({ render, className, ...props }, ref) => {
    const { size } = useTextFieldContext();

    return useRender({
      ref,
      render,
      defaultTagName: 'div',
      props: {
        className: clsx(styles.container({ size }), className),
        ...props,
      },
    });
  },
);

/* ----- types ----- */

export type BaseContainerProps = useRender.ComponentProps<'div'>;
export interface TextFieldContainerProps extends BaseContainerProps {}

export namespace TextFieldContainer {
  export type Props = TextFieldContainerProps;
}
