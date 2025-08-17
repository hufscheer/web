'use client';

import { ChevronForwardIcon } from '@hcc/icons';
import { Badge, Button, Typography } from '@hcc/ui';
import Link from 'next/link';
import { Fragment } from 'react';
import { useSuspenseLeaguesLeague } from '~/api';
import { ROUTES } from '~/constants/routes';

export const LeagueOverview = () => {
  const { data } = useSuspenseLeaguesLeague();

  return (
    <Fragment>
      {data.map(league => (
        <div key={league.id} className="w-full bg-white p-5">
          <div className="row-between w-full bg-white">
            <div className="center-y gap-2">
              <Badge size="sm" variant={league.leagueProgress === '진행 중' ? 'danger' : 'default'}>
                {league.leagueProgress}
              </Badge>
              <Typography weight="semibold">{league.name}</Typography>
            </div>
            <Link className="center" href={`${ROUTES.LEAGUE}/${league.id}`}>
              <ChevronForwardIcon size={24} />
            </Link>
          </div>

          <hr className="my-4 h-[1px] w-full border-none bg-neutral-100" />

          <div className="column w-full gap-2.5">
            <Typography
              color="var(--color-neutral-500)"
              fontSize={14}
              weight="medium"
              lineHeight="none"
            >
              <strong>참여</strong> {league.sizeOfLeagueTeams}개 팀
            </Typography>
            <Typography
              color="var(--color-neutral-500)"
              fontSize={14}
              weight="medium"
              lineHeight="none"
            >
              <strong>라운드</strong> {league.maxRound}강
            </Typography>
            <Typography
              color="var(--color-neutral-500)"
              fontSize={14}
              weight="medium"
              lineHeight="none"
            >
              <strong>기간</strong> {league.startAt} - {league.endAt}
            </Typography>
          </div>

          <div className="row-between mt-4 gap-2.5">
            <Button className="flex-1" size="sm" color="black" variant="subtle" asChild>
              <Link href={''}>참가 팀 관리</Link>
            </Button>
            <Button className="flex-1" size="sm" color="black" variant="subtle" asChild>
              <Link href={''}>응원톡 관리</Link>
            </Button>
          </div>
        </div>
      ))}
    </Fragment>
  );
};
