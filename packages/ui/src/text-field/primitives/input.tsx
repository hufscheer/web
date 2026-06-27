'use client';

import { Input as BaseInput } from '@base-ui/react';
import { useMergedRefs } from '@base-ui/utils/useMergedRefs';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from '../text-field.css';
import { useTextFieldContext } from './context';

export const TextFieldInput = forwardRef<HTMLInputElement, TextFieldInput.Props>(
  ({ render, id: idProp, className, ...props }, ref) => {
    const { inputId, inputRef, value, defaultValue, onValueChange } = useTextFieldContext();

    const mergedRefs = useMergedRefs(ref, inputRef);
    const id = idProp ?? inputId;

    return (
      <BaseInput
        ref={mergedRefs}
        render={render}
        id={id}
        value={value}
        defaultValue={defaultValue}
        // onValueChange={onValueChange}
        onChange={(event) => onValueChange(event.currentTarget.value, event)}
        className={clsx(styles.input, className)}
        {...props}
      />
    );
  },
);

/* ----- types ----- */

export type BaseInputProps = Pick<BaseInput.Props, 'value' | 'defaultValue' | 'onValueChange'>;
export interface TextFieldInputProps extends Omit<BaseInput.Props, keyof BaseInputProps> {}

export namespace TextFieldInput {
  export type State = BaseInput.State;
  export type Props = TextFieldInputProps;

  export type ChangeEventDetails = BaseInput.ChangeEventDetails;
  export type ChangeEventReason = BaseInput.ChangeEventReason;
}
