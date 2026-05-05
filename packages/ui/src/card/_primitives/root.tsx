import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export const CardRoot = forwardRef<CardRoot.Refs, CardRoot.Props>((props, ref) => {
  return <div {...props} ref={ref} />;
});

export namespace CardRoot {
  export type Refs = HTMLDivElement;
  export type Props = ComponentPropsWithoutRef<'div'>;
}
