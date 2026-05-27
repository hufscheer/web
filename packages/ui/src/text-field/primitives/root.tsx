'use client';

import type { ChangeEvent } from 'react';

import { useRender } from '@base-ui/react';
import { useControlled } from '@base-ui/utils/useControlled';
import clsx from 'clsx';
import { forwardRef, useCallback, useMemo, useRef } from 'react';
import { useId } from 'react-aria/useId';

import * as styles from '../text-field.css';
import { TextFieldContext } from './context';

export const TextFieldRoot = forwardRef<HTMLDivElement, TextFieldRoot.Props>(
  (
    {
      render,
      id: idProp,
      value: valueProp,
      onValueChange,
      defaultValue = '',
      size = 'md',
      labelPosition,
      className,
      ...props
    },
    ref,
  ) => {
    const id = useId(idProp);
    const inputRef = useRef<HTMLInputElement>(null);

    const [value, setValue] = useControlled({
      name: 'TextField',
      controlled: valueProp,
      default: defaultValue,
    });

    const clearValue = useCallback(() => {
      setValue('');
      onValueChange?.('');
    }, [onValueChange, setValue]);

    const handleValueChange = useCallback(
      (value: string, event?: ChangeEvent<HTMLInputElement>) => {
        setValue(value);
        onValueChange?.(value, event);
      },
      [onValueChange, setValue],
    );

    const contextValue = useMemo(
      () => ({
        id,
        size,
        labelPosition,
        value,
        defaultValue,
        inputRef,
        onValueChange: handleValueChange,
        clearValue,
      }),
      [id, size, labelPosition, value, defaultValue, inputRef, handleValueChange, clearValue],
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
export interface TextFieldRootProps extends BaseRootProps, Partial<TextFieldContext> {}

export namespace TextFieldRoot {
  export type Props = TextFieldRootProps;
}
