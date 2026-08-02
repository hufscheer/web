import { Trophy2Icon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import { twMerge } from 'tailwind-merge';

import type { WinnerType } from '~/api';

type Props = {
  winner: WinnerType;
  isHome: boolean;
};

export const WinnerRecord = ({ winner, isHome }: Props) => {
  return (
    <div
      className={twMerge(
        'center-y relative gap-4 py-2',
        isHome ? 'flex-row' : 'flex-row-reverse',
        isHome
          ? 'bg-gradient-to-r from-amber-100 to-transparent'
          : 'bg-gradient-to-l from-amber-100 to-transparent',
      )}
    >
      <div className="h-full w-[3px]" aria-hidden />

      <div className="center h-10 w-10 rounded-full border border-greyscale-50 bg-white text-amber-400">
        <Typography fontSize={14} weight="bold">
          W
        </Typography>
      </div>

      <Trophy2Icon size={24} className="text-amber-500" aria-hidden />

      <div className={twMerge('column', isHome ? 'items-start' : 'items-end')}>
        <Typography fontSize={14} weight="semibold" lineHeight="none">
          {winner.teamName}
        </Typography>
        <Typography
          fontSize={12}
          weight="medium"
          color="var(--color-neutral-500)"
          lineHeight="none"
          className="mt-1"
        >
          승리
        </Typography>
      </div>

      <div
        className={twMerge(
          isHome && 'absolute top-0 left-0 h-full w-[3px] bg-yellow-400',
          !isHome && 'absolute top-0 right-0 h-full w-[3px] bg-yellow-400',
        )}
        aria-hidden
      />

      {/* <div
        className={twMerge(
          "center-y gap-3 rounded-lg py-2 px-3 flex-1",
          isHome ? "flex-row" : "flex-row-reverse",
        )}
      >

      </div> */}
    </div>
  );
};
