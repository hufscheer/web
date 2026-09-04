import { CandidateList } from './candidate-list';
import { PlayerList } from './player-list';

type Props = {
  gameId: number;
};

export const LineupTab = ({ gameId }: Props) => {
  return (
    <div className="bg-white pb-5">
      <PlayerList gameId={gameId} />
      <CandidateList gameId={gameId} />
    </div>
  );
};
