'use client';

import { Typography } from '@hcc/ui';
import type { FC } from 'react';
import type { TeamDetailType } from '~/api';

type Props = {
  team: TeamDetailType;
};

const ScoreBadge: FC<Props> = ({ team }) => {
  //const trophies = team.trophies ?? [];

  // if (trophies.length > 0) {
  //   const winCount = trophies.filter(t => t.trophyType === '우승').length;
  //   const runnerUpCount = trophies.filter(t => t.trophyType === '준우승').length;

  // return (
  //   <div className="flex items-center gap-2 whitespace-nowrap">
  //     <div className="flex items-center gap-1 rounded-2xl bg-yellow-300 px-2 py-0.5">
  //       <Typography fontSize={14} color="neutral-700">
  //         🏆
  //       </Typography>
  //       <div className="rounded-2xl bg-white px-2">
  //         <Typography fontSize={14} color="neutral-700">
  //           x{winCount}
  //         </Typography>
  //       </div>
  //     </div>

  //     <div className="flex items-center gap-1 rounded-2xl bg-neutral-200 px-2 py-0.5">
  //       <Typography fontSize={14} color="neutral-700">
  //         🥈
  //       </Typography>
  //       <div className="rounded-2xl bg-white px-2">
  //         <Typography fontSize={14} color="neutral-700">
  //           x{runnerUpCount}
  //         </Typography>
  //       </div>
  //     </div>
  //   </div>
  // );
  // }

  return (
    <div className="flex items-center whitespace-nowrap">
      <Typography fontSize={12} color="neutral-500">
        🟢{team.winCount}W
      </Typography>
      <Typography fontSize={12} color="neutral-500">
        🟡{team.drawCount}D
      </Typography>
      <Typography fontSize={12} color="neutral-500">
        🔴{team.loseCount}L
      </Typography>
    </div>
  );
};

export default ScoreBadge;
