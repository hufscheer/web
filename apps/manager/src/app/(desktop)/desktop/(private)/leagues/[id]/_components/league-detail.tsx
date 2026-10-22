'use client';

import { useQueryClient, useSuspenseQueries } from '@hcc/api-base';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import type { GameStateType } from '~/api';
import type { Game } from '~/app/(desktop)/_types';

import { queryKeys } from '~/api';
import {
  AddIcon,
  ChevronForwardIcon,
  SettingsIcon,
  SmsIcon,
} from '~/app/(desktop)/_components/icons';
import { PageHeader } from '~/app/(desktop)/_components/layout/page-header';
import { SportTag } from '~/app/(desktop)/_components/sport-tag';
import { Badge, LiveBadge } from '~/app/(desktop)/_components/ui/badge';
import { Button } from '~/app/(desktop)/_components/ui/button';
import { routes } from '~/app/(desktop)/_constants/routes';
import { isLeagueDone, roundLabel } from '~/app/(desktop)/_constants/sports';
import { toGames, toLeague } from '~/app/(desktop)/_utils/convert';
import { monthDay, period, timeOf } from '~/app/(desktop)/_utils/date';

import { BracketView } from './bracket-view';
import { LeagueStatisticsPanel } from './league-statistics';

// `/leagues/{id}/games` 는 삭제된 팀을 가리키는 경기가 있으면 500 이라 상태별 목록으로 받는다
const gamesOf = (leagueId: number, state: GameStateType) =>
  queryKeys.games.list({ league_id: leagueId, state, size: 100 });

function GameStateBadge({ state }: { state: Game['state'] }) {
  if (state === 'PLAYING') return <LiveBadge />;
  if (state === 'FINISHED') return <Badge>종료</Badge>;
  return <Badge variant="primary">예정</Badge>;
}

/** 통계는 실패해도 페이지가 떠야 해서 따로 받는다. 본문을 기다리지 않게 먼저 요청해 둔다 */
const usePrefetchStatistics = (leagueId: number) => {
  const queryClient = useQueryClient();
  const payload = { leagueId };

  const statistics = queryKeys.leagues.statistics(payload);
  const topScorers = queryKeys.leagues.topScorers(payload);
  const cheerCount = queryKeys.leagues.cheerCount(payload);

  if (!queryClient.getQueryState(statistics.queryKey)) void queryClient.prefetchQuery(statistics);
  if (!queryClient.getQueryState(topScorers.queryKey)) void queryClient.prefetchQuery(topScorers);
  if (!queryClient.getQueryState(cheerCount.queryKey)) void queryClient.prefetchQuery(cheerCount);
};

