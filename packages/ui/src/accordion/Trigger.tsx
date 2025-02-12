import { KeyboardArrowDownIcon } from '@hcc/icons';
import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import useAccordion from './hooks/useAccordion';
import useAccordionItem from './hooks/useAccordionItem';
import * as styles from './styles.css';
import Icon from '../icon';

const Trigger = ({ className, children }: ComponentProps<'button'>) => {
  const { accordion, handleItemOpen, handleItemClose } = useAccordion();
  const { value } = useAccordionItem();
  const open = accordion.includes(value);

  const handleClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    open ? handleItemClose(value) : handleItemOpen(value);
  };

  return (
    <button onClick={handleClick} className={clsx(styles.trigger, className)}>
      {children}
      <Icon
        source={KeyboardArrowDownIcon}
        size="sm"
        className={styles.caret({ open })}
      />
    </button>
  );
};

export default Trigger;
