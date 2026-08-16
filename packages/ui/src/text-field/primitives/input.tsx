'use client';

import type { ChangeEvent } from 'react';

import { Input as BaseInput } from '@base-ui/react';
import { useControlled } from '@base-ui/utils/useControlled';
import { useMergedRefs } from '@base-ui/utils/useMergedRefs';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from '../text-field.css';
import { useTextFieldContext } from './context';

export const TextFieldInput = forwardRef<HTMLInputElement, TextFieldInput.Props>(
  (
    { render, id: idProp, value: valueProp, defaultValue = '', onValueChange, className, ...props },
    ref,
  ) => {
    const { inputId, store } = useTextFieldContext();
    const { inputRef } = store.context;

    const mergedRefs = useMergedRefs(ref, inputRef);
    const id = idProp ?? inputId;

    const [value, setValue] = useControlled({
      name: 'TextField',
      controlled: valueProp,
      default: defaultValue,
    });

    const handleValueChange = (nextValue: string, event?: ChangeEvent<HTMLInputElement>) => {
      setValue(nextValue);
      onValueChange?.(nextValue, event);
    };

    store.useSyncedValue('value', typeof value === 'string' ? value : '');
    store.useContextCallback('setValue', handleValueChange);

    return (
      <BaseInput
        ref={mergedRefs}
        render={render}
        id={id}
        value={value}
        onChange={(event) => handleValueChange(event.target.value, event)}
        className={clsx(styles.input, className)}
        {...props}
      />
    );
  },
);

/* ----- types ----- */

export interface TextFieldInputProps extends Omit<BaseInput.Props, 'onValueChange'> {
  onValueChange?: (value: string, event?: ChangeEvent<HTMLInputElement>) => void;
}

export namespace TextFieldInput {
  export type State = BaseInput.State;
  export type Props = TextFieldInputProps;

  export type ChangeEventDetails = BaseInput.ChangeEventDetails;
  export type ChangeEventReason = BaseInput.ChangeEventReason;
}
