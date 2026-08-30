'use client';

import type { MouseEvent } from 'react';

import { useRender } from '@base-ui/react';
import { CloseIcon } from '@hcc/icons';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from '../select.css';
import { useSelectContext } from './context';

export const SelectClear = forwardRef<HTMLButtonElement, SelectClear.Props>(
  ({ render, className, onClick, children: childrenProp, ...props }, ref) => {
    const children = childrenProp ?? <CloseIcon size={14} />;

    const { store } = useSelectContext();
    const value = store.useState('value');

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      store.context.clear();

      onClick?.(event);
    };

    return useRender({
      ref,
      render,
      defaultTagName: 'button',
      enabled: !!value,
      props: {
        type: 'button',
        className: clsx(styles.clear, className),
        onClick: handleClick,
        children,
        ...props,
      },
    });
  },
);

/* ----- types ----- */

// export interface SelectClearProps extends useRender.ComponentProps<'button'> {}

export namespace SelectClear {
  export type State = {};
  export type Props = useRender.ComponentProps<'button'>;
}
