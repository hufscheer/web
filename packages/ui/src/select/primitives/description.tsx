'use client';

import { useRender } from '@base-ui/react';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from '../select.css';
import { useSelectContext } from './context';

export const SelectDescription = forwardRef<HTMLSpanElement, SelectDescription.Props>(
  ({ render, id: idProp, className, children, ...props }, ref) => {
    const { descriptionId } = useSelectContext();

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

export namespace SelectDescription {
  export type State = {};
  export type Props = useRender.ComponentProps<'span'>;
}
