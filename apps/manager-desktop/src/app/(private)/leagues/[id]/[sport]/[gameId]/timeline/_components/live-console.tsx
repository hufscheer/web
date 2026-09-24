'use client';

import type { ProgressAvailableAction, QuarterScoreType } from '@hcc/manager-api';

import { useQueryClient } from '@hcc/api-base';
import { queryKeys, useDeleteTimeline } from '@hcc/manager-api';
import { useCallback, useMemo, useState } from 'react';

import type { Game, Lineup, LineupPlayer, TimelineRecord } from '~/types';

import { ConfirmDialog } from '~/components/ui/confirm-dialog';
import { Toasts, useToasts } from '~/components/ui/toast';
import { parseHTTPError } from '~/utils/http-error';

import { LineupPanel } from './lineup-panel';
import { RecordPanel } from './record-panel';
import { Scoreboard } from './scoreboard';
import { TimelineList } from './timeline-list';

type Props = {
  game: Game;
  serverLineups: [Lineup, Lineup];
  serverRecords: TimelineRecord[];
  progressActions: ProgressAvailableAction[];
  quarterScores: QuarterScoreType[];
};

const isScoreRecord = (record: TimelineRecord) =>
  record.type === 'SCORE' || record.type === 'OWN_GOAL';

const creditedTeamId = (record: TimelineRecord, homeTeamId: number, awayTeamId: number) => {
  if (record.type !== 'OWN_GOAL') return record.gameTeamId;
  return record.gameTeamId === homeTeamId ? awayTeamId : homeTeamId;
};

/**
 * 기록은 최신순이라 배열 끝(가장 오래된 기록)부터 점수를 쌓는다.
 * 승부차기는 본 점수가 아니다(서버도 pkScore 를 따로 둔다).
 */
function recalcSnapshots(
  records: TimelineRecord[],
  homeTeamId: number,
  awayTeamId: number,
): TimelineRecord[] {
  let home = 0;
  let away = 0;
  const result = [...records];

  for (let i = records.length - 1; i >= 0; i--) {
    const record = records[i];

    if (!isScoreRecord(record)) {
      result[i] = record.snapshot === null ? record : { ...record, snapshot: null };
      continue;
    }

    const teamId = creditedTeamId(record, homeTeamId, awayTeamId);
    const value = record.scoreValue ?? 1;
    if (teamId === homeTeamId) home += value;
    else if (teamId === awayTeamId) away += value;

    result[i] = { ...record, snapshot: [home, away] as [number, number] };
  }

  return result;
}

/** 가장 최근 기록은 항상 지울 수 있다. 저장 중인 임시 기록(음수 id)은 진짜 id 를 몰라 제외한다 */
function applyDeletability(records: TimelineRecord[]): TimelineRecord[] {
  return records.map((record, index) =>
    index === 0 && record.recordId > 0
      ? { ...record, deletable: true, undeletableReason: null, undeletableReasonCode: null }
      : record,
  );
}

const updatePlayers = (
  lineups: [Lineup, Lineup],
  teamIndex: 0 | 1,
  update: (player: LineupPlayer) => LineupPlayer,
): [Lineup, Lineup] => {
  const next = [...lineups] as [Lineup, Lineup];
  const target = next[teamIndex];
  next[teamIndex] = {
    ...target,
    starterPlayers: target.starterPlayers.map(update),
    candidatePlayers: target.candidatePlayers.map(update),
  };
  return next;
};

