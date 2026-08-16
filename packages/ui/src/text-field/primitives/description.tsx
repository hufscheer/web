'use client';

import { useRender } from '@base-ui/react';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from '../text-field.css';
import { useTextFieldContext } from './context';

export const TextFieldDescription = forwardRef<HTMLSpanElement, TextFieldDescription.Props>(
  ({ render, id: idProp, className, children, ...props }, ref) => {
    const { descriptionId } = useTextFieldContext();
    const id = idProp ?? descriptionId;

    return useRender({
      ref,
      render,
      enabled: !!children,
      defaultTagName: 'span',
      props: {
        id,
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
