import * as Tabs from '@radix-ui/react-tabs';
import type { LeagueDetailType } from '~/api';
import { TabTrigger } from '~/components/ui';

type Props = {
  league: LeagueDetailType;
  round: number;
};

export const RoundFilter = ({ league, round }: Props) => {
  const rounds = Array.from(
    { length: Math.floor(Math.log2(league.maxRound)) },
    (_, i) => league.maxRound / 2 ** i,
  );

  return (
    <Tabs.Root className="column w-full" defaultValue={round.toString()}>
      <Tabs.List className="center sticky top-12 z-10 h-12 gap-5 border-neutral-100 border-b bg-white">
        {rounds.map(r => (
          <TabTrigger className="min-w-14" key={r} value={r.toString()} queryKey="round">
            {r > 2 ? `${r}강` : '결승'}
          </TabTrigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};
