import type { SportType } from '~/api';

import { CandidateList } from './candidate-list';
import { Ground } from './ground';
import { PlayerList } from './player-list';

type Props = {
  gameId: number;
  sportType: SportType;
};

export const LineupTab = ({ gameId, sportType }: Props) => {
  return (
    <div className="bg-white pb-5">
      <Ground gameId={gameId} sportType={sportType} />

      <hr className="h-2 w-full border-none bg-neutral-50" />

      <PlayerList gameId={gameId} />
      <CandidateList gameId={gameId} />
    </div>
  );
};
