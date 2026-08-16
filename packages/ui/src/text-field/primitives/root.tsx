'use client';

import { useRender } from '@base-ui/react';
import { useRefWithInit } from '@base-ui/utils/useRefWithInit';
import clsx from 'clsx';
import { forwardRef, useMemo, useRef } from 'react';
import { useId } from 'react-aria';

import * as styles from '../text-field.css';
import { TextFieldContext } from './context';
import { createTextFieldStore } from './store';

export const TextFieldRoot = forwardRef<HTMLDivElement, TextFieldRoot.Props>(
  (
    {
      render,
      inputId: inputIdProp,
      descriptionId: descriptionIdProp,
      size = 'md',
      labelPosition,
      className,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const inputId = useId(inputIdProp);
    const descriptionId = useId(descriptionIdProp);

    const store = useRefWithInit(createTextFieldStore, inputRef).current;

    const contextValue = useMemo(
      () => ({
        inputId,
        descriptionId,
        size,
        labelPosition,
        store,
      }),
      [inputId, descriptionId, size, labelPosition, store],
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

    return <TextFieldContext.Provider value={contextValue}>{element}</TextFieldContext.Provider>;
  },
);

/* ----- types ----- */

export type BaseRootProps = Omit<useRender.ComponentProps<'div'>, keyof TextFieldContext>;
export interface TextFieldRootProps
  extends BaseRootProps, Partial<Omit<TextFieldContext, 'store'>> {}

export namespace TextFieldRoot {
  export type Props = TextFieldRootProps;
}
