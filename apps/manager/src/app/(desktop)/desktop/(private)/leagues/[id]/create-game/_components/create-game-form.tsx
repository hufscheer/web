'use client';

import { useQueryClient } from '@hcc/api-base';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import type { LeagueTeamType } from '~/api';
import type { League, TeamPlayerRow } from '~/app/(desktop)/_types';

import { queryKeys, useCreateGames } from '~/api';
import { Button } from '~/app/(desktop)/_components/ui/button';
import { DateTimeInput } from '~/app/(desktop)/_components/ui/date-time-input';
import {
  ErrorText,
  Field,
  FormCard,
  SelectInput,
  TextInput,
} from '~/app/(desktop)/_components/ui/field';
import { Toasts, useToasts } from '~/app/(desktop)/_components/ui/toast';
import { routes } from '~/app/(desktop)/_constants/routes';
import { roundLabel, roundsUpTo } from '~/app/(desktop)/_constants/sports';
import { toTeamPlayerRows } from '~/app/(desktop)/_utils/convert';
import { TEAM_COLORS } from '~/app/(desktop)/_utils/team-color';
import { getStarterLimit } from '~/constants/leagues';
import { parseHTTPError } from '~/utils/http-error';

import { LineupPanel, type LineupEntry } from './lineup-panel';

type Side = 0 | 1;

export type GamePrefill = { round: number; teamIds: number[]; thirdPlace: boolean };

