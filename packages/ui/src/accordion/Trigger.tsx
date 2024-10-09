import { KeyboardArrowDownIcon } from '@hcc/icons';
import { clsx } from 'clsx';
import { ElementType, forwardRef } from 'react';

import useAccordion from './hooks/useAccordion';
import useAccordionItem from './hooks/useAccordionItem';
import * as styles from './styles.css';
import {
  PolymorphicComponentProps,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from './type';
import Icon from '../icon';

type Props<C extends ElementType> = PolymorphicComponentProps<C>;
type ContentType = <C extends ElementType = 'button'>(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => React.ReactNode;

const Trigger: ContentType = forwardRef(function AccordionTrigger<
  C extends ElementType = 'button',
>({ as, className, children }: Props<C>, ref: PolymorphicRef<C>) {
  const Component = as || 'button';

  const { accordion, handleItemOpen, handleItemClose } = useAccordion();
  const { value } = useAccordionItem();
  const open = accordion.includes(value);

  const handleClick = () => {
    open ? handleItemClose(value) : handleItemOpen(value);
  };

  return (
    <Component
      ref={ref}
      onClick={handleClick}
      className={clsx(styles.trigger, className)}
    >
      {children}
      <Icon
        source={KeyboardArrowDownIcon}
        size="sm"
        className={styles.caret({ open })}
      />
    </Component>
  );
});

export default Trigger;
