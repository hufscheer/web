'use client';

import { Select as BaseSelect } from '@base-ui/react/select';
import { useControlled } from '@base-ui/utils/useControlled';
import { useRefWithInit } from '@base-ui/utils/useRefWithInit';
import { useCallback, useMemo, useRef } from 'react';
import { useId } from 'react-aria';

import * as styles from '../select.css';
import { SelectContext } from './context';
import { createSelectStore } from './store';

export function SelectRoot({
  labelId: labelIdProp,
  descriptionId: descriptionIdProp,
  size = 'md',
  labelPosition,

  value: valueProp,
  defaultValue = '',
  onValueChange,

  children,
  ...props
}: SelectRootProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const labelId = useId(labelIdProp);
  const descriptionId = useId(descriptionIdProp);

  const store = useRefWithInit(createSelectStore, triggerRef).current;

  const [value, setValue] = useControlled({
    name: 'Select',
    controlled: valueProp,
    default: defaultValue,
  });

  const handleValueChange = useCallback(
    (nextValue: string) => {
      setValue(nextValue);
      onValueChange?.(nextValue);
    },
    [setValue, onValueChange],
  );

  const clear = useCallback(() => {
    setValue('');
    onValueChange?.('');
    triggerRef.current?.focus();
  }, [setValue, onValueChange]);

  store.useSyncedValue('value', value);
  store.useContextCallback('clear', clear);

  const contextValue = useMemo(
    () => ({
      descriptionId,
      size,
      labelPosition,
      store,
    }),
    [descriptionId, size, labelPosition, store],
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <BaseSelect.Root<SelectRoot.Value, Multiple>
        id={labelId}
        value={value}
        onValueChange={(value) => handleValueChange(value ?? '')}
        {...props}
      >
        <div className={styles.root({ labelPosition })}>{children}</div>
      </BaseSelect.Root>
    </SelectContext.Provider>
  );
}

/* ----- types ----- */

type Multiple = false;

export interface SelectRootProps extends Omit<
  BaseSelect.Root.Props<SelectRoot.Value, Multiple>,
  'id' | 'onValueChange' | 'multiple'
> {
  labelId?: string;
  descriptionId?: string;
  size?: 'md' | 'lg';
  labelPosition?: 'top' | 'left';

  onValueChange?: (value: string) => void;
}

export namespace SelectRoot {
  export type State = BaseSelect.Root.State;
  export type Props = SelectRootProps;

  export type Value = string;
}
