import type { ComponentProps } from 'react';

import { twMerge } from 'tailwind-merge';

interface RankingBoardProps extends ComponentProps<'div'> {}

export const RankingBoard = ({ className, ...props }: RankingBoardProps) => {
  return (
    <div
      className={twMerge(
        'flex flex-col items-center gap-2 rounded-md bg-greyscale-25 py-4',
        className,
      )}
      {...props}
    />
  );
};
