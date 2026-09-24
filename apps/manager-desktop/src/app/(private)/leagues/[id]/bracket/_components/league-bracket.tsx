'use client';

import { useSuspenseQueries } from '@hcc/api-base';
import { queryKeys } from '@hcc/manager-api';
import Link from 'next/link';

import type { Bracket } from '~/types';

import { PageHeader } from '~/components/layout/page-header';
import { Button } from '~/components/ui/button';
import { routes } from '~/constants/routes';
import { toLeague } from '~/utils/convert';

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
        description="첫 라운드의 자리에 팀을 놓으면 위 라운드는 경기 결과를 따라 채워져요."
      />

      <div className="p-6">
        {locked ? (
          // 서버가 경기 붙은 대진표의 수정을 거절한다. 배치를 다 한 뒤 막지 않도록 들어올 때 알린다
          <div className="flex max-w-[560px] flex-col items-start gap-4 rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] px-6 py-8">
            <p className="text-t5 font-bold">이미 경기가 연결된 대진표예요</p>
            <p className="text-t6 leading-relaxed text-[var(--color-neutral-500)]">
              대진표에 붙은 경기가 있으면 자리를 바꿀 수 없어요. 대진을 다시 짜려면 해당 경기를 먼저
              삭제해 주세요.
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
