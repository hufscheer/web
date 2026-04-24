import * as Tabs from '@radix-ui/react-tabs';

import type { LeagueDetailType } from '~/api';

import { TabTrigger } from '~/components/ui';
import { getRoundLabel } from '~/utils/round-label';

type Props = {
  league: LeagueDetailType;
  round: number;
};

export const RoundFilter = ({ league, round }: Props) => {
  const rounds = getRounds(league);

  return (
    <Tabs.Root className="sticky top-12 z-header h-12 w-full" defaultValue={round.toString()}>
      <Tabs.List className="center h-12 gap-5 border-b border-neutral-100 bg-white">
        {rounds.map((r) => (
          <TabTrigger className="min-w-14" key={r} value={r.toString()} queryKey="round">
            {getRoundLabel(r)}
          </TabTrigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};

const getRounds = (league: LeagueDetailType) => {
  const rounds: number[] = [];

  // 예선 (16 이상일 경우)
  if (league.maxRound > 16) {
    rounds.push(league.maxRound);
  }

  // 16강, 8강, 4강, 결승
  [16, 8, 4, 2].forEach((r) => {
    if (r <= league.maxRound) {
      rounds.push(r);
    }
  });

  return rounds;
};
