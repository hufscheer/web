'use client';

import { formatTime } from '@hcc/toolkit';
import { colors, Typography } from '@hcc/ui';
import Link from 'next/link';
import { useSuspenseLeague } from '~/api';
import { routes } from '~/constants/routes';

type Props = {
  id: number;
};

export const LeagueOverview = ({ id }: Props) => {
  const { data } = useSuspenseLeague({ leagueId: id });

  return (
    <div className="column gap-4 bg-white px-5 py-3">
      <div className="row-between">
        <Typography fontSize={20} weight="semibold" lineHeight="none">
          {data.name}
        </Typography>
        <Typography color={colors.neutral500} weight="medium" lineHeight="none">
          <Link href={`/${routes.league_manage(id)}`}>편집</Link>
        </Typography>
      </div>

      <div className="column gap-2.5">
        <Typography
          className="center-y gap-2"
          color={colors.neutral500}
          fontSize={14}
          weight="medium"
          lineHeight="none"
        >
          <strong>참여</strong>
          {data.leagueTeamCount}개 팀
        </Typography>
        <Typography
          className="center-y gap-2"
          color={colors.neutral500}
          fontSize={14}
          weight="medium"
          lineHeight="none"
        >
          <strong>라운드</strong>
          {data.maxRound}강
        </Typography>
        <Typography
          className="center-y gap-2"
          color={colors.neutral500}
          fontSize={14}
          weight="medium"
          lineHeight="none"
        >
          <strong>기간</strong>
          {formatTime(data.startAt)} - {formatTime(data.endAt)}
        </Typography>
      </div>
    </div>
  );
};
