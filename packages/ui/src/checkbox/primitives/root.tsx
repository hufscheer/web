'use client';

import { useRender } from '@base-ui/react';
import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';
import { useId } from 'react-aria';

import * as styles from '../checkbox.css';
import { CheckboxContext } from './context';

export const CheckboxRoot = forwardRef<HTMLDivElement, CheckboxRoot.Props>(
  (
    { render, inputId: inputIdProp, size = 'md', labelPosition = 'right', className, ...props },
    ref,
  ) => {
    const inputId = useId(inputIdProp);

    const contextValue = useMemo(
      () => ({
        inputId,
        size,
        labelPosition,
      }),
      [inputId, size, labelPosition],
    );

    const element = useRender({
      ref,
      render,
      defaultTagName: 'div',
      props: {
        className: clsx(styles.root({ labelPosition }), className),
        ...props,
      },
    });

    return <CheckboxContext.Provider value={contextValue}>{element}</CheckboxContext.Provider>;
  },
);
CheckboxRoot.displayName = 'CheckboxRoot';

/* ----- types ----- */

export type BaseRootProps = Omit<useRender.ComponentProps<'div'>, keyof CheckboxContext>;
export interface CheckboxRootProps extends BaseRootProps, Partial<CheckboxContext> {}

export namespace CheckboxRoot {
  export type Props = CheckboxRootProps;
}