export const LiveConsole = ({
  game,
  serverLineups,
  serverRecords,
  progressActions,
  quarterScores,
}: Props) => {
  const qc = useQueryClient();
  const [homeTeam, awayTeam] = game.gameTeams;
  const { toasts, push, pushError } = useToasts();
  const { mutateAsync: removeTimeline } = useDeleteTimeline({ gameId: game.gameId });

  // 저장 중에만 화면에 먼저 덧씌운다. 저장이 끝나면 걷어내고 서버 값을 그린다
  const [optimisticRecords, setOptimisticRecords] = useState<TimelineRecord[]>([]);
  const [optimisticLineups, setOptimisticLineups] = useState<[Lineup, Lineup] | null>(null);
  const [pendingDelete, setPendingDelete] = useState<TimelineRecord | null>(null);
  const [deleting, setDeleting] = useState(false);
  const quarterLabel = game.gameQuarter.label;

  const records = useMemo(
    () =>
      applyDeletability(
        recalcSnapshots(
          [...optimisticRecords, ...serverRecords],
          homeTeam.gameTeamId,
          awayTeam.gameTeamId,
        ),
      ),
    [optimisticRecords, serverRecords, homeTeam.gameTeamId, awayTeam.gameTeamId],
  );
  const lineups = optimisticLineups ?? serverLineups;

  const score = useMemo(() => {
    let home = 0;
    let away = 0;
    for (const record of records) {
      if (!isScoreRecord(record)) continue;
      const teamId = creditedTeamId(record, homeTeam.gameTeamId, awayTeam.gameTeamId);
      const value = record.scoreValue ?? 1;
      if (teamId === homeTeam.gameTeamId) home += value;
      else if (teamId === awayTeam.gameTeamId) away += value;
    }
    return { home, away };
  }, [records, homeTeam.gameTeamId, awayTeam.gameTeamId]);

  /** 기록 훅들이 쿼터별 점수는 다시 받지 않는다. 실패했을 때는 콘솔 전체를 서버 값으로 되돌린다 */
  const refetchConsole = useCallback(
    (scope: 'scores' | 'all') => {
      const payload = { gameId: game.gameId };
      const keys =
        scope === 'scores'
          ? [queryKeys.games.quarterScores(payload).queryKey]
          : [
              queryKeys.games.detail(payload).queryKey,
              queryKeys.games.lineup(payload).queryKey,
              queryKeys.games.timeline(payload).queryKey,
              queryKeys.games.quarterScores(payload).queryKey,
              queryKeys.games.progressAvailable(payload).queryKey,
            ];
      return Promise.all(keys.map((queryKey) => qc.invalidateQueries({ queryKey })));
    },
    [qc, game.gameId],
  );

  const settle = useCallback(
    (saved: boolean) => {
      setOptimisticRecords([]);
      setOptimisticLineups(null);
      void refetchConsole(saved ? 'scores' : 'all');
    },
    [refetchConsole],
  );

  const addRecord = useCallback(
    (record: Omit<TimelineRecord, 'recordId' | 'recordedQuarter'>) => {
      setOptimisticRecords((prev) => [
        {
          ...record,
          recordId: Math.min(-1, ...prev.map((r) => r.recordId)) - 1,
          recordedQuarter: quarterLabel,
          deletable: false,
          undeletableReason: '저장 중이에요. 잠시 뒤에 지울 수 있어요.',
          undeletableReasonCode: null,
        },
        ...prev,
      ]);
    },
    [quarterLabel],
  );

  const requestDelete = useCallback(
    (record: TimelineRecord) => {
      if (!record.deletable) {
        push(record.undeletableReason ?? '삭제할 수 없는 기록이에요.');
        return;
      }
      setPendingDelete(record);
    },
    [push],
  );

  const deleteRecord = useCallback(
    async (record: TimelineRecord) => {
      setDeleting(true);
      try {
        await removeTimeline({ gameId: game.gameId, timelineId: record.recordId });
        push('기록을 삭제했어요');
        void refetchConsole('scores');
      } catch (error) {
        pushError(await parseHTTPError(error, '기록을 삭제하지 못했어요'));
        void refetchConsole('all');
      } finally {
        setDeleting(false);
        setPendingDelete(null);
      }
    },
    [removeTimeline, game.gameId, push, pushError, refetchConsole],
  );

  const substitute = useCallback(
    (teamIndex: 0 | 1, outId: number, inId: number) => {
      setOptimisticLineups((prev) =>
        updatePlayers(prev ?? serverLineups, teamIndex, (player) => {
          if (player.lineupPlayerId === outId) {
            return { ...player, isPlaying: false, isReplaced: true };
          }
          if (player.lineupPlayerId === inId) {
            return { ...player, isPlaying: true, isReplaced: true };
          }
          return player;
        }),
      );
    },
    [serverLineups],
  );

  const addFoul = useCallback(
    (teamIndex: 0 | 1, lineupPlayerId: number) => {
      setOptimisticLineups((prev) =>
        updatePlayers(prev ?? serverLineups, teamIndex, (player) =>
          player.lineupPlayerId === lineupPlayerId
            ? { ...player, foulCount: (player.foulCount ?? 0) + 1 }
            : player,
        ),
      );
    },
    [serverLineups],
  );

  return (
    <>
      <Scoreboard
        game={game}
        homeScore={score.home}
        awayScore={score.away}
        quarterLabel={quarterLabel}
        quarterScores={quarterScores}
      />

      <div className="xl:grid-cols-[340px_minmax(0,1fr)_360px] grid min-h-0 flex-1 grid-cols-[340px_minmax(0,1fr)] gap-5 p-5">
        <RecordPanel
          game={game}
          lineups={lineups}
          quarterLabel={quarterLabel}
          onAddRecord={addRecord}
          onSubstitute={substitute}
          onFoul={addFoul}
          progressActions={progressActions}
          onToast={push}
          onError={pushError}
          onSaved={settle}
        />

        <TimelineList game={game} records={records} onDelete={requestDelete} />

        <LineupPanel
          game={game}
          lineups={lineups}
          onToast={push}
          onError={pushError}
          className="xl:col-span-1 xl:max-h-none col-span-2 max-h-[420px]"
        />
      </div>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="이 기록을 지울까요?"
        description={
          pendingDelete
            ? `${pendingDelete.recordedQuarter} ${pendingDelete.recordedAt}' ${pendingDelete.title}\n되돌릴 수 없어요. 중간 기록이면 뒤 기록의 점수도 다시 계산돼요.`
            : undefined
        }
        pending={deleting}
        onConfirm={() => pendingDelete && void deleteRecord(pendingDelete)}
        onClose={() => !deleting && setPendingDelete(null)}
      />

      <Toasts items={toasts} />
    </>
  );
};
