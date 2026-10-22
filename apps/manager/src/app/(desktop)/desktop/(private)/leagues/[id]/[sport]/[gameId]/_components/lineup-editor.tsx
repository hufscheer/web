'use client';

import { useQueryClient } from '@hcc/api-base';
import { useEffect, useMemo, useRef, useState } from 'react';

import type { GameLineupType } from '~/api';
import type { Game, Lineup, TeamPlayerRow } from '~/desktop/types';

import {
  queryKeys,
  useCreateGameTeamsLineup,
  useDeleteGameTeamsLineup,
  useUpdateGamesCandidate,
  useUpdateGamesCaptainRegister,
  useUpdateGamesCaptainRevoke,
  useUpdateGamesStarter,
} from '~/api';
import { Button } from '~/desktop/components/ui/button';
import { ErrorText } from '~/desktop/components/ui/field';
import { Toasts, useToasts } from '~/desktop/components/ui/toast';
import { STARTER_LIMIT } from '~/desktop/constants/sports';
import { toLineups, toTeamPlayerRows } from '~/desktop/utils/convert';
import { parseHTTPError } from '~/desktop/utils/http-error';
import { TEAM_COLORS } from '~/desktop/utils/team-color';

import { LineupPanel, type LineupEntry } from '../../../create-game/_components/lineup-panel';
import { isEmptyPlan, planTeam, type TeamPlan } from './lineup-plan';

type Side = 0 | 1;
type Rosters = [TeamPlayerRow[] | null, TeamPlayerRow[] | null];

const byJersey = (a: LineupEntry, b: LineupEntry) => a.jerseyNumber - b.jerseyNumber;

/** 서버의 라인업을 화면 항목으로 바꾼다 */
const fromServer = (lineup: Lineup | undefined): LineupEntry[] =>
  [...(lineup?.starterPlayers ?? []), ...(lineup?.candidatePlayers ?? [])]
    .map((p) => ({
      teamPlayerId: null,
      lineupPlayerId: p.lineupPlayerId,
      excluded: false,
      playerId: p.playerId,
      playerName: p.playerName,
      jerseyNumber: p.jerseyNumber,
      state: p.state,
      isCaptain: p.isCaptain,
    }))
    .sort(byJersey);

/** 팀 명단을 합친다. 명단에만 있는 선수는 미등록으로 붙고, 이미 등록된 선수는 teamPlayerId 만 채운다 */
const withRoster = (entries: LineupEntry[], rows: TeamPlayerRow[]): LineupEntry[] => {
  const byPlayer = new Map(rows.map((r) => [r.playerId, r]));
  const known = new Set(entries.map((e) => e.playerId));
  const merged = entries.map((e) => ({
    ...e,
    teamPlayerId: byPlayer.get(e.playerId)?.teamPlayerId ?? e.teamPlayerId,
  }));
  const rest = rows
    .filter((r) => !known.has(r.playerId))
    .map<LineupEntry>((r) => ({
      teamPlayerId: r.teamPlayerId,
      excluded: true,
      playerId: r.playerId,
      playerName: r.name,
      jerseyNumber: r.jerseyNumber ?? 0,
      state: 'CANDIDATE',
      isCaptain: false,
    }));
  return [...merged, ...rest].sort(byJersey);
};

const build = (data: GameLineupType[] | undefined, game: Game, rosters: Rosters) => {
  const lineups = toLineups(data);
  return ([0, 1] as Side[]).map((side) => {
    const lineup = lineups.find((l) => l.gameTeamId === game.gameTeams[side].gameTeamId);
    const base = fromServer(lineup);
    const rows = rosters[side];
    return rows ? withRoster(base, rows) : base;
  }) as [LineupEntry[], LineupEntry[]];
};

