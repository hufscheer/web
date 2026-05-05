import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export const CardFooter = forwardRef<CardFooter.Refs, CardFooter.Props>((props, ref) => {
  return <footer {...props} ref={ref} />;
});

export namespace CardFooter {
  export type Refs = HTMLElement;
  export type Props = ComponentPropsWithoutRef<'footer'>;
}
