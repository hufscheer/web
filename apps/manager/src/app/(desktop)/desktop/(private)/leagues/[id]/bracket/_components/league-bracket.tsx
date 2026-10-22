'use client';

import { useSuspenseQueries } from '@hcc/api-base';
import Link from 'next/link';

import type { Bracket } from '~/desktop/types';

import { queryKeys } from '~/api';
import { PageHeader } from '~/desktop/components/layout/page-header';
import { Button } from '~/desktop/components/ui/button';
import { routes } from '~/desktop/constants/routes';
import { toLeague } from '~/desktop/utils/convert';

import { BracketForm } from './bracket-form';

/** 트리 밖 3·4위전까지 포함해, 경기가 하나라도 붙어 있는지 본다 */
const hasLinkedGame = (bracket: Bracket) =>
  bracket.rounds.some((round) => round.matches.some((match) => match.gameId !== null)) ||
  bracket.thirdPlaceMatch?.gameId != null;

/** 팀이 놓이는 건 1라운드뿐이라(위 라운드는 결과로 채워진다) 가장 큰 round 만 본다 */
const placementOf = (bracket: Bracket) => {
  const first = [...bracket.rounds].sort((a, b) => b.round - a.round)[0];
  if (!first) return {};

  const placement: Record<number, number> = {};
  for (const match of first.matches) {
    if (match.team1) placement[match.matchNumber * 2 - 1] = match.team1.teamId;
    if (match.team2) placement[match.matchNumber * 2] = match.team2.teamId;
  }
  return placement;
};

export const LeagueBracket = ({ leagueId }: { leagueId: number }) => {
  const [{ data: leagueData }, { data: leagueTeams }, { data: bracket }] = useSuspenseQueries({
    queries: [
      queryKeys.leagues.detail({ leagueId }),
      queryKeys.leagues.teams({ leagueId }),
      queryKeys.leagues.bracket({ leagueId }),
    ],
  });

  const league = toLeague(leagueData, leagueId);
  const locked = bracket ? hasLinkedGame(bracket) : false;

  return (
    <div className="flex flex-col">
      <PageHeader
        title={bracket ? '대진표 수정' : '대진표 등록'}
        breadcrumb={['대회 관리', { label: league.name, href: routes.league(league.leagueId) }]}
        description="첫 라운드에 팀을 배치하면 경기 결과에 따라 상위 라운드의 대진이 자동으로 채워져요."
      />

      <div className="p-6">
        {locked ? (
          // 서버가 경기 붙은 대진표의 수정을 거절한다. 배치를 다 한 뒤 막지 않도록 들어올 때 알린다
          <div className="flex max-w-[560px] flex-col items-start gap-4 rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] px-6 py-8">
            <p className="text-t5 font-bold">이미 경기가 연결된 대진표예요</p>
            <p className="text-t6 leading-relaxed text-[var(--color-neutral-500)]">
              자리를 바꾸려면 연결된 경기를 먼저 삭제해 주세요.
            </p>
            <Link href={routes.league(league.leagueId)}>
              <Button size="md" color="black" variant="outline">
                대회로 돌아가기
              </Button>
            </Link>
          </div>
        ) : (
          <BracketForm
            league={league}
            leagueTeams={leagueTeams}
            initialSize={bracket?.size ?? null}
            initialPlacement={bracket ? placementOf(bracket) : {}}
          />
        )}
      </div>
    </div>
  );
};
