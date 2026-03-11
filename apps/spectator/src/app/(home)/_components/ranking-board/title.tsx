import { Typography } from '@hcc/ui';
import type { ComponentProps } from 'react';

interface RankingBoardTitleProps extends ComponentProps<'p'> {}

export const RankingBoardTitle = (props: RankingBoardTitleProps) => {
  return <Typography fontSize={12} weight="medium" className="text-greyscale-900" {...props} />;
};
