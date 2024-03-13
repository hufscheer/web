import { CrossIcon } from '@hcc/icons';
import { clsx } from 'clsx';
import React, { ElementType, forwardRef } from 'react';

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
>(
  { as, children, className, onClick, ...props }: Props<C>,
  ref: PolymorphicRef<C>,
) {
  const Component = as || 'button';
  const { onOpenChange } = useModal();

  const handleOnClick = () => {
    if (onClick) onClick();
    onOpenChange(false);
  };

  if (children) {
    return (
      <Component
        ref={ref}
        className={className}
        {...props}
        onClick={handleOnClick}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={ref}
      {...props}
      onClick={handleOnClick}
      className={clsx(styles.close, className)}
    >
      <Icon source={CrossIcon} size="xs" />
    </Component>
  );
});

export default ModalClose;
