import type { ComponentProps } from 'react';

import { useRender } from '@base-ui/react';
import { twMerge } from 'tailwind-merge';

interface ListProps extends useRender.ComponentProps<'ul'> {}

export const RankingBoardList = ({ render, className, ...props }: ListProps) => {
  return useRender({
    defaultTagName: 'ul',
    render,
    props: { className: twMerge('my-0 mx-auto px-14 w-full', className), ...props },
  });
};

// --------------------------------

interface ItemProps extends ComponentProps<'li'> {}

export const RankingBoardItem = ({ className, ...props }: ItemProps) => {
  return <li className={twMerge('flex items-center justify-between', className)} {...props} />;
};
