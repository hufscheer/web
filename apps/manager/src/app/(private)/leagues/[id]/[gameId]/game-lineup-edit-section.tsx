'use client';

import { Button, Input, Spinner, toast } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import { useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import {
  useCreateGameTeamsLineup,
  useDeleteGameTeamsLineup,
  useUpdateGamesCandidate,
  useUpdateGamesCaptainRegister,
  useUpdateGamesCaptainRevoke,
  useUpdateGamesStarter,
  useSuspenseGame,
  useSuspenseGameLineup,
  useSuspenseLeagueTeams,
  useSuspenseLeagueTeamsPlayers,
  type GameLineupType,
  type LeagueTeamsPlayerType,
} from '~/api';

type PlayerSelectionState = {
  teamPlayerId: number;
  lineupPlayerId?: number;
  state: 'STARTER' | 'CANDIDATE';
  isCaptain: boolean;
};

type Props = {
  gameId: number;
  leagueId: number;
  onNext: () => void;
  onPrevious: () => void;
};

const initializeSelection = (
  lineupData: GameLineupType | undefined,
  playerByPlayerId: Map<number, LeagueTeamsPlayerType>,
): PlayerSelectionState[] => {
  if (!lineupData) return [];
  const allPlayers = [...lineupData.starterPlayers, ...lineupData.candidatePlayers];
  return allPlayers.flatMap((lp) => {
    const teamPlayer = playerByPlayerId.get(lp.playerId);
    if (!teamPlayer) return [];
    return [
      {
        teamPlayerId: teamPlayer.teamPlayerId,
        lineupPlayerId: lp.lineupPlayerId,
        state: lp.state,
        isCaptain: lp.isCaptain,
      },
    ];
  });
};

const LineupEditContent = ({ gameId, leagueId, onNext, onPrevious }: Props) => {
  const { data: game } = useSuspenseGame({ gameId });
  const { data: lineup } = useSuspenseGameLineup({ gameId });
  const { data: leagueTeams } = useSuspenseLeagueTeams({ leagueId });

  const gameTeam1 = game.gameTeams?.[0];
  const gameTeam2 = game.gameTeams?.[1];

  // gameTeamId로 lineup 매칭 (가장 신뢰할 수 있는 방법)
  const lineup1 = lineup.find((l) => l.gameTeamId === gameTeam1?.gameTeamId);
  const lineup2 = lineup.find((l) => l.gameTeamId === gameTeam2?.gameTeamId);

  // lineup의 teamName을 우선 사용, 없으면 gameTeamName으로 fallback
  const team1Name = lineup1?.teamName ?? gameTeam1?.gameTeamName ?? '';
  const team2Name = lineup2?.teamName ?? gameTeam2?.gameTeamName ?? '';

  const leagueTeam1 = leagueTeams.find((lt) => lt.teamName === team1Name);
  const leagueTeam2 = leagueTeams.find((lt) => lt.teamName === team2Name);

  const { data: team1Players } = useSuspenseLeagueTeamsPlayers({
    leagueTeamId: leagueTeam1?.leagueTeamId ?? 0,
  });
  const { data: team2Players } = useSuspenseLeagueTeamsPlayers({
    leagueTeamId: leagueTeam2?.leagueTeamId ?? 0,
  });

  // playerId → LeagueTeamsPlayerType 매핑
  const team1PlayerByPlayerId = useMemo(() => {
    const map = new Map<number, LeagueTeamsPlayerType>();
    team1Players.forEach((p) => map.set(p.playerId, p));
    return map;
  }, [team1Players]);

  const team2PlayerByPlayerId = useMemo(() => {
    const map = new Map<number, LeagueTeamsPlayerType>();
    team2Players.forEach((p) => map.set(p.playerId, p));
    return map;
  }, [team2Players]);

  // 마운트 시 lineup API 데이터로 초기 선택 상태 설정
  const [originalTeam1Selection] = useState<PlayerSelectionState[]>(() =>
    initializeSelection(lineup1, team1PlayerByPlayerId),
  );
  const [originalTeam2Selection] = useState<PlayerSelectionState[]>(() =>
    initializeSelection(lineup2, team2PlayerByPlayerId),
  );
  const [team1Selection, setTeam1Selection] = useState<PlayerSelectionState[]>(() =>
    initializeSelection(lineup1, team1PlayerByPlayerId),
  );
  const [team2Selection, setTeam2Selection] = useState<PlayerSelectionState[]>(() =>
    initializeSelection(lineup2, team2PlayerByPlayerId),
  );

  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [saving, setSaving] = useState(false);

  const { mutateAsync: createLineup } = useCreateGameTeamsLineup();
  const { mutateAsync: deleteLineupPlayer } = useDeleteGameTeamsLineup();
  const { mutateAsync: patchStarter } = useUpdateGamesStarter();
  const { mutateAsync: patchCandidate } = useUpdateGamesCandidate();
  const { mutateAsync: patchCaptainRegister } = useUpdateGamesCaptainRegister();
  const { mutateAsync: patchCaptainRevoke } = useUpdateGamesCaptainRevoke();

  const getPlayerState = (teamNumber: 1 | 2, teamPlayerId: number) => {
    const selection = teamNumber === 1 ? team1Selection : team2Selection;
    return selection.find((p) => p.teamPlayerId === teamPlayerId);
  };

  const handlePlayerSelection = (
    teamNumber: 1 | 2,
    teamPlayerId: number,
    newState: 'STARTER' | 'CANDIDATE',
  ) => {
    const setSelection = teamNumber === 1 ? setTeam1Selection : setTeam2Selection;
    setSelection((prev) => {
      const existing = prev.find((p) => p.teamPlayerId === teamPlayerId);
      if (existing) {
        if (existing.state === newState) {
          return prev.filter((p) => p.teamPlayerId !== teamPlayerId);
        }
        return prev.map((p) =>
          p.teamPlayerId === teamPlayerId
            ? { ...p, state: newState, isCaptain: newState === 'CANDIDATE' ? false : p.isCaptain }
            : p,
        );
      }
      return [...prev, { teamPlayerId, state: newState, isCaptain: false }];
    });
  };

  const handleCaptainSelection = (teamNumber: 1 | 2, teamPlayerId: number) => {
    const setSelection = teamNumber === 1 ? setTeam1Selection : setTeam2Selection;
    const currentSelection = teamNumber === 1 ? team1Selection : team2Selection;
    const player = currentSelection.find((p) => p.teamPlayerId === teamPlayerId);
    if (!player || player.state === 'CANDIDATE') return;

    setSelection((prev) =>
      prev.map((p) => ({
        ...p,
        isCaptain: p.teamPlayerId === teamPlayerId ? !p.isCaptain : false,
      })),
    );
  };

  const applyTeamChanges = async (
    gameTeamId: number,
    originalSelection: PlayerSelectionState[],
    newSelection: PlayerSelectionState[],
  ) => {
    const originalMap = new Map(originalSelection.map((p) => [p.teamPlayerId, p]));
    const newMap = new Map(newSelection.map((p) => [p.teamPlayerId, p]));

    for (const orig of originalSelection) {
      const next = newMap.get(orig.teamPlayerId);

      if (!next) {
        // 라인업에서 제거 → DELETE
        if (orig.lineupPlayerId !== undefined) {
          await deleteLineupPlayer({ gameTeamId, lineupPlayerId: orig.lineupPlayerId });
        }
      } else if (orig.state !== next.state && orig.isCaptain === next.isCaptain) {
        // 선발 ↔ 후보 상태만 변경 → PATCH starter/candidate
        if (orig.lineupPlayerId !== undefined) {
          if (next.state === 'STARTER') {
            await patchStarter({ gameId, lineupPlayerId: orig.lineupPlayerId });
          } else {
            await patchCandidate({ gameId, lineupPlayerId: orig.lineupPlayerId });
          }
        }
      } else if (orig.state === next.state && orig.isCaptain !== next.isCaptain) {
        // 주장만 변경 → PATCH captain/register or revoke
        if (orig.lineupPlayerId !== undefined) {
          if (next.isCaptain) {
            await patchCaptainRegister({ gameId, lineupPlayerId: orig.lineupPlayerId });
          } else {
            await patchCaptainRevoke({ gameId, lineupPlayerId: orig.lineupPlayerId });
          }
        }
      } else if (orig.state !== next.state && orig.isCaptain !== next.isCaptain) {
        // 상태 + 주장 동시 변경 → DELETE + POST
        if (orig.lineupPlayerId !== undefined) {
          await deleteLineupPlayer({ gameTeamId, lineupPlayerId: orig.lineupPlayerId });
        }
        await createLineup({
          gameTeamId,
          teamPlayerId: next.teamPlayerId,
          state: next.state,
          isCaptain: next.isCaptain,
        });
      }
      // 변경 없음 → skip
    }

    for (const next of newSelection) {
      if (!originalMap.has(next.teamPlayerId)) {
        // 새로 추가된 선수 → POST
        await createLineup({
          gameTeamId,
          teamPlayerId: next.teamPlayerId,
          state: next.state,
          isCaptain: next.isCaptain,
        });
      }
    }
  };

  const handleSaveAndNext = async () => {
    if (!gameTeam1 || !gameTeam2) return;
    setSaving(true);
    try {
      await applyTeamChanges(gameTeam1.gameTeamId, originalTeam1Selection, team1Selection);
      await applyTeamChanges(gameTeam2.gameTeamId, originalTeam2Selection, team2Selection);

      toast.success('라인업이 수정되었습니다.');
      onNext();
    } catch (error) {
      toast.error('라인업 수정에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setSaving(false);
    }
  };

  const activeTeamPlayers = activeTab === 1 ? team1Players : team2Players;
  const activeSelection = activeTab === 1 ? team1Selection : team2Selection;

  const filteredAll = useMemo(
    () =>
      activeTeamPlayers.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.jerseyNumber.toString().includes(searchQuery),
      ),
    [activeTeamPlayers, searchQuery],
  );

  const team1Starters = team1Selection.filter((p) => p.state === 'STARTER');
  const team2Starters = team2Selection.filter((p) => p.state === 'STARTER');
  const team1Captain = team1Selection.find((p) => p.isCaptain);
  const team2Captain = team2Selection.find((p) => p.isCaptain);

  // 선발 / 후보 / 미등록 선수 분리
  const starters = filteredAll.filter(
    (p) => activeSelection.find((s) => s.teamPlayerId === p.teamPlayerId)?.state === 'STARTER',
  );
  const candidates = filteredAll.filter(
    (p) => activeSelection.find((s) => s.teamPlayerId === p.teamPlayerId)?.state === 'CANDIDATE',
  );
  const unregistered = filteredAll.filter(
    (p) => !activeSelection.find((s) => s.teamPlayerId === p.teamPlayerId),
  );

  const renderPlayerRow = (player: LeagueTeamsPlayerType, teamNumber: 1 | 2) => {
    const playerState = getPlayerState(teamNumber, player.teamPlayerId);
    return (
      <div
        key={player.teamPlayerId}
        className="flex items-center justify-between rounded-lg border p-3"
      >
        <div className="flex items-center gap-3">
          <span className="font-medium">#{player.jerseyNumber}</span>
          <span>{player.name}</span>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            size="md"
            className="px-3"
            color={playerState?.state === 'STARTER' ? 'primary' : 'black'}
            variant={playerState?.state === 'STARTER' ? 'solid' : 'ghost'}
            onClick={() => handlePlayerSelection(teamNumber, player.teamPlayerId, 'STARTER')}
          >
            선발
          </Button>
          <Button
            type="button"
            size="md"
            className="px-3"
            color={playerState?.state === 'CANDIDATE' ? 'primary' : 'black'}
            variant={playerState?.state === 'CANDIDATE' ? 'solid' : 'ghost'}
            onClick={() => handlePlayerSelection(teamNumber, player.teamPlayerId, 'CANDIDATE')}
          >
            후보
          </Button>
          {playerState?.state === 'STARTER' && (
            <Button
              type="button"
              size="md"
              className="px-3"
              color={playerState.isCaptain ? 'primary' : 'black'}
              variant={playerState.isCaptain ? 'solid' : 'ghost'}
              onClick={() => handleCaptainSelection(teamNumber, player.teamPlayerId)}
            >
              주장
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={twMerge('flex h-full flex-col')}>
      {/* 팀 탭 */}
      <div className={twMerge('mb-4 flex border-gray-200 border-b')}>
        {([1, 2] as const).map((tab) => {
          const name = tab === 1 ? team1Name : team2Name;
          const starters_ = tab === 1 ? team1Starters : team2Starters;
          const captain_ = tab === 1 ? team1Captain : team2Captain;
          return (
            <button
              key={tab}
              type="button"
              className={twMerge(
                'flex-1 border-b-2 px-4 py-3 text-center font-medium transition-colors',
                activeTab === tab
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700',
              )}
              onClick={() => {
                setActiveTab(tab);
                setSearchQuery('');
              }}
            >
              <div className="flex flex-col items-center gap-1">
                <span>{name}</span>
                <span className="text-xs text-gray-500">
                  선발 {starters_.length}명 · 주장 {captain_ ? '✓' : '✗'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 검색 */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="선수 이름이나 등번호로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="md"
        />
      </div>

      {/* 선수 목록 (섹션별 분리) */}
      <div className="flex-1 space-y-4 overflow-y-auto pb-4">
        {/* 선발 선수 */}
        {starters.length > 0 && (
          <section>
            <p className="mb-2 text-sm font-medium text-gray-700">
              선발 선수 ({starters.length}명)
            </p>
            <div className="space-y-2">{starters.map((p) => renderPlayerRow(p, activeTab))}</div>
          </section>
        )}

        {/* 후보 선수 */}
        {candidates.length > 0 && (
          <section>
            <p className="mb-2 text-sm font-medium text-gray-700">
              후보 선수 ({candidates.length}명)
            </p>
            <div className="space-y-2">{candidates.map((p) => renderPlayerRow(p, activeTab))}</div>
          </section>
        )}

        {/* 미등록 선수 */}
        {unregistered.length > 0 && (
          <section>
            <p className="mb-2 text-sm font-medium text-gray-700">
              미등록 선수 ({unregistered.length}명)
            </p>
            <div className="space-y-2">
              {unregistered.map((p) => renderPlayerRow(p, activeTab))}
            </div>
          </section>
        )}

        {filteredAll.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">선수가 없습니다.</p>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className={twMerge('flex-shrink-0 border-gray-200 border-t bg-white pt-4')}>
        <div className="flex gap-3">
          <Button
            type="button"
            className="flex-1"
            size="lg"
            color="primary"
            variant="ghost"
            onClick={onPrevious}
            disabled={saving}
          >
            이전 단계
          </Button>
          <Button
            type="button"
            className="flex-1"
            size="lg"
            color="black"
            onClick={handleSaveAndNext}
            disabled={saving}
          >
            {saving ? '저장 중...' : '다음 단계'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const GameLineupEditSection = ({ gameId, leagueId, onNext, onPrevious }: Props) => {
  return (
    <Suspense fallback={<Spinner className="self-center" />} clientOnly>
      <LineupEditContent
        gameId={gameId}
        leagueId={leagueId}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    </Suspense>
  );
};
