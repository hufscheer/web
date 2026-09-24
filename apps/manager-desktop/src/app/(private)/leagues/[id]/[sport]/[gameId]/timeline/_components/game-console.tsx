'use client';

import type {
  GameLineupPlayingType,
  ProgressAvailableActionsResponse,
  QuarterScoreType,
  SportType,
} from '@hcc/manager-api';

import { useSuspenseQueries } from '@hcc/api-base';
import { queryKeys } from '@hcc/manager-api';
import { useMemo } from 'react';

import type { Lineup, LineupPlayer, Position } from '~/types';

import { toGame, toLineups, toTimeline } from '~/utils/convert';

import { LiveConsole } from './live-console';

// 여러 매니저가 같은 경기를 기록한다. 들어올 때마다 서버 값을 다시 받는다
const fresh = { staleTime: 0 };

const orFallback = async <T,>(load: () => T | Promise<T>, fallback: T) => {
  try {
    return await load();
  } catch {
    return fallback;
  }
};

/**
 * 전체 라인업 조회는 관객 기준으로 포지션을 가린다(선발 전원이 입력하기 전, 후보). 매니저가 방금
 * 저장한 값이 사라져 보이지 않도록, 출전 선수는 가림 없는 출전 선수 조회의 포지션을 쓴다.
 */
const withPlayingPositions = (lineups: [Lineup, Lineup], playing: GameLineupPlayingType[]) => {
  const positionOf = new Map(
    playing.flatMap((team) =>
      team.gameTeamPlayers.map((player) => [player.lineupPlayerId, player.position ?? null]),
    ),
  );
  const apply = (player: LineupPlayer): LineupPlayer =>
    positionOf.has(player.lineupPlayerId)
      ? { ...player, position: (positionOf.get(player.lineupPlayerId) ?? null) as Position | null }
      : player;

  return lineups.map((lineup) => ({
    ...lineup,
    // 가려지지 않은 값이 하나라도 있으면 서버가 이 팀의 포지션을 관객에게 내보내고 있다
    positionsPublic: lineup.starterPlayers.some((player) => player.position !== null),
    starterPlayers: lineup.starterPlayers.map(apply),
    candidatePlayers: lineup.candidatePlayers.map(apply),
  })) as [Lineup, Lineup];
};

export const GameConsole = ({ gameId, sportType }: { gameId: number; sportType: SportType }) => {
  const quarterScoresQuery = queryKeys.games.quarterScores({ gameId });
  const progressQuery = queryKeys.games.progressAvailable({ gameId });

  const [detail, lineup, playing, timeline, quarterScores, progress] = useSuspenseQueries({
    queries: [
      { ...queryKeys.games.detail({ gameId }), ...fresh },
      { ...queryKeys.games.lineup({ gameId }), ...fresh },
      { ...queryKeys.games.lineupPlaying({ gameId }), ...fresh },
      { ...queryKeys.games.timeline({ gameId }), ...fresh },
      // 쿼터별 점수·진행 후보는 곁다리다. 못 받아도 기록은 할 수 있어야 한다
      {
        ...quarterScoresQuery,
        ...fresh,
        queryFn: (context: Parameters<typeof quarterScoresQuery.queryFn>[0]) =>
          orFallback(() => quarterScoresQuery.queryFn(context), [] as QuarterScoreType[]),
      },
      {
        ...progressQuery,
        ...fresh,
        queryFn: (context: Parameters<typeof progressQuery.queryFn>[0]) =>
          orFallback<ProgressAvailableActionsResponse>(() => progressQuery.queryFn(context), {
            availableActions: [],
          }),
      },
    ],
  });

  const game = useMemo(() => toGame(detail.data, sportType), [detail.data, sportType]);
  const serverLineups = useMemo(
    () => withPlayingPositions(toLineups(lineup.data), playing.data),
    [lineup.data, playing.data],
  );
  const serverRecords = useMemo(() => toTimeline(timeline.data), [timeline.data]);

  return (
    <LiveConsole
      game={game}
      serverLineups={serverLineups}
      serverRecords={serverRecords}
      progressActions={progress.data.availableActions ?? []}
      quarterScores={quarterScores.data ?? []}
    />
  );
};
