import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export const CardTitle = forwardRef<CardTitle.Refs, CardTitle.Props>((props, ref) => {
  return <h2 {...props} ref={ref} />;
});

export namespace CardTitle {
  export type Refs = HTMLHeadingElement;
  export type Props = ComponentPropsWithoutRef<'h2'>;
}
