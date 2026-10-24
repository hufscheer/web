'use client';

import { Button, Spinner, toast } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import { useEffect, useMemo, useState } from 'react';

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

  const findLineup = (gameTeam: typeof gameTeam1) =>
    lineup.find((l) => l.gameTeamId === gameTeam?.gameTeamId) ??
    lineup.find((l) => l.teamName === gameTeam?.gameTeamName);

  const lineup1 = findLineup(gameTeam1);
  const lineup2 = findLineup(gameTeam2);

  const team1Name = lineup1?.teamName ?? gameTeam1?.gameTeamName ?? '';
  const team2Name = lineup2?.teamName ?? gameTeam2?.gameTeamName ?? '';

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

  const [originalTeam1Selection, setOriginalTeam1Selection] = useState<PlayerSelectionState[]>([]);
  const [originalTeam2Selection, setOriginalTeam2Selection] = useState<PlayerSelectionState[]>([]);
  const [team1Selection, setTeam1Selection] = useState<PlayerSelectionState[]>([]);
  const [team2Selection, setTeam2Selection] = useState<PlayerSelectionState[]>([]);

  useEffect(() => {
    const nextTeam1Selection = initializeSelection(lineup1, team1PlayerByPlayerId);
    const nextTeam2Selection = initializeSelection(lineup2, team2PlayerByPlayerId);

    setOriginalTeam1Selection(nextTeam1Selection);
    setOriginalTeam2Selection(nextTeam2Selection);
    setTeam1Selection(nextTeam1Selection);
    setTeam2Selection(nextTeam2Selection);
  }, [lineup1, lineup2, team1PlayerByPlayerId, team2PlayerByPlayerId]);

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

  /**
   * 바뀐 내용을 서버에 순서대로 보낸다. 서버는 선발이 늘어나는 요청마다 정원을 보므로
   * 빼기와 후보로 내리기를 먼저 보내고, 선발로 올리기와 새로 넣기는 그 뒤에 보낸다.
   * 조회 응답은 선발과 후보를 지금 뛰는지(isPlaying)로 나누므로 응답 순서에 기대지 않는다.
   */
  const applyTeamChanges = async (
    gameTeamId: number,
    originalSelection: PlayerSelectionState[],
    newSelection: PlayerSelectionState[],
  ) => {
    const originalMap = new Map(originalSelection.map((p) => [p.teamPlayerId, p]));
    const newMap = new Map(newSelection.map((p) => [p.teamPlayerId, p]));
    const kept = originalSelection.flatMap((orig) => {
      const next = newMap.get(orig.teamPlayerId);
      return next && orig.lineupPlayerId !== undefined
        ? [{ orig, next, lineupPlayerId: orig.lineupPlayerId }]
        : [];
    });
    const isDemoted = ({ orig, next }: (typeof kept)[number]) =>
      orig.state === 'STARTER' && next.state === 'CANDIDATE';

    // 1. 라인업에서 뺀다
    for (const orig of originalSelection) {
      if (orig.lineupPlayerId !== undefined && !newMap.has(orig.teamPlayerId)) {
        await deleteLineupPlayer({ gameTeamId, lineupPlayerId: orig.lineupPlayerId });
      }
    }
    // 2. 후보로 내린다. 주장이었으면 서버가 주장도 푼다
    for (const k of kept.filter(isDemoted)) {
      await patchCandidate({ gameId, lineupPlayerId: k.lineupPlayerId });
    }
    // 3. 선발로 올린다
    for (const k of kept) {
      if (k.orig.state === 'CANDIDATE' && k.next.state === 'STARTER') {
        await patchStarter({ gameId, lineupPlayerId: k.lineupPlayerId });
      }
    }
    // 4. 남아 있는 주장을 푼다. 새 주장을 넣거나 지정하기 전에 해야 서버가 "주장이 이미 있다"로 막지 않는다
    for (const k of kept) {
      if (k.orig.isCaptain && !k.next.isCaptain && !isDemoted(k)) {
        await patchCaptainRevoke({ gameId, lineupPlayerId: k.lineupPlayerId });
      }
    }
    // 5. 새로 넣는다
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
    // 6. 이미 있던 선수를 주장으로 지정한다
    for (const k of kept) {
      if (!k.orig.isCaptain && k.next.isCaptain) {
        await patchCaptainRegister({ gameId, lineupPlayerId: k.lineupPlayerId });
      }
    }
    // 7. 이미 있던 선수의 포지션을 바꾼다
    for (const k of kept) {
      if (k.orig.position !== k.next.position) {
        await patchPosition({
          gameId,
          lineupPlayerId: k.lineupPlayerId,
          position: k.next.position,
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
