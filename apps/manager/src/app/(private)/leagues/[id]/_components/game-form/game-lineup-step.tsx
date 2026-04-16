import { Button, Input, toast } from '@hcc/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import {
  type GameFormType,
  useSuspenseLeague,
  useSuspenseLeagueTeams,
  useSuspenseLeagueTeamsPlayers,
} from '~/api';
import { getStarterLimit } from '~/constants/leagues';

type Props = {
  leagueId: number;
  onNext: () => void;
  onPrevious: () => void;
};

type PlayerSelectionState = {
  teamPlayerId: number;
  state: 'STARTER' | 'CANDIDATE';
  isCaptain: boolean;
};

export const GameLineupStep = ({ leagueId, onNext, onPrevious }: Props) => {
  const { watch, setValue, getValues } = useFormContext<GameFormType>();
  const { data: league } = useSuspenseLeague({ leagueId });
  const [team1Id, team2Id] = watch(['team1.leagueTeamId', 'team2.leagueTeamId']);

  const { data: leagueTeams } = useSuspenseLeagueTeams({ leagueId });
  const team1 = leagueTeams.find((team) => team.leagueTeamId === Number(team1Id));
  const team2 = leagueTeams.find((team) => team.leagueTeamId === Number(team2Id));

  const { data: team1Players } = useSuspenseLeagueTeamsPlayers({
    leagueTeamId: team1?.leagueTeamId || 0,
  });
  const { data: team2Players } = useSuspenseLeagueTeamsPlayers({
    leagueTeamId: team2?.leagueTeamId || 0,
  });

  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const [searchQuery, setSearchQuery] = useState('');

  const getPlayerName = useCallback(
    (teamPlayerId: number) => {
      const allPlayers = [...team1Players, ...team2Players];
      const player = allPlayers.find((p) => p.teamPlayerId === teamPlayerId);
      return player?.name || `선수 ${teamPlayerId}`;
    },
    [team1Players, team2Players],
  );

  const [team1Selection, setTeam1Selection] = useState<PlayerSelectionState[]>(() => {
    const existing = getValues('team1.lineupPlayers') || [];
    return existing.length > 0
      ? existing.map((p) => ({
          teamPlayerId: p.teamPlayerId,
          state: p.state,
          isCaptain: p.isCaptain,
        }))
      : [];
  });

  const [team2Selection, setTeam2Selection] = useState<PlayerSelectionState[]>(() => {
    const existing = getValues('team2.lineupPlayers') || [];
    return existing.length > 0
      ? existing.map((p) => ({
          teamPlayerId: p.teamPlayerId,
          state: p.state,
          isCaptain: p.isCaptain,
        }))
      : [];
  });

  // 팀 ID가 변경되면 해당 팀의 선택 상태 초기화
  useEffect(() => {
    const currentTeam1Players = getValues('team1.lineupPlayers') || [];
    if (currentTeam1Players.length === 0) {
      setTeam1Selection([]);
    }
  }, [getValues]);

  useEffect(() => {
    const currentTeam2Players = getValues('team2.lineupPlayers') || [];
    if (currentTeam2Players.length === 0) {
      setTeam2Selection([]);
    }
  }, [getValues]);

  const handlePlayerSelection = (
    teamNumber: 1 | 2,
    teamPlayerId: number,
    state: 'STARTER' | 'CANDIDATE',
  ) => {
    const setSelection = teamNumber === 1 ? setTeam1Selection : setTeam2Selection;
    const currentSelection = teamNumber === 1 ? team1Selection : team2Selection;

    if (state === 'STARTER') {
      const starterLimit = getStarterLimit(league.sportType);
      const currentStarters = currentSelection.filter((p) => p.state === 'STARTER');
      const isAlreadyStarter =
        currentSelection.find((p) => p.teamPlayerId === teamPlayerId)?.state === 'STARTER';
      if (!isAlreadyStarter && currentStarters.length >= starterLimit) {
        toast.error('선발인원이 모두 찼어요');
        return;
      }
    }

    setSelection((prev) => {
      const existing = prev.find((p) => p.teamPlayerId === teamPlayerId);
      if (existing) {
        if (existing.state === state) {
          return prev.filter((p) => p.teamPlayerId !== teamPlayerId);
        }
        return prev.map((p) =>
          p.teamPlayerId === teamPlayerId
            ? {
                ...p,
                state,
                isCaptain: state === 'CANDIDATE' ? false : p.isCaptain,
              }
            : p,
        );
      }
      return [...prev, { teamPlayerId: teamPlayerId, state, isCaptain: false }];
    });
  };

  const handleCaptainSelection = (teamNumber: 1 | 2, teamPlayerId: number) => {
    const setSelection = teamNumber === 1 ? setTeam1Selection : setTeam2Selection;
    const currentSelection = teamNumber === 1 ? team1Selection : team2Selection;

    const playerInSelection = currentSelection.find((p) => p.teamPlayerId === teamPlayerId);
    if (!playerInSelection || playerInSelection.state === 'CANDIDATE') {
      return;
    }

    setSelection((prev) =>
      prev.map((p) => ({
        ...p,
        isCaptain: p.teamPlayerId === teamPlayerId ? !p.isCaptain : false,
      })),
    );
  };

  const getPlayerState = (teamNumber: 1 | 2, playerId: number) => {
    const selection = teamNumber === 1 ? team1Selection : team2Selection;
    return selection.find((p) => p.teamPlayerId === playerId);
  };

  const handleNext = () => {
    setValue('team1.lineupPlayers', team1Selection);
    setValue('team2.lineupPlayers', team2Selection);
    onNext();
  };

  const team1Starters = team1Selection.filter((p) => p.state === 'STARTER');
  const team2Starters = team2Selection.filter((p) => p.state === 'STARTER');
  const team1Captain = team1Selection.find((p) => p.isCaptain);
  const team2Captain = team2Selection.find((p) => p.isCaptain);

  const isValid =
    team1Starters.length > 0 && team2Starters.length > 0 && team1Captain && team2Captain;
  const filteredPlayers = useMemo(() => {
    const currentPlayers = activeTab === 1 ? team1Players : team2Players;
    if (!currentPlayers) return [];

    return currentPlayers.filter(
      (player) =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.jerseyNumber?.toString().includes(searchQuery),
    );
  }, [activeTab, team1Players, team2Players, searchQuery]);

  const renderPlayerList = (teamNumber: 1 | 2) => {
    const playersData = teamNumber === 1 ? team1Players : team2Players;
    const playersToShow = teamNumber === activeTab ? filteredPlayers : playersData || [];

    return (
      <div className={twMerge('space-y-2')}>
        {playersToShow.map((player) => {
          const playerState = getPlayerState(teamNumber, player.teamPlayerId);
          return (
            <div
              key={player.teamPlayerId}
              className={twMerge('flex items-center justify-between rounded-lg border p-3')}
            >
              <div className={twMerge('flex items-center gap-3')}>
                <span className={twMerge('font-medium')}>#{player.jerseyNumber}</span>
                <span>{getPlayerName(player.teamPlayerId)}</span>
              </div>
              <div className={twMerge('flex gap-2')}>
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
                  onClick={() =>
                    handlePlayerSelection(teamNumber, player.teamPlayerId, 'CANDIDATE')
                  }
                >
                  후보
                </Button>
                {playerState?.state === 'STARTER' && (
                  <Button
                    type="button"
                    size="md"
                    className="px-3"
                    color={playerState?.isCaptain ? 'primary' : 'black'}
                    variant={playerState?.isCaptain ? 'solid' : 'ghost'}
                    onClick={() => handleCaptainSelection(teamNumber, player.teamPlayerId)}
                  >
                    주장
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={twMerge('flex h-full flex-col')}>
      <div className="mb-4 rounded-xl bg-neutral-100 p-1">
        <div className="flex">
          {([1, 2] as const).map((tab) => {
            const team = tab === 1 ? team1 : team2;
            const starters = tab === 1 ? team1Starters : team2Starters;
            const captain = tab === 1 ? team1Captain : team2Captain;
            return (
              <button
                key={tab}
                type="button"
                className={twMerge(
                  'flex flex-1 flex-col items-center gap-0.5 rounded-lg px-4 py-2 text-sm font-medium transition-all',
                  activeTab === tab ? 'bg-white text-black shadow-sm' : 'text-gray-500',
                )}
                onClick={() => {
                  setActiveTab(tab);
                  setSearchQuery('');
                }}
              >
                <span>{team?.teamName}</span>
                <span className="text-xs text-gray-400">
                  선발 {starters.length}명 · 주장 {captain ? '✓' : '✗'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className={twMerge('mb-4')}>
        <Input
          type="text"
          placeholder="선수 이름이나 등번호로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="md"
        />
      </div>

      <div className={twMerge('mb-6 flex-1 overflow-y-auto')}>{renderPlayerList(activeTab)}</div>
      <div className={twMerge('flex-shrink-0 border-gray-200 border-t bg-white pt-4')}>
        <div className={twMerge('flex gap-3')}>
          <Button
            type="button"
            className={twMerge('flex-1')}
            size="lg"
            color="primary"
            variant="ghost"
            onClick={onPrevious}
          >
            이전 단계
          </Button>
          <Button
            type="button"
            className={twMerge('flex-1')}
            size="lg"
            color="black"
            onClick={handleNext}
            disabled={!isValid}
          >
            다음 단계
          </Button>
        </div>
      </div>
    </div>
  );
};
