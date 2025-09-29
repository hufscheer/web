import { Button, Input } from '@hcc/ui';
import { useCallback, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { type GameFormType, useSuspensePlayers, useSuspenseTeam } from '~/api';

type Props = {
  onNext: () => void;
  onPrevious: () => void;
};

type PlayerSelectionState = {
  teamPlayerId: number;
  state: 'STARTER' | 'CANDIDATE';
  isCaptain: boolean;
};

export const GameLineupStep = ({ onNext, onPrevious }: Props) => {
  const { watch, setValue, getValues } = useFormContext<GameFormType>();
  const [team1Id, team2Id] = watch(['team1.teamId', 'team2.teamId']);

  const { data: team1 } = useSuspenseTeam({ id: team1Id });
  const { data: team2 } = useSuspenseTeam({ id: team2Id });
  const { data: players } = useSuspensePlayers();

  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const [searchQuery, setSearchQuery] = useState('');

  const getPlayerName = useCallback(
    (playerId: number) => {
      const player = players.find(p => p.playerId === playerId);
      return player?.name || `선수 ${playerId}`;
    },
    [players],
  );

  const [team1Selection, setTeam1Selection] = useState<PlayerSelectionState[]>(() => {
    const existing = getValues('team1.lineupPlayers') || [];
    return existing.length > 0
      ? existing.map(p => ({
          teamPlayerId: p.teamPlayerId,
          state: p.state,
          isCaptain: p.isCaptain,
        }))
      : [];
  });

  const [team2Selection, setTeam2Selection] = useState<PlayerSelectionState[]>(() => {
    const existing = getValues('team2.lineupPlayers') || [];
    return existing.length > 0
      ? existing.map(p => ({
          teamPlayerId: p.teamPlayerId,
          state: p.state,
          isCaptain: p.isCaptain,
        }))
      : [];
  });

  const handlePlayerSelection = (
    teamNumber: 1 | 2,
    playerId: number,
    state: 'STARTER' | 'CANDIDATE',
  ) => {
    const setSelection = teamNumber === 1 ? setTeam1Selection : setTeam2Selection;

    setSelection(prev => {
      const existing = prev.find(p => p.teamPlayerId === playerId);
      if (existing) {
        if (existing.state === state) {
          return prev.filter(p => p.teamPlayerId !== playerId);
        }
        return prev.map(p =>
          p.teamPlayerId === playerId
            ? { ...p, state, isCaptain: state === 'CANDIDATE' ? false : p.isCaptain }
            : p,
        );
      }
      return [...prev, { teamPlayerId: playerId, state, isCaptain: false }];
    });
  };

  const handleCaptainSelection = (teamNumber: 1 | 2, playerId: number) => {
    const setSelection = teamNumber === 1 ? setTeam1Selection : setTeam2Selection;
    const currentSelection = teamNumber === 1 ? team1Selection : team2Selection;

    const playerInSelection = currentSelection.find(p => p.teamPlayerId === playerId);
    if (!playerInSelection || playerInSelection.state === 'CANDIDATE') {
      return;
    }

    setSelection(prev =>
      prev.map(p => ({
        ...p,
        isCaptain: p.teamPlayerId === playerId ? !p.isCaptain : false,
      })),
    );
  };

  const getPlayerState = (teamNumber: 1 | 2, playerId: number) => {
    const selection = teamNumber === 1 ? team1Selection : team2Selection;
    return selection.find(p => p.teamPlayerId === playerId);
  };

  const handleNext = () => {
    setValue('team1.lineupPlayers', team1Selection);
    setValue('team2.lineupPlayers', team2Selection);
    onNext();
  };

  const team1Starters = team1Selection.filter(p => p.state === 'STARTER');
  const team2Starters = team2Selection.filter(p => p.state === 'STARTER');
  const team1Captain = team1Selection.find(p => p.isCaptain);
  const team2Captain = team2Selection.find(p => p.isCaptain);

  const isValid =
    team1Starters.length > 0 && team2Starters.length > 0 && team1Captain && team2Captain;
  const filteredPlayers = useMemo(() => {
    const currentTeam = activeTab === 1 ? team1 : team2;
    if (!currentTeam?.teamPlayers) return [];

    return currentTeam.teamPlayers.filter(player => {
      const playerName = getPlayerName(player.playerId).toLowerCase();
      return (
        playerName.includes(searchQuery.toLowerCase()) ||
        player.jerseyNumber.toString().includes(searchQuery)
      );
    });
  }, [activeTab, team1, team2, searchQuery, getPlayerName]);

  const renderPlayerList = (teamNumber: 1 | 2) => {
    const teamData = teamNumber === 1 ? team1 : team2;
    const playersToShow = teamNumber === activeTab ? filteredPlayers : teamData?.teamPlayers || [];

    return (
      <div className={twMerge('space-y-2')}>
        {playersToShow.map(player => {
          const playerState = getPlayerState(teamNumber, player.playerId);
          return (
            <div
              key={player.playerId}
              className={twMerge('flex items-center justify-between rounded-lg border p-3')}
            >
              <div className={twMerge('flex items-center gap-3')}>
                <span className={twMerge('font-medium')}>#{player.jerseyNumber}</span>
                <span>{getPlayerName(player.playerId)}</span>
              </div>
              <div className={twMerge('flex gap-2')}>
                <Button
                  type="button"
                  size="sm"
                  color={playerState?.state === 'STARTER' ? 'black' : 'primary'}
                  variant={playerState?.state === 'STARTER' ? 'solid' : 'ghost'}
                  onClick={() => handlePlayerSelection(teamNumber, player.playerId, 'STARTER')}
                >
                  선발
                </Button>
                <Button
                  type="button"
                  size="sm"
                  color={playerState?.state === 'CANDIDATE' ? 'black' : 'primary'}
                  variant={playerState?.state === 'CANDIDATE' ? 'solid' : 'ghost'}
                  onClick={() => handlePlayerSelection(teamNumber, player.playerId, 'CANDIDATE')}
                >
                  후보
                </Button>
                {playerState?.state === 'STARTER' && (
                  <Button
                    type="button"
                    size="sm"
                    color={playerState?.isCaptain ? 'black' : 'primary'}
                    variant={playerState?.isCaptain ? 'solid' : 'ghost'}
                    onClick={() => handleCaptainSelection(teamNumber, player.playerId)}
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
    <div className={twMerge('w-full')}>
      <div className={twMerge('mb-4')}>
        <div className={twMerge('flex border-gray-200 border-b')}>
          <button
            type="button"
            className={twMerge(
              'flex-1 border-b-2 px-4 py-3 text-center font-medium transition-colors',
              activeTab === 1
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            )}
            onClick={() => {
              setActiveTab(1);
              setSearchQuery('');
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <span>{team1?.name}</span>
              <span className={twMerge('text-gray-500 text-xs')}>
                선발: {team1Starters.length}명, 주장: {team1Captain ? '✓' : '✗'}
              </span>
            </div>
          </button>
          <button
            type="button"
            className={twMerge(
              'flex-1 border-b-2 px-4 py-3 text-center font-medium transition-colors',
              activeTab === 2
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            )}
            onClick={() => {
              setActiveTab(2);
              setSearchQuery('');
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <span>{team2?.name}</span>
              <span className={twMerge('text-gray-500 text-xs')}>
                선발: {team2Starters.length}명, 주장: {team2Captain ? '✓' : '✗'}
              </span>
            </div>
          </button>
        </div>
      </div>
      <div className={twMerge('mb-4')}>
        <Input
          type="text"
          placeholder="선수 이름이나 등번호로 검색..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          size="md"
        />
      </div>

      <div className={twMerge('mb-6')} style={{ maxHeight: '500px', overflowY: 'auto' }}>
        {renderPlayerList(activeTab)}
      </div>
      <div className={twMerge('sticky bottom-0 border-gray-200 border-t bg-white pt-4')}>
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
