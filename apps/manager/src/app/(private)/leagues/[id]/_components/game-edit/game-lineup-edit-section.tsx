'use client';

import { Button, Spinner, toast } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import { useMemo, useState } from 'react';

import {
  useCreateGameTeamsLineup,
  useDeleteGameTeamsLineup,
  useUpdateGamesCandidate,
  useUpdateGamesCaptainRegister,
  useUpdateGamesCaptainRevoke,
  useUpdateGamesPosition,
  useUpdateGamesStarter,
  useSuspenseGame,
  useSuspenseGameLineup,
  useSuspenseLeague,
  useSuspenseLeagueTeams,
  useSuspenseLeagueTeamsPlayers,
  type GameLineupType,
  type LeagueTeamsPlayerType,
} from '~/api';
import { getStarterLimit } from '~/constants/leagues';

import { CandidatesSection, PlayerSearchPopover, StartersSection, TeamTabs } from '../lineup-ui';

type PlayerSelectionState = {
  teamPlayerId: number;
  lineupPlayerId?: number;
  state: 'STARTER' | 'CANDIDATE';
  isCaptain: boolean;
  position: string | null;
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
        position: lp.position ?? null,
      },
    ];
  });
};

const LineupEditContent = ({ gameId, leagueId, onNext, onPrevious }: Props) => {
  const { data: league } = useSuspenseLeague({ leagueId });
  const { data: game } = useSuspenseGame({ gameId });
  const { data: lineup } = useSuspenseGameLineup({ gameId });
  const { data: leagueTeams } = useSuspenseLeagueTeams({ leagueId });

  const gameTeam1 = game.gameTeams?.[0];
  const gameTeam2 = game.gameTeams?.[1];

  const lineup1 = lineup.find((l) => l.gameTeamId === gameTeam1?.gameTeamId);
  const lineup2 = lineup.find((l) => l.gameTeamId === gameTeam2?.gameTeamId);

  const team1Name = lineup1?.teamName ?? gameTeam1?.gameTeamName ?? '';
  const team2Name = lineup2?.teamName ?? gameTeam2?.gameTeamName ?? '';

  /**
   * 경기팀 → 리그팀 잇기. gameTeamId 는 경기마다 새로 생기는 값이라 리그 참가팀 목록과
   * 직접 이어지지 않는다. 서버가 gameTeams[].teamId 를 주기 시작해서 그걸로 찾는다.
   *
   * <p>이름 비교는 뒷문으로만 남긴다. 예전에는 이름이 유일한 연결고리였는데, 동명 팀이나
   * 공백 차이("독일어과 Rote  Karte" 처럼 공백 2개)면 못 찾고 그대로 빈 라인업이 됐다.
   * teamId 가 아직 안 내려오는 서버를 만나도 예전만큼은 동작하게 두는 것이다.
   */
  const findLeagueTeam = (gameTeam: typeof gameTeam1, fallbackName: string) =>
    leagueTeams.find((lt) => gameTeam?.teamId != null && lt.teamId === gameTeam.teamId) ??
    leagueTeams.find((lt) => lt.teamName === fallbackName);

  const leagueTeam1 = findLeagueTeam(gameTeam1, team1Name);
  const leagueTeam2 = findLeagueTeam(gameTeam2, team2Name);

  const { data: team1Players } = useSuspenseLeagueTeamsPlayers({
    leagueTeamId: leagueTeam1?.leagueTeamId ?? 0,
  });
  const { data: team2Players } = useSuspenseLeagueTeamsPlayers({
    leagueTeamId: leagueTeam2?.leagueTeamId ?? 0,
  });

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
  const [saving, setSaving] = useState(false);

  const { mutateAsync: createLineup } = useCreateGameTeamsLineup();
  const { mutateAsync: deleteLineupPlayer } = useDeleteGameTeamsLineup();
  const { mutateAsync: patchStarter } = useUpdateGamesStarter();
  const { mutateAsync: patchCandidate } = useUpdateGamesCandidate();
  const { mutateAsync: patchCaptainRegister } = useUpdateGamesCaptainRegister();
  const { mutateAsync: patchCaptainRevoke } = useUpdateGamesCaptainRevoke();
  const { mutateAsync: patchPosition } = useUpdateGamesPosition();

  const handlePlayerSelection = (
    teamNumber: 1 | 2,
    teamPlayerId: number,
    newState: 'STARTER' | 'CANDIDATE',
  ) => {
    const setSelection = teamNumber === 1 ? setTeam1Selection : setTeam2Selection;
    const currentSelection = teamNumber === 1 ? team1Selection : team2Selection;

    if (newState === 'STARTER') {
      const starterLimit = getStarterLimit(league.sportType);
      const currentStarters = currentSelection.filter((p) => p.state === 'STARTER');
      const isAlreadyStarter =
        currentSelection.find((p) => p.teamPlayerId === teamPlayerId)?.state === 'STARTER';
      if (!isAlreadyStarter && currentStarters.length >= starterLimit) {
        toast.error('선발 인원이 다 찼어요');
        return;
      }
    }

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
      return [...prev, { teamPlayerId, state: newState, isCaptain: false, position: null }];
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
        if (orig.lineupPlayerId !== undefined) {
          await deleteLineupPlayer({ gameTeamId, lineupPlayerId: orig.lineupPlayerId });
        }
      } else if (orig.state !== next.state && orig.isCaptain === next.isCaptain) {
        if (orig.lineupPlayerId !== undefined) {
          if (next.state === 'STARTER') {
            await patchStarter({ gameId, lineupPlayerId: orig.lineupPlayerId });
          } else {
            await patchCandidate({ gameId, lineupPlayerId: orig.lineupPlayerId });
          }
        }
      } else if (orig.state === next.state && orig.isCaptain !== next.isCaptain) {
        if (orig.lineupPlayerId !== undefined) {
          if (next.isCaptain) {
            await patchCaptainRegister({ gameId, lineupPlayerId: orig.lineupPlayerId });
          } else {
            await patchCaptainRevoke({ gameId, lineupPlayerId: orig.lineupPlayerId });
          }
        }
      } else if (orig.state !== next.state && orig.isCaptain !== next.isCaptain) {
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

      if (
        orig.lineupPlayerId !== undefined &&
        next !== undefined &&
        orig.state === next.state &&
        orig.isCaptain === next.isCaptain &&
        orig.position !== next?.position
      ) {
        await patchPosition({
          gameId,
          lineupPlayerId: orig.lineupPlayerId,
          position: next?.position ?? null,
        });
      }
    }

    for (const next of newSelection) {
      if (!originalMap.has(next.teamPlayerId)) {
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

      toast.success('라인업을 수정했어요');
      onNext();
    } catch (error) {
      toast.error('라인업 수정에 실패했어요 잠시 후 다시 시도해주세요');
    } finally {
      setSaving(false);
    }
  };

  const activeTeamPlayers = activeTab === 1 ? team1Players : team2Players;
  const activeSelection = activeTab === 1 ? team1Selection : team2Selection;
  const activeTeamName = activeTab === 1 ? team1Name : team2Name;

  const starterLimit = getStarterLimit(league.sportType);
  const activeView = {
    starters: activeSelection.filter((p) => p.state === 'STARTER'),
    candidates: activeSelection.filter((p) => p.state === 'CANDIDATE'),
  };
  const canPromote = activeView.starters.length < starterLimit;

  /** 후보를 남은 선발 자리만큼 올린다. 생성 화면의 "모두 선발로 올리기"와 같은 동작이다 */
  const promoteAllCandidates = () => {
    const openSlots = starterLimit - activeView.starters.length;
    if (openSlots <= 0) {
      toast.error('선발 인원이 다 찼어요');
      return;
    }
    const promoting = new Set(activeView.candidates.slice(0, openSlots).map((c) => c.teamPlayerId));
    const setSelection = activeTab === 1 ? setTeam1Selection : setTeam2Selection;
    setSelection((prev) =>
      prev.map((p) => (promoting.has(p.teamPlayerId) ? { ...p, state: 'STARTER' as const } : p)),
    );
  };

  return (
    <div className="flex h-full flex-col">
      <TeamTabs
        activeTab={activeTab}
        teamNames={{ 1: team1Name || '팀 1', 2: team2Name || '팀 2' }}
        onSelect={setActiveTab}
      />

      <div className="mt-4 flex-1 overflow-y-auto">
        {/*
          포지션은 끈다. 경기 수정에는 포지션 저장 경로가 없다 —
          서버에 PATCH .../lineup-players/{id}/position 은 있지만 프론트에 mutation 이 없다.
          저장 안 되는 값을 고르게 두지 않으려고 여기서만 감춘다.
        */}
        <PlayerSearchPopover
          key={activeTab}
          players={activeTeamPlayers}
          selection={activeSelection}
          sportType={league.sportType}
          showPosition
          onToggleState={(playerId, state) => handlePlayerSelection(activeTab, playerId, state)}
          onSetPosition={(playerId, position) => {
            const setSelection = activeTab === 1 ? setTeam1Selection : setTeam2Selection;
            setSelection((prev) =>
              prev.map((player) =>
                player.teamPlayerId === playerId ? { ...player, position } : player,
              ),
            );
          }}
        />

        <StartersSection
          teamName={activeTeamName}
          view={activeView}
          players={activeTeamPlayers}
          starterLimit={starterLimit}
          onToggleCaptain={(playerId) => handleCaptainSelection(activeTab, playerId)}
          onDemote={(playerId) => handlePlayerSelection(activeTab, playerId, 'CANDIDATE')}
        />

        <CandidatesSection
          teamName={activeTeamName}
          view={activeView}
          players={activeTeamPlayers}
          canPromote={canPromote}
          onPromoteAll={promoteAllCandidates}
          onPromote={(playerId) => handlePlayerSelection(activeTab, playerId, 'STARTER')}
        />
      </div>

      <div className="flex-shrink-0 border-t border-gray-200 bg-white pt-4">
        <div className="flex gap-3">
          <Button
            type="button"
            className="flex-1"
            size="lg"
            color="primary"
            variant="subtle"
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
