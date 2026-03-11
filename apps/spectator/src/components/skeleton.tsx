import { useRender } from '@base-ui/react';
import { cn } from '~/utils/cn';

interface SkeletonProps extends useRender.ComponentProps<'div'> {}

export const Skeleton = ({ ref, render, className, ...props }: SkeletonProps) => {
  return useRender({
    ref,
    render,
    defaultTagName: 'div',
    props: {
      className: cn('animate-pulse rounded-md w-full bg-gray-100 p-3', className),
      ...props,
    },
  });
};