export const CreateGameForm = ({
  league,
  leagueTeams,
  prefill,
}: {
  league: League;
  leagueTeams: LeagueTeamType[];
  prefill?: GamePrefill;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toasts, push, pushError } = useToasts();
  const { mutateAsync: createGame } = useCreateGames();

  const rounds = roundsUpTo(league.maxRound);
  // 대진표가 알려 준 라운드가 이 대회에 없는 값이면 무시한다
  const presetRound = prefill && rounds.includes(prefill.round) ? prefill.round : rounds[0];

  const [name, setName] = useState('');
  const [round, setRound] = useState(presetRound);
  const [thirdPlace, setThirdPlace] = useState(prefill?.thirdPlace ?? false);
  const [startTime, setStartTime] = useState('');
  const [videoId, setVideoId] = useState('');
  const [teamIds, setTeamIds] = useState<[number | '', number | '']>([
    prefill?.teamIds[0] ?? '',
    prefill?.teamIds[1] ?? '',
  ]);
  const [lineups, setLineups] = useState<[LineupEntry[], LineupEntry[]]>([[], []]);
  const [loadingSide, setLoadingSide] = useState<Side | null>(null);
  const [failedSides, setFailedSides] = useState<[boolean, boolean]>([false, false]);
  // 지금 고른 팀. 늦게 온 응답이 현재 선택과 다르면 버리기 위한 값이다 (updater 안에서 상태를 건드리지 않으려고 ref 로 둔다)
  const pickedRef = useRef<[number | '', number | '']>([
    prefill?.teamIds[0] ?? '',
    prefill?.teamIds[1] ?? '',
  ]);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const canBeThirdPlace = league.thirdPlaceMatchEnabled && round === 2;
  const starterLimit = getStarterLimit(league.sportType);

  const fetchRoster = async (
    teamId: number,
  ): Promise<{ rows: TeamPlayerRow[]; failed: boolean }> => {
    try {
      return {
        rows: toTeamPlayerRows(
          await queryClient.fetchQuery(queryKeys.teams.teamplayers({ id: teamId })),
        ),
        failed: false,
      };
    } catch {
      return { rows: [], failed: true };
    }
  };

  const loadRoster = async (side: Side, teamId: number) => {
    try {
      setLoadingSide(side);
      setFailedSides((prev) => (side === 0 ? [false, prev[1]] : [prev[0], false]));
      const { rows, failed } = await fetchRoster(teamId);
      // 등번호 순으로 앞쪽을 선발로 채워 둔다. 매니저는 바꿀 것만 누른다
      const entries: LineupEntry[] = rows
        .map((row) => ({
          teamPlayerId: row.teamPlayerId,
          playerId: row.playerId,
          playerName: row.name,
          jerseyNumber: row.jerseyNumber ?? 0,
          state: 'CANDIDATE' as const,
          isCaptain: false,
          position: null,
        }))
        .sort((a, b) => a.jerseyNumber - b.jerseyNumber)
        .map((entry, index) => ({
          ...entry,
          state: index < starterLimit ? ('STARTER' as const) : ('CANDIDATE' as const),
        }));

      // 팀을 빠르게 바꾸면 먼저 보낸 응답이 나중에 올 수 있다. 지금 고른 팀의 것만 반영한다
      if (pickedRef.current[side] === teamId) {
        setLineups((prev) => (side === 0 ? [entries, prev[1]] : [prev[0], entries]));
        setFailedSides((prev) => (side === 0 ? [failed, prev[1]] : [prev[0], failed]));
      }
    } finally {
      // 늦게 도착한 이전 팀의 응답이 새 팀의 로딩 표시를 끄지 않게 한다
      if (pickedRef.current[side] === teamId) {
        setLoadingSide((current) => (current === side ? null : current));
      }
    }
  };

  const pickTeam = (side: Side, value: string) => {
    const teamId = value ? Number(value) : '';
    pickedRef.current =
      side === 0 ? [teamId, pickedRef.current[1]] : [pickedRef.current[0], teamId];
    setFailedSides((prev) => (side === 0 ? [false, prev[1]] : [prev[0], false]));
    setTeamIds((prev) => (side === 0 ? [teamId, prev[1]] : [prev[0], teamId]));
    setLineups((prev) => (side === 0 ? [[], prev[1]] : [prev[0], []]));
    if (teamId) void loadRoster(side, teamId);
    // 선택을 비우면 진행 중이던 응답은 버려지므로 로딩 표시도 여기서 끈다
    else setLoadingSide((current) => (current === side ? null : current));
  };

  // 대진표에서 받은 두 팀은 명단까지 채운다. 주소에서 온 값이라 화면이 사는 동안 바뀌지 않는다
  useEffect(() => {
    prefill?.teamIds.forEach((teamId, index) => void loadRoster(index as Side, teamId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const teamName = (side: Side) =>
    leagueTeams.find((t) => t.teamId === teamIds[side])?.teamName ?? '팀 미선택';

  const bothPicked = teamIds[0] !== '' && teamIds[1] !== '' && teamIds[0] !== teamIds[1];
  const overCap = lineups.some(
    (side) => side.filter((p) => p.state === 'STARTER').length > starterLimit,
  );
  const invalid = !startTime || !bothPicked || overCap;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (pending || invalid) return;

    setPending(true);
    setError(null);
    try {
      const side = (index: Side) => {
        const teamId = Number(teamIds[index]);
        return {
          teamId,
          leagueTeamId: leagueTeams.find((team) => team.teamId === teamId)?.leagueTeamId ?? 0,
          // 생성 화면의 선수는 전부 명단에서 온 것이라 teamPlayerId 가 항상 있다
          lineupPlayers: lineups[index].flatMap((p) =>
            p.teamPlayerId === null
              ? []
              : [
                  {
                    teamPlayerId: p.teamPlayerId,
                    state: p.state,
                    isCaptain: p.isCaptain,
                    position: p.position,
                  },
                ],
          ),
        };
      };

      await createGame({
        leagueId: league.leagueId,
        name: name.trim(),
        round,
        quarter: 'PRE_GAME',
        state: 'SCHEDULED',
        thirdPlaceMatch: canBeThirdPlace && thirdPlace,
        startTime: `${startTime}:00`,
        videoId: videoId.trim(),
        team1: side(0),
        team2: side(1),
      });

      push('경기가 생성되었어요');
      router.push(routes.league(league.leagueId));
    } catch (e) {
      setError(await parseHTTPError(e, '경기를 생성하지 못했어요.'));
      setPending(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex max-w-[1260px] flex-col gap-5">
      <div className="flex flex-wrap items-start gap-6">
        <FormCard title="경기 정보" className="w-[520px] shrink-0">
          <Field label="경기명">
            <TextInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예) 4강 1경기"
            />
          </Field>

          <Field label="라운드">
            <div className="flex flex-col gap-2">
              <SelectInput
                value={round}
                onChange={(e) => {
                  setRound(Number(e.target.value));
                  setThirdPlace(false);
                }}
              >
                {rounds.map((r) => (
                  <option key={r} value={r}>
                    {roundLabel(r)}
                  </option>
                ))}
              </SelectInput>

              {canBeThirdPlace && (
                <label className="flex w-fit cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={thirdPlace}
                    onChange={(e) => setThirdPlace(e.target.checked)}
                    className="size-4.5"
                  />
                  <span className="text-t6">3·4위전</span>
                </label>
              )}
            </div>
          </Field>

          <Field label="시작 일시">
            <DateTimeInput value={startTime} onChange={setStartTime} required />
          </Field>

          <Field label="경기 영상" hint="유튜브 영상 ID만 넣어 주세요.">
            <TextInput
              value={videoId}
              onChange={(e) => setVideoId(e.target.value)}
              placeholder="예) dQw4w9WgXcQ"
            />
          </Field>

          {([0, 1] as Side[]).map((side) => (
            <Field key={side} label={side === 0 ? '팀 선택 1' : '팀 선택 2'}>
              <SelectInput
                value={teamIds[side]}
                onChange={(e) => pickTeam(side, e.target.value)}
                required
              >
                <option value="">참가 팀을 선택하세요</option>
                {leagueTeams
                  .filter((team) => team.teamId !== teamIds[side === 0 ? 1 : 0])
                  .map((team) => (
                    <option key={team.teamId} value={team.teamId}>
                      {team.teamName}
                    </option>
                  ))}
              </SelectInput>
              {loadingSide === side && (
                <span className="text-t7 text-[var(--color-neutral-400)]">명단 불러오는 중…</span>
              )}
            </Field>
          ))}
        </FormCard>

        <div className="flex min-w-0 flex-1 gap-4">
          {([0, 1] as Side[]).map((side) => (
            <LineupPanel
              key={side}
              sportType={league.sportType}
              teamName={teamName(side)}
              teamColor={TEAM_COLORS[side]}
              lineup={lineups[side]}
              picked={teamIds[side] !== ''}
              loading={loadingSide === side}
              failed={failedSides[side]}
              starterLimit={starterLimit}
              onLimit={() => pushError('선발 인원이 모두 찼어요')}
              onChange={(updated) =>
                setLineups((prev) => (side === 0 ? [updated, prev[1]] : [prev[0], updated]))
              }
            />
          ))}
        </div>
      </div>

      <ErrorText>{error}</ErrorText>

      <div className="flex items-center justify-end gap-2">
        {invalid && !pending && (
          <p className="text-t7 mr-auto text-[var(--color-neutral-400)]">
            {!startTime && !bothPicked
              ? '시작 일시와 두 팀을 골라 주세요'
              : !startTime
                ? '시작 일시를 골라 주세요'
                : '두 팀을 골라 주세요'}
          </p>
        )}
        <Button size="md" color="black" variant="outline" onClick={() => router.back()}>
          취소
        </Button>
        <Button type="submit" size="md" disabled={pending || invalid}>
          {pending ? '생성 중…' : '경기 생성'}
        </Button>
      </div>

      <Toasts items={toasts} />
    </form>
  );
};