type Api = {
  addLineup: (v: {
    gameTeamId: number;
    teamPlayerId: number;
    state: 'STARTER' | 'CANDIDATE';
    isCaptain: boolean;
  }) => Promise<number>;
  removeLineup: (v: { gameTeamId: number; lineupPlayerId: number }) => Promise<unknown>;
  toStarter: (v: { gameId: number; lineupPlayerId: number }) => Promise<unknown>;
  toCandidate: (v: { gameId: number; lineupPlayerId: number }) => Promise<unknown>;
  registerCaptain: (v: { gameId: number; lineupPlayerId: number }) => Promise<unknown>;
  revokeCaptain: (v: { gameId: number; lineupPlayerId: number }) => Promise<unknown>;
};

/** 한 팀의 계획을 순서대로 실행한다. 첫 실패에서 멈춘다 */
const runPlan = async (
  api: Api,
  gameId: number,
  gameTeamId: number,
  original: LineupEntry[],
  plan: TeamPlan,
) => {
  const ids = new Map<number, number>();
  for (const p of original)
    if (p.lineupPlayerId !== undefined) ids.set(p.playerId, p.lineupPlayerId);

  for (const r of plan.removes)
    await api.removeLineup({ gameTeamId, lineupPlayerId: r.lineupPlayerId });
  for (const d of plan.demotes) await api.toCandidate({ gameId, lineupPlayerId: d.lineupPlayerId });
  for (const p of plan.promotes) await api.toStarter({ gameId, lineupPlayerId: p.lineupPlayerId });
  for (const a of plan.adds) {
    const id = await api.addLineup({
      gameTeamId,
      teamPlayerId: a.teamPlayerId,
      state: a.state,
      isCaptain: false,
    });
    ids.set(a.playerId, id);
  }

  if (plan.captain?.action === 'revoke') {
    await api.revokeCaptain({ gameId, lineupPlayerId: plan.captain.lineupPlayerId });
  } else if (plan.captain?.action === 'register') {
    const id = ids.get(plan.captain.playerId);
    if (typeof id !== 'number') throw new Error('주장으로 지정할 선수를 찾지 못했어요.');
    await api.registerCaptain({ gameId, lineupPlayerId: id });
  }
};

type Props = {
  game: Game;
  lineups: GameLineupType[];
};

