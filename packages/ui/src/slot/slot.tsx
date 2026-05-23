import { useRender } from '@base-ui/react';

type WithoutChildren = Omit<useRender.ComponentProps<'div'>, 'children'>;
export interface SlotProps extends WithoutChildren {}

export const Slot = ({ render, ...props }: SlotProps) => {
  return useRender({ render, props });
};
