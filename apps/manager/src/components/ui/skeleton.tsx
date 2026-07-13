import type { HTMLAttributes } from 'react';

import { clsx } from 'clsx';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={clsx('w-full animate-pulse rounded-md bg-neutral-100 p-3', className)}
      {...props}
    />
  );
};
