import { CrossIcon } from '@hcc/icons';
import { ElementType, forwardRef } from 'react';

import { useModal } from './hooks';
import * as styles from './styles.css';
import {
  PolymorphicComponentProps,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from './type';
import Icon from '../icon';

type Props<C extends ElementType> = PolymorphicComponentProps<C>;
type CloseType = <C extends ElementType = 'button'>(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => React.ReactNode;

const ModalClose: CloseType = forwardRef(function ModalClose<
  C extends ElementType = 'button',
>({ as, children, ...props }: Props<C>, ref: PolymorphicRef<C>) {
  const Component = as || 'button';
  const { onOpenChange } = useModal();

  if (children) {
    return (
      <Component ref={ref} {...props} onClick={() => onOpenChange(false)}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={ref}
      {...props}
      onClick={() => onOpenChange(false)}
      className={styles.close}
    >
      <Icon source={CrossIcon} size="xs" />
    </Component>
  );
});

export default ModalClose;