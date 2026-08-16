import { useRender } from '@base-ui/react';

type WithoutChildren = Omit<useRender.ComponentProps<'div'>, 'children'>;
export interface SlotProps extends WithoutChildren {}

export const Slot = ({ render, ...props }: SlotProps) => {
  const element = useRender({ render, enabled: !!render, props });

  return element;
};
