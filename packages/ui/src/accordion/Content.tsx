import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import useAccordion from './hooks/useAccordion';
import useAccordionItem from './hooks/useAccordionItem';
import * as styles from './styles.css';

const Content = ({ className, children, ...props }: ComponentProps<'div'>) => {
  const { accordion } = useAccordion();
  const { value } = useAccordionItem();
  const open = accordion.includes(value);

  return (
    <div className={styles.content({ open })}>
      <div className={clsx(styles.inner, className)} {...props}>
        {children}
      </div>
    </div>
  );
};

export default Content;
