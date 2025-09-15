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
    <Tabs.Root
      className="column w-full flex-1 overflow-hidden bg-white"
      defaultValue={round.toString()}
    >
      <Tabs.List className="center gap-5 border-neutral-100 border-b">
        {rounds.map(r => (
          <TabTrigger className="min-w-14" key={r} value={r.toString()}>
            {r > 2 ? `${r}강` : '결승'}
          </TabTrigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};
