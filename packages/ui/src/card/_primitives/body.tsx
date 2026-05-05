import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export const CardBody = forwardRef<CardBody.Refs, CardBody.Props>((props, ref) => {
  return <div {...props} ref={ref} />;
});

export namespace CardBody {
  export type Refs = HTMLDivElement;
  export type Props = ComponentPropsWithoutRef<'div'>;
}
