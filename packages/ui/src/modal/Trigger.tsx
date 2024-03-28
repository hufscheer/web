import { ElementType, forwardRef } from 'react';

import { useModal } from './hooks';
import {
  PolymorphicComponentProps,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from './type';

type Props<C extends ElementType> = PolymorphicComponentProps<C>;
type TriggerType = <C extends ElementType = 'button'>(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => React.ReactNode;

const ModalTrigger: TriggerType = forwardRef(function ModalTrigger<
  C extends ElementType = 'button',
>(
  { as, className, children, onClick, ...props }: Props<C>,
  ref: PolymorphicRef<C>,
) {
  const Component = as || 'button';
  const { onOpenToggle } = useModal();

  const handleClick = () => {
    onOpenToggle();
    onClick?.();
  };

  return (
    <Component ref={ref} className={className} {...props} onClick={handleClick}>
      {children}
    </Component>
  );
});

export default ModalTrigger;