export const LineupEditor = ({ game, lineups }: Props) => {
  const queryClient = useQueryClient();
  const { toasts, push, pushError } = useToasts();
  const { mutateAsync: addLineup } = useCreateGameTeamsLineup();
  const { mutateAsync: removeLineup } = useDeleteGameTeamsLineup();
  const { mutateAsync: toStarter } = useUpdateGamesStarter();
  const { mutateAsync: toCandidate } = useUpdateGamesCandidate();
  const { mutateAsync: registerCaptain } = useUpdateGamesCaptainRegister();
  const { mutateAsync: revokeCaptain } = useUpdateGamesCaptainRevoke();

  const starterLimit = STARTER_LIMIT[game.sportType];

  const [rosters, setRosters] = useState<Rosters>([null, null]);
  const [failed, setFailed] = useState<[boolean, boolean]>([false, false]);
  const [edited, setEdited] = useState(() => build(lineups, game, [null, null]));
  const [seen, setSeen] = useState(lineups);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // 저장 중에는 각 요청이 라인업 쿼리를 새로 불러와 데이터가 계속 바뀐다. 끝난 뒤에 한 번만 다시 시작한다
  const pendingRef = useRef(false);

  // 서버 데이터가 새로 오면 편집 중이던 내용을 버리고 그 상태로 다시 시작한다
  if (seen !== lineups && !pendingRef.current) {
    setSeen(lineups);
    setEdited(build(lineups, game, rosters));
  }

  // 서버에 있는 상태. 비교 기준이라 명단이 없어도 된다
  const original = useMemo(() => build(lineups, game, [null, null]), [lineups, game]);

  useEffect(() => {
    let cancelled = false;
    ([0, 1] as Side[]).forEach(async (side) => {
      const teamId = game.gameTeams[side].teamId;
      let rows: TeamPlayerRow[] = [];
      let didFail = false;
      if (teamId !== null) {
        try {
          rows = toTeamPlayerRows(
            await queryClient.fetchQuery(queryKeys.teams.teamplayers({ id: teamId })),
          );
        } catch {
          didFail = true;
        }
      }
      if (cancelled) return;
      setRosters((prev) => (side === 0 ? [rows, prev[1]] : [prev[0], rows]));
      setFailed((prev) => (side === 0 ? [didFail, prev[1]] : [prev[0], didFail]));
      setEdited((prev) => {
        const next = [...prev] as [LineupEntry[], LineupEntry[]];
        next[side] = withRoster(prev[side], rows);
        return next;
      });
    });
    return () => {
      cancelled = true;
    };
    // 명단은 화면이 열릴 때 한 번만 읽는다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const plans = useMemo(
    () => [planTeam(original[0], edited[0]), planTeam(original[1], edited[1])] as const,
    [original, edited],
  );
  const changed = !isEmptyPlan(plans[0]) || !isEmptyPlan(plans[1]);
  const overCap = edited.some(
    (side) => side.filter((p) => !p.excluded && p.state === 'STARTER').length > starterLimit,
  );

  const save = async () => {
    if (pending || !changed || overCap) return;
    pendingRef.current = true;
    setPending(true);
    setError(null);
    const api: Api = {
      addLineup,
      removeLineup,
      toStarter,
      toCandidate,
      registerCaptain,
      revokeCaptain,
    };
    try {
      for (const side of [0, 1] as Side[]) {
        await runPlan(
          api,
          game.gameId,
          game.gameTeams[side].gameTeamId,
          original[side],
          plans[side],
        );
      }
      push('라인업을 저장했어요');
    } catch (e) {
      const message = await parseHTTPError(
        e,
        e instanceof Error && e.message ? e.message : '라인업을 저장하지 못했어요.',
      );
      pushError(message);
      setError(
        `${message} 라인업이 일부만 저장됐을 수 있어요. 화면을 서버 상태로 다시 불러왔어요.`,
      );
    } finally {
      // 성공이든 실패든 서버 상태를 다시 읽어 편집 화면을 그 상태로 다시 시작한다
      try {
        const fresh = await queryClient.fetchQuery({
          ...queryKeys.games.lineup({ gameId: game.gameId }),
          staleTime: 0,
        });
        setSeen(fresh);
        setEdited(build(fresh, game, rosters));
      } catch {
        setError('라인업을 다시 불러오지 못했어요. 화면을 새로고침해 주세요.');
      }
      pendingRef.current = false;
      setPending(false);
    }
  };

  return (
    <section id="lineup" className="mt-8 flex max-w-[1180px] scroll-mt-6 flex-col gap-4">
      <h2 className="text-t5 font-bold">라인업</h2>

      {game.state !== 'SCHEDULED' && (
        <p className="text-t6 text-[var(--color-neutral-500)]">
          경기 중이나 경기 뒤의 변경은 경기 진행의 선수 교체로 하는 편이 좋아요.
        </p>
      )}

      <div className="flex gap-4">
        {([0, 1] as Side[]).map((side) => (
          <LineupPanel
            key={game.gameTeams[side].gameTeamId}
            teamName={game.gameTeams[side].gameTeamName}
            teamColor={game.gameTeams[side].teamColor || TEAM_COLORS[side]}
            lineup={edited[side]}
            picked
            loading={rosters[side] === null}
            failed={failed[side]}
            starterLimit={starterLimit}
            allowExclude
            onLimit={() => pushError('선발 인원이 모두 찼어요')}
            onChange={(updated) =>
              setEdited((prev) => (side === 0 ? [updated, prev[1]] : [prev[0], updated]))
            }
          />
        ))}
      </div>

      <ErrorText>{error}</ErrorText>

      <div className="flex justify-end">
        <Button
          size="md"
          color="black"
          variant="outline"
          disabled={pending || !changed || overCap}
          onClick={save}
        >
          {pending ? '저장 중…' : '라인업 저장'}
        </Button>
      </div>

      <Toasts items={toasts} />
    </section>
  );
};
