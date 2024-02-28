import { ElementType, forwardRef } from 'react';

import { useDialog } from './hooks';
import {
  PolymorphicComponentProps,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from './type';

type Props<C extends ElementType> = PolymorphicComponentProps<C>;
type TriggerType = <C extends ElementType = 'button'>(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => React.ReactNode;

const DialogTrigger: TriggerType = forwardRef(function DialogTrigger<
  C extends ElementType = 'button',
>({ as, children }: Props<C>, ref: PolymorphicRef<C>) {
  const Component = as || 'button';
  const { onOpenToggle } = useDialog();

  return (
    <Component ref={ref} onClick={onOpenToggle}>
      {children}
    </Component>
  );
});

export default DialogTrigger;
