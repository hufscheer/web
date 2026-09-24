'use client';

import type { LeagueStatisticsTeamType } from '@hcc/manager-api';

import { useQueries } from '@hcc/api-base';
import { queryKeys } from '@hcc/manager-api';

const TeamCell = ({
  label,
  team,
  extra,
}: {
  label: string;
  team: LeagueStatisticsTeamType | null;
  extra?: string;
}) => (
  <div className="flex min-w-0 flex-col justify-center gap-1 px-3 py-2.5">
    <span className="eyebrow">{label}</span>
    {team ? (
      <span className="flex min-w-0 items-center gap-1.5">
        {team.logoImageUrl ? (
          <img
            src={team.logoImageUrl}
            alt=""
            className="size-4 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="size-4 shrink-0 rounded-full bg-[var(--color-neutral-200)]" />
        )}
        <span className="text-t6 truncate font-medium">{team.teamName}</span>
        {extra && (
          <span className="tnum text-t7 shrink-0 text-[var(--color-neutral-400)]">{extra}</span>
        )}
      </span>
    ) : (
      <span className="text-t6 text-[var(--color-neutral-300)]">—</span>
    )}
  </div>
);

/**
 * 대회의 곁다리 정보라 하나가 실패해도 나머지는 그리고, 모두 비면 구획째 감춘다.
 * 통계는 결승이 끝나야 채워진다.
 */
export const LeagueStatisticsPanel = ({ leagueId }: { leagueId: number }) => {
  const [statisticsQuery, topScorersQuery, cheerCountQuery] = useQueries({
    queries: [
      queryKeys.leagues.statistics({ leagueId }),
      queryKeys.leagues.topScorers({ leagueId }),
      queryKeys.leagues.cheerCount({ leagueId }),
    ],
  });

  const statistics = statisticsQuery.data ?? null;
  const topScorers = topScorersQuery.data ?? [];
  const cheerTalkCount = cheerCountQuery.data?.cheerTalkCount ?? null;

  const teams = statistics
    ? [
        statistics.firstWinnerTeam,
        statistics.secondWinnerTeam,
        statistics.mostCheeredTeam,
        statistics.mostCheerTalksTeam,
      ]
    : [];
  const hasAny = teams.some(Boolean) || topScorers.length > 0;
  if (!hasAny) return null;

  return (
    <section className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)]">
        <header className="flex h-11 items-center justify-between border-b border-[var(--color-greyscale-50)] px-4">
          <h2 className="text-t6 font-semibold text-[var(--color-neutral-900)]">대회 통계</h2>
          {cheerTalkCount !== null && (
            <span className="tnum text-t7 text-[var(--color-neutral-400)]">
              응원톡 {cheerTalkCount.toLocaleString()}건
            </span>
          )}
        </header>
        <div className="grid flex-1 grid-cols-2 divide-x divide-y divide-[var(--color-hairline)]">
          <TeamCell label="우승" team={statistics?.firstWinnerTeam ?? null} />
          <TeamCell label="준우승" team={statistics?.secondWinnerTeam ?? null} />
          <TeamCell
            label="최다 응원"
            team={statistics?.mostCheeredTeam ?? null}
            extra={
              statistics?.mostCheeredTeam?.cheerCount !== undefined
                ? `${statistics.mostCheeredTeam.cheerCount.toLocaleString()}회`
                : undefined
            }
          />
          <TeamCell
            label="최다 응원톡"
            team={statistics?.mostCheerTalksTeam ?? null}
            extra={
              statistics?.mostCheerTalksTeam?.cheerTalksCount !== undefined
                ? `${statistics.mostCheerTalksTeam.cheerTalksCount.toLocaleString()}건`
                : undefined
            }
          />
        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)]">
        <header className="flex h-11 shrink-0 items-center justify-between border-b border-[var(--color-greyscale-50)] px-4">
          <h2 className="text-t6 font-semibold text-[var(--color-neutral-900)]">득점 순위</h2>
          <span className="text-t8 text-[var(--color-neutral-400)]">자책골 제외</span>
        </header>
        {topScorers.length === 0 ? (
          <p className="text-t7 flex flex-1 items-center justify-center px-3 py-6 text-center text-[var(--color-neutral-400)]">
            결승이 끝나면 집계돼요.
          </p>
        ) : (
          topScorers.slice(0, 5).map((scorer) => (
            <div
              key={scorer.playerId}
              className="flex h-11 items-center gap-3 border-b border-[var(--color-hairline)] px-4 last:border-b-0"
            >
              <span className="tnum text-t7 w-4 shrink-0 font-semibold text-[var(--color-neutral-400)]">
                {scorer.ranking}
              </span>
              <span className="text-t6 min-w-0 flex-1 truncate font-medium">
                {scorer.playerName}
              </span>
              <span className="text-t8 shrink-0 text-[var(--color-neutral-400)]">
                {scorer.admissionYear}학번
              </span>
              <span className="tnum text-t6 shrink-0 font-semibold">{scorer.goalCount}골</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
