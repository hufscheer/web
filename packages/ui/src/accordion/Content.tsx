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

type Props<C extends ElementType> = PolymorphicComponentProps<C>;
type ContentType = <C extends ElementType = 'button'>(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => React.ReactNode;

const Content: ContentType = forwardRef(function AccordionContent<
  C extends ElementType = 'div',
>({ as, className, children, ...props }: Props<C>, ref: PolymorphicRef<C>) {
  const Component = as || 'div';

  const { accordion } = useAccordion();
  const { value } = useAccordionItem();
  const open = accordion.includes(value);

  return (
    <div className={styles.content({ open })}>
      <Component ref={ref} className={clsx(styles.inner, className)} {...props}>
        {children}
      </Component>
    </div>
  );
});

export default Content;
