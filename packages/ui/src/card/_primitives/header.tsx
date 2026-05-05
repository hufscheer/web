import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export const CardHeader = forwardRef<CardHeader.Refs, CardHeader.Props>((props, ref) => {
  return <header {...props} ref={ref} />;
});

export namespace CardHeader {
  export type Refs = HTMLElement;
  export type Props = ComponentPropsWithoutRef<'header'>;
}
