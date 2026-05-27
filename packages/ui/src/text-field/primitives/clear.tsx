'use client';

import { useRender } from '@base-ui/react';
import { CloseIcon } from '@hcc/icons';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from '../text-field.css';
import { useTextFieldContext } from './context';

export const TextFieldClear = forwardRef<HTMLButtonElement, TextFieldClear.Props>(
  ({ render, className, children: childrenProp, ...props }, ref) => {
    const children = childrenProp ?? <CloseIcon size={14} />;

    const { value, clearValue, inputRef } = useTextFieldContext();

    const handleClick = () => {
      clearValue();
      inputRef?.current?.focus();
    };

    return useRender({
      ref,
      render,
      defaultTagName: 'button',
      enabled: !!value,
      props: {
        className: clsx(styles.clear, className),
        onClick: handleClick,
        children,
        ...props,
      },
    });
  },
);

/* ----- types ----- */

export interface TextFieldClearProps extends useRender.ComponentProps<'button'> {}

export namespace TextFieldClear {
  export type Props = TextFieldClearProps;
}
