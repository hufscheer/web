import { CandidateList } from './candidate-list';
import { Ground } from './ground';
import { PlayerList } from './player-list';

type Props = {
  gameId: number;
};

export const LineupTab = ({ gameId }: Props) => {
  return (
    <div className="bg-white pb-5">
      <Ground gameId={gameId} />

      <hr className="h-2 w-full border-none bg-neutral-50" />

      <PlayerList gameId={gameId} />
      <CandidateList gameId={gameId} />
    </div>
  );
};
