import { TimerOutlineIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { clsx } from 'clsx';
import { ComponentProps, forwardRef, useImperativeHandle, useRef } from 'react';

import * as styles from './TimeInput.css';

type TimeInputProps = ComponentProps<'input'>;

const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  ({ className, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleClickInput = () => {
      inputRef.current?.showPicker();
    };

    return (
      <button
        type="button"
        className={styles.wrapper}
        onClick={handleClickInput}
      >
        <input
          ref={inputRef}
          type="time"
          className={clsx(styles.timeInput, className)}
          {...props}
        />
        <Icon source={TimerOutlineIcon} className={styles.icon} />
      </button>
    );
  },
);
TimeInput.displayName = 'TimeInput';

export default TimeInput;
