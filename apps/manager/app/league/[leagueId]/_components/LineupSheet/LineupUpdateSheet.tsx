import {
  useGameLineup,
  useGameLineupPlaying,
  GameTeamPlayerType,
} from '@hcc/api';
import { ReactNode } from 'react';

type LineupUpdateSheetProps = {
  gameId: string;
  teamId: string;
  children: ReactNode;
};

export const LineupUpdateSheet = ({
  gameId,
  teamId,
  children,
}: LineupUpdateSheetProps) => {
  const { data: lineupList } = useGameLineup(gameId);
  const { data: lineupPlayingList } = useGameLineupPlaying(gameId);

  const currentLineup = lineupList?.find(
    lineup => lineup.gameTeamId === Number(teamId),
  );

  const currentPlayingLineup: GameTeamPlayerType[] =
    lineupPlayingList?.find(lineup => lineup.gameTeamId === Number(teamId))
      ?.gameTeamPlayers || [];

  const remainLineup: GameTeamPlayerType[] =
    currentLineup?.gameTeamPlayers.filter(
      player => !currentPlayingLineup.some(p => p.id === player.id),
    ) || [];

  alert(JSON.stringify(remainLineup));

  return <>{children}</>;
};
