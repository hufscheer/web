'use client';

import { useMemo, useState } from 'react';
import { Button, Input } from '@hcc/ui';
import { InputSelect } from '~/components/ui/input-select';
import { useSuspenseGameLineupPlaying } from '~/api/queries/useGameLineupPlaying';

type SelectOption = { label: string; value: string };

const QUARTERS = ['전반', '후반'] as const;
const quarterOptions: SelectOption[] = QUARTERS.map(q => ({
  label: q,
  value: q,
}));

export default function StatusChangeSheet({
  gameId,
  onClose,
}: {
  gameId: number;
  onClose: () => void;
}) {
  const { data: lineup } = useSuspenseGameLineupPlaying({ gameId: gameId });

  const allPlayers: any[] = useMemo(() => {
    if (!lineup) return [];
    return (
      (lineup as any).players ?? [
        ...((lineup as any).homePlayers ?? []),
        ...((lineup as any).awayPlayers ?? []),
      ]
    );
  }, [lineup]);

  // 팀 옵션 생성
  const teamOptions: SelectOption[] = useMemo(() => {
    if (!lineup) return [];

    if (Array.isArray((lineup as any).teams)) {
      return (lineup as any).teams
        .filter((t: any) => t && (t.name ?? t.teamName))
        .map((t: any) => ({
          label: t.name ?? t.teamName,
          value: String(t.id ?? t.teamId),
        }));
    }

    const out: SelectOption[] = [];
    const home = (lineup as any).homeTeam ?? (lineup as any).home;
    const away = (lineup as any).awayTeam ?? (lineup as any).away;
    if (home?.id || home?.teamId)
      out.push({
        label: home.name ?? home.teamName,
        value: String(home.id ?? home.teamId),
      });
    if (away?.id || away?.teamId)
      out.push({
        label: away.name ?? away.teamName,
        value: String(away.id ?? away.teamId),
      });
    if (out.length) return out;

    const byTeam = new Map<string, string>();
    for (const p of allPlayers) {
      const teamId = String(p.gameTeamId ?? p.teamId ?? '');
      if (!teamId) continue;
      if (!byTeam.has(teamId)) byTeam.set(teamId, p.teamName ?? `팀 ${teamId}`);
    }
    return Array.from(byTeam, ([value, label]) => ({ label, value }));
  }, [lineup, allPlayers]);

  const [quarter, setQuarter] = useState<string | undefined>(undefined);
  const [teamId, setTeamId] = useState<string | undefined>(undefined);
  const [playerId, setPlayerId] = useState<string | undefined>(undefined);
  const [minute, setMinute] = useState<string>('');

  // 선택된 팀에 따른 선수 옵션
  const playerOptions: SelectOption[] = useMemo(() => {
    if (!teamId) return [];
    const tid = Number(teamId);
    return allPlayers
      .filter(p => Number(p.gameTeamId ?? p.teamId) === tid)
      .map(p => {
        const num = p.backNumber ?? p.uniformNo ?? p.number;
        const name = p.playerName ?? p.name;
        return {
          label: num ? `${num} ${name}` : String(name),
          value: String(p.playerId ?? p.id),
        };
      });
  }, [allPlayers, teamId]);

  const submit = () => {
    // quarter, teamId, playerId, minute 로 제출
    // TODO: 유효성 검사 및 API 호출
    onClose();
  };

  return (
    <div className="flex h-full flex-col gap-4 bg-white p-5">
      <div className="font-medium text-base text-black">상황</div>

      <InputSelect
        label="쿼터"
        options={quarterOptions}
        value={quarter}
        onValueChange={setQuarter}
      />

      <InputSelect
        label="팀 명"
        options={teamOptions}
        value={teamId}
        onValueChange={v => {
          setTeamId(v);
          setPlayerId(undefined);
        }}
      />

      <div className="font-medium text-base text-black">득점 상세 정보</div>

      <InputSelect
        label="선수"
        options={playerOptions}
        value={playerId}
        onValueChange={setPlayerId}
        disabled={!teamId || playerOptions.length === 0}
      />

      <Input
        placeholder="시간(분)"
        type="number"
        value={minute}
        onChange={e => setMinute(e.target.value)}
        min={0}
      />

      <Button color="black" size="lg" onClick={submit}>
        타임라인 등록
      </Button>
    </div>
  );
}
