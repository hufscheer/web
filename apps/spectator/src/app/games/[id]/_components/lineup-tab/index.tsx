import { Ground } from './ground';

type Props = {
  gameId: number;
};

export const LineupTab = ({ gameId }: Props) => {
  return (
    <div className="bg-white">
      <Ground gameId={gameId} />

      <hr className="h-2 w-full border-none bg-neutral-50" />
    </div>
  );
};
