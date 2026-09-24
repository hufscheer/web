'use client';

import type { GameLineupType } from '@hcc/manager-api';

import { useQueries, useSuspenseQueries } from '@hcc/api-base';
import { queryKeys } from '@hcc/manager-api';
import Link from 'next/link';

import type { Game } from '~/types';

import { ChevronForwardIcon } from '~/components/icons';
import { PageHeader } from '~/components/layout/page-header';
import { Badge, LiveBadge } from '~/components/ui/badge';
import { routes } from '~/constants/routes';
import { isLeagueRunning, matchup, roundLabelOf, SportIcon } from '~/constants/sports';
import { toMyGames } from '~/hooks/useMyGames';
import { cn } from '~/utils/cn';
import { toManagerLeague } from '~/utils/convert';
import { dateDot, monthDay, timeOf, todayInKst } from '~/utils/date';

const GAME_PAGE_SIZE = 100;
const REPORTED_SIZE = 20;

/** 0건이면 머리글 한 줄로 접는다. 빈 패널이 자리를 잡으면 화면 절반이 빈칸이 된다 */
const Panel = ({
  title,
  count,
  href,
  note,
  empty,
  className,
  children,
}: {
  title: string;
  count?: number;
  href?: string;
  note?: string;
  empty?: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  const collapsed = count === 0 && empty !== undefined;

  return (
    <section
      className={cn(
        'flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)]',
        className,
      )}
    >
      <header
        className={cn(
          'flex h-11 shrink-0 items-center justify-between gap-2 px-4',
          !collapsed && 'border-b border-[var(--color-greyscale-50)]',
        )}
      >
        <h2 className="text-t6 flex min-w-0 items-baseline gap-1.5 font-semibold text-[var(--color-neutral-900)]">
          {title}
          {count !== undefined && (
            <span className="tnum text-t7 font-medium text-[var(--color-neutral-400)]">
              {count}
            </span>
          )}
          {collapsed && (
            <span className="text-t7 truncate font-normal text-[var(--color-neutral-400)]">
              · {empty}
            </span>
          )}
        </h2>
        {href && !collapsed && (
          <Link
            href={href}
            className="text-t7 flex shrink-0 items-center gap-0.5 font-medium text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-800)]"
          >
            전체 보기
            <ChevronForwardIcon size={12} />
          </Link>
        )}
      </header>
      {!collapsed && note && (
        <p className="text-t7 border-b border-[var(--color-hairline)] px-4 py-2.5 text-[var(--color-neutral-500)]">
          {note}
        </p>
      )}
      {!collapsed && children}
    </section>
  );
};

const rowClass =
  'flex items-center gap-3 border-b border-[var(--color-hairline)] px-4 py-3 last:border-b-0 hover:bg-[var(--color-greyscale-25)]';

const byTime = (a: Game, b: Game) => a.startTime.localeCompare(b.startTime);

type LineupStatus = 'loading' | 'missing' | 'registered';

// 선발이 한 명도 없으면 미등록. 조회에 실패한 경기도 미등록으로 센다
const lineupStatusOf = (result: { isError: boolean; data?: GameLineupType[] }): LineupStatus => {
  if (result.isError) return 'missing';
  if (!result.data) return 'loading';
  return result.data.some((team) => (team.starterPlayers ?? []).length > 0)
    ? 'registered'
    : 'missing';
};

export const Dashboard = () => {
  const today = todayInKst();

  const [
    { data: rawLeagues },
    { data: reportedPage },
    { data: scheduledPage },
    { data: livePage },
  ] = useSuspenseQueries({
    queries: [
      queryKeys.leagues.league,
      queryKeys.cheertalks.reported({ cursor: 0, size: REPORTED_SIZE }),
      queryKeys.games.listAll({ state: 'SCHEDULED', size: GAME_PAGE_SIZE }),
      queryKeys.games.listAll({ state: 'PLAYING', size: GAME_PAGE_SIZE }),
    ],
  });
  const leagues = rawLeagues.map(toManagerLeague);
  const reported = reportedPage.content ?? [];
  const scheduled = toMyGames(scheduledPage, leagues);
  const liveGames = toMyGames(livePage, leagues);

  const todayGames = scheduled.filter((g) => g.startTime.startsWith(today)).sort(byTime);
  const upcoming = scheduled.filter((g) => g.startTime.slice(0, 10) > today).sort(byTime);
  // 시작 시각이 지났는데 아직 예정인 경기. 취소됐거나 종료 처리를 빠뜨린 것들이다
  const stale = scheduled.filter((g) => g.startTime.slice(0, 10) < today).sort(byTime);

  const lineupStatus = useQueries({
    queries: todayGames.map((game) => queryKeys.games.lineup({ gameId: game.gameId })),
    combine: (results) =>
      new Map(results.map((result, index) => [todayGames[index].gameId, lineupStatusOf(result)])),
  });
  const missingLineup = todayGames.filter((g) => lineupStatus.get(g.gameId) === 'missing');

  const sortedLeagues = [
    ...leagues.filter(isLeagueRunning),
    ...leagues.filter((l) => !isLeagueRunning(l)),
  ];
  const todo = missingLineup.length + reported.length + stale.length;

  return (
    <>
      <PageHeader title="홈" description={dateDot(today)} />

      <div className="flex flex-col gap-5 px-6 py-5">
        <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <h2 className="text-t2 font-bold text-[var(--color-neutral-900)]">
            {todo > 0 ? (
              <>
                오늘 처리할 일이 <span className="text-[var(--color-rec-foul)]">{todo}건</span>{' '}
                있어요.
              </>
            ) : (
              '오늘 처리할 일이 없어요.'
            )}
          </h2>

          {/* 앞 묶음은 지금 상태, 뒤 묶음은 할 일이다. 뒤 셋의 합이 제목의 건수다 */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {[
              [
                { label: '진행 중', value: liveGames.length, accent: 'var(--color-danger-700)' },
                { label: '오늘 경기', value: todayGames.length, accent: null },
              ],
              [
                {
                  label: '라인업 미등록',
                  value: missingLineup.length,
                  accent: 'var(--color-rec-warning)',
                },
                { label: '신고 응원톡', value: reported.length, accent: 'var(--color-rec-foul)' },
                { label: '지난 예정', value: stale.length, accent: 'var(--color-rec-warning)' },
              ],
            ].map((group, index) => (
              <div key={group[0].label} className="flex items-center gap-x-4">
                {index > 0 && (
                  <span aria-hidden className="h-4 w-px bg-[var(--color-greyscale-50)]" />
                )}
                <dl className="flex items-center gap-x-4">
                  {group.map(({ label, value, accent }) => (
                    <div key={label} className="flex items-baseline gap-1.5">
                      <dt className="text-t7 text-[var(--color-neutral-400)]">{label}</dt>
                      <dd
                        className="tnum text-t5 font-semibold"
                        style={{
                          color:
                            value > 0
                              ? (accent ?? 'var(--color-neutral-800)')
                              : 'var(--color-neutral-300)',
                        }}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="flex min-w-0 flex-col gap-5">
            {liveGames.length > 0 && (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {liveGames.map((game) => (
                  <Link
                    key={game.gameId}
                    href={routes.gameTimelineOf(game)}
                    className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-danger-200)] p-4 transition-colors hover:border-[var(--color-danger-600)]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-t7 flex min-w-0 items-center gap-1.5 text-[var(--color-neutral-500)]">
                        <SportIcon sportType={game.sportType} size={12} colored />
                        <span className="truncate">
                          {game.leagueName} · {roundLabelOf(game)}
                        </span>
                      </span>
                      <LiveBadge />
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="text-t6 min-w-0 flex-1 truncate text-right font-medium">
                        {game.gameTeams[0].gameTeamName}
                      </span>
                      <span className="flex shrink-0 flex-col items-center">
                        <span className="tnum text-t1 leading-none font-bold tracking-tight">
                          {game.gameTeams[0].score}
                          <span className="mx-1 font-normal text-[var(--color-neutral-300)]">
                            :
                          </span>
                          {game.gameTeams[1].score}
                        </span>
                        <span className="text-t8 mt-1 text-[var(--color-neutral-400)]">
                          {game.gameQuarter.label}
                        </span>
                      </span>
                      <span className="text-t6 min-w-0 flex-1 truncate font-medium">
                        {game.gameTeams[1].gameTeamName}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <Panel title="오늘 경기" count={todayGames.length} empty="예정된 경기가 없어요.">
              {todayGames.map((game) => {
                const status = lineupStatus.get(game.gameId);
                return (
                  <Link
                    key={game.gameId}
                    href={routes.game(game.leagueId, game.gameId, game.sportType)}
                    className={rowClass}
                  >
                    <span className="tnum text-t6 w-11 shrink-0 font-medium text-[var(--color-neutral-900)]">
                      {timeOf(game.startTime)}
                    </span>
                    <span
                      aria-hidden
                      className="h-7 w-px shrink-0 bg-[var(--color-greyscale-50)]"
                    />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-t6 truncate font-medium">{matchup(game)}</span>
                      <span className="text-t8 truncate text-[var(--color-neutral-400)]">
                        {game.leagueName} · {roundLabelOf(game)}
                      </span>
                    </span>
                    {status === 'missing' && <Badge variant="warning">라인업 미등록</Badge>}
                    {status === 'registered' && <Badge variant="success">등록됨</Badge>}
                  </Link>
                );
              })}
            </Panel>
            <Panel title="다음 경기" count={upcoming.length} empty="예정된 경기가 없어요.">
              {upcoming.map((game) => (
                <Link
                  key={game.gameId}
                  href={routes.game(game.leagueId, game.gameId, game.sportType)}
                  className={rowClass}
                >
                  <span className="tnum text-t7 w-[68px] shrink-0 text-[var(--color-neutral-500)]">
                    {monthDay(game.startTime)} {timeOf(game.startTime)}
                  </span>
                  <span aria-hidden className="h-5 w-px shrink-0 bg-[var(--color-greyscale-50)]" />
                  <span className="text-t6 min-w-0 flex-1 truncate">{matchup(game)}</span>
                  <SportIcon sportType={game.sportType} size={12} colored />
                </Link>
              ))}
            </Panel>
            {stale.length > 0 && (
              <Panel
                title="지난 예정 경기"
                count={stale.length}
                note="시작 시각이 지났는데 아직 예정 상태예요. 종료 처리하거나 일정을 고쳐 주세요."
              >
                {stale.map((game) => (
                  <Link
                    key={game.gameId}
                    href={routes.game(game.leagueId, game.gameId, game.sportType)}
                    className={rowClass}
                  >
                    <span className="tnum text-t7 w-10 shrink-0 text-[var(--color-neutral-400)]">
                      {monthDay(game.startTime)}
                    </span>
                    <span className="text-t6 min-w-0 flex-1 truncate font-medium">
                      {matchup(game)}
                    </span>
                    <span className="text-t7 shrink-0 truncate text-[var(--color-neutral-400)]">
                      {game.leagueName}
                    </span>
                  </Link>
                ))}
              </Panel>
            )}
          </div>

          <div className="flex min-w-0 flex-col gap-5">
            <Panel
              title="신고된 응원톡"
              count={reported.length}
              href={routes.cheertalks}
              empty="신고된 응원톡이 없어요."
            >
              {reported.slice(0, 8).map((talk) => (
                <Link
                  key={talk.cheerTalkId}
                  href={routes.leagueCheertalks(talk.leagueId)}
                  className={rowClass}
                >
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-t6 truncate">{talk.content}</span>
                    <span className="text-t8 truncate text-[var(--color-neutral-400)]">
                      {talk.gameName}
                    </span>
                  </span>
                </Link>
              ))}
            </Panel>
            <Panel
              title="내 대회"
              count={leagues.length}
              href={routes.leagues}
              empty="운영 중인 대회가 없어요."
            >
              {sortedLeagues.map((league) => (
                <Link
                  key={league.leagueId}
                  href={routes.league(league.leagueId)}
                  className={rowClass}
                >
                  <SportIcon sportType={league.sportType} size={13} colored />
                  <span className="text-t6 min-w-0 flex-1 truncate font-medium">{league.name}</span>
                  <span className="tnum text-t7 shrink-0 text-[var(--color-neutral-400)]">
                    {league.leagueTeamCount}팀
                  </span>
                  {isLeagueRunning(league) ? <LiveBadge /> : <Badge>{league.leagueProgress}</Badge>}
                </Link>
              ))}
            </Panel>
          </div>
        </div>
      </div>
    </>
  );
};
