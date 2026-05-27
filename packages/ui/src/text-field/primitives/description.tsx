'use client';

import { useRender } from '@base-ui/react';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from '../text-field.css';

export const TextFieldDescription = forwardRef<HTMLSpanElement, TextFieldDescription.Props>(
  ({ render, className, children, ...props }, ref) => {
    if (!children) return null;

    return useRender({
      ref,
      render,
      defaultTagName: 'span',
      props: {
        className: clsx(styles.description, className),
        children,
        ...props,
      },
    });
  },
);

/* ----- types ----- */

export interface TextFieldDescriptionProps extends useRender.ComponentProps<'label'> {}

export namespace TextFieldDescription {
  export type Props = TextFieldDescriptionProps;
}
