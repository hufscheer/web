'use client';

import { formatTime } from '@hcc/toolkit';
import { colors, Typography } from '@hcc/ui';
import Link from 'next/link';

import { useSuspenseLeague } from '~/api';
import { getRoundLabel } from '~/constants/leagues';
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
          {getRoundLabel(data.maxRound, data.sportType)}
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

export const LeagueOverviewError = () => {
  return (
    <Typography
      className="bg-white p-5 text-center"
      color={colors.neutral500}
      fontSize={14}
      weight="medium"
      lineHeight="none"
    >
      대회 정보를 불러오는 중에 오류가 발생했어요.
    </Typography>
  );
};