export const LeagueDetail = ({ leagueId }: { leagueId: number }) => {
  usePrefetchStatistics(leagueId);
  const router = useRouter();

  const [{ data: leagueData }, playing, scheduled, finished, { data: bracket }] =
    useSuspenseQueries({
      queries: [
        queryKeys.leagues.detail({ leagueId }),
        gamesOf(leagueId, 'PLAYING'),
        gamesOf(leagueId, 'SCHEDULED'),
        gamesOf(leagueId, 'FINISHED'),
        queryKeys.leagues.bracket({ leagueId }),
      ],
    });

  const league = toLeague(leagueData, leagueId);
  const leagueGames = [playing, scheduled, finished]
    .flatMap(({ data }) => toGames(data, () => league.sportType))
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="flex flex-col">
      <PageHeader
        title={league.name}
        breadcrumb={['대회 관리', league.name]}
        actions={
          <>
            <Link href={routes.leagueCheertalks(league.leagueId)}>
              <Button size="md" color="black" variant="outline">
                <SmsIcon size={15} />
                응원톡
              </Button>
            </Link>
            <Link href={routes.leagueManage(league.leagueId)}>
              <Button size="md" color="black" variant="outline">
                <SettingsIcon size={15} />
                대회 정보 수정
              </Button>
            </Link>
            <Link href={routes.gameCreate(league.leagueId)}>
              <Button size="md" color="primary">
                <AddIcon size={15} />
                경기 생성
              </Button>
            </Link>
          </>
        }
      />

      <div className="flex flex-col gap-6 px-6 py-6">
        <section className="flex flex-col gap-5 border-b border-[var(--color-hairline)] pb-6">
          <div>
            {isLeagueDone(league) ? (
              <Badge soft>종료</Badge>
            ) : (
              <LiveBadge soft>{roundLabel(league.inProgressRound)} 진행 중</LiveBadge>
            )}
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-5">
            <div className="flex flex-col gap-1">
              <span className="text-t7 text-[var(--color-neutral-400)]">참가 팀</span>
              <span className="tnum text-t1 leading-none font-bold">{league.leagueTeamCount}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-t7 text-[var(--color-neutral-400)]">경기</span>
              <span className="tnum text-t1 leading-none font-bold">{leagueGames.length}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-t7 text-[var(--color-neutral-400)]">최종 라운드</span>
              <span className="text-t1 leading-none font-bold">{roundLabel(league.maxRound)}</span>
            </div>

            <div className="flex min-w-0 flex-col gap-1 border-l border-[var(--color-greyscale-50)] pl-12">
              <span className="text-t7 text-[var(--color-neutral-400)]">기간</span>
              <span className="text-t5 font-medium">{period(league.startAt, league.endAt)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-t7 text-[var(--color-neutral-400)]">종목 · 3·4위전</span>
              <span className="text-t5 flex items-center gap-1.5 font-medium">
                <SportTag sportType={league.sportType} />
                <span className="text-[var(--color-neutral-300)]">·</span>
                {league.thirdPlaceMatchEnabled ? '3·4위전 있음' : '3·4위전 없음'}
              </span>
            </div>
          </div>
        </section>

        <LeagueStatisticsPanel leagueId={leagueId} sportType={league.sportType} />

        {/* 예선(100)은 토너먼트 트리가 없다 */}
        {league.maxRound !== 100 && (
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-t5 font-bold text-[var(--color-neutral-900)]">대진표</h2>
              <Link href={routes.leagueBracket(league.leagueId)}>
                <Button size="sm" color="black" variant="outline">
                  {bracket ? '대진표 수정' : '대진표 등록'}
                </Button>
              </Link>
            </div>

            {bracket ? (
              <div className="rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)] p-4">
                <BracketView
                  bracket={bracket}
                  games={leagueGames}
                  leagueId={league.leagueId}
                  sportType={league.sportType}
                />
              </div>
            ) : (
              <p className="text-t6 rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)] px-6 py-10 text-center text-[var(--color-neutral-400)]">
                아직 대진표가 생성되지 않았어요. 첫 라운드에 팀을 배치하면 경기 생성 시 대진표가
                자동으로 구성돼요.
              </p>
            )}
          </section>
        )}

        <section className="flex flex-col gap-3">
          <h2 className="text-t5 font-bold text-[var(--color-neutral-900)]">
            경기{' '}
            <span className="tnum font-semibold text-[var(--color-neutral-400)]">
              {leagueGames.length}
            </span>
          </h2>

          <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)]">
            {leagueGames.length === 0 ? (
              <p className="text-t6 px-5 py-12 text-center text-[var(--color-neutral-400)]">
                등록된 경기가 없어요.
              </p>
            ) : (
              leagueGames.map((game) => {
                const [home, away] = game.gameTeams;
                const played = game.state !== 'SCHEDULED';
                const openConsole = () => router.push(routes.gameTimelineOf(game));
                return (
                  <div
                    key={game.gameId}
                    role="link"
                    tabIndex={0}
                    onClick={(e) => {
                      // 오른쪽 버튼(기록하기·라인업 등록)은 각자 목적지가 있다
                      if (e.target instanceof Element && e.target.closest('a, button')) return;
                      openConsole();
                    }}
                    onKeyDown={(e) => {
                      if (e.target === e.currentTarget && e.key === 'Enter') openConsole();
                    }}
                    className="grid cursor-pointer grid-cols-[76px_minmax(0,380px)_1fr_auto] items-center gap-4 border-b border-[var(--color-hairline)] px-5 py-3.5 last:border-b-0 hover:bg-[var(--color-greyscale-25)]"
                  >
                    <GameStateBadge state={game.state} />

                    <span className="text-t5 flex min-w-0 items-center gap-3">
                      <span className="flex min-w-0 flex-1 items-center justify-end gap-2">
                        <span className="truncate font-medium">{home.gameTeamName}</span>
                        <span
                          className="size-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: home.teamColor }}
                        />
                      </span>

                      <span className="tnum shrink-0 text-center font-bold">
                        {played ? (
                          <span className="text-t3">
                            {home.score}
                            <span className="mx-1.5 font-normal text-[var(--color-neutral-300)]">
                              :
                            </span>
                            {away.score}
                          </span>
                        ) : (
                          <span className="text-t6 font-medium text-[var(--color-neutral-400)]">
                            vs
                          </span>
                        )}
                      </span>

                      <span className="flex min-w-0 flex-1 items-center gap-2">
                        <span
                          className="size-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: away.teamColor }}
                        />
                        <span className="truncate font-medium">{away.gameTeamName}</span>
                      </span>
                    </span>

                    <span className="tnum text-t6 text-[var(--color-neutral-500)]">
                      {`${monthDay(game.startTime)} ${timeOf(game.startTime)}`}
                    </span>

                    <span className="w-28 shrink-0 text-right">
                      {game.state === 'PLAYING' && (
                        <Link href={routes.gameTimelineOf(game)}>
                          <Button size="sm" color="primary">
                            기록하기
                            <ChevronForwardIcon size={20} />
                          </Button>
                        </Link>
                      )}
                      {game.state === 'SCHEDULED' && (
                        <Link
                          href={routes.gameLineup(league.leagueId, game.gameId, game.sportType)}
                        >
                          <Button size="sm" color="black" variant="outline">
                            라인업 등록
                          </Button>
                        </Link>
                      )}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
