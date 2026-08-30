import * as Tabs from '@radix-ui/react-tabs';

import type { LeagueDetailType } from '~/api';

import { TabTrigger } from '~/components/ui';
import { getRoundLabel } from '~/utils/round-label';

type Props = {
  league: LeagueDetailType;
  round: number;
  thirdPlaceMatch: boolean;
};

export const RoundFilter = ({ league, round, thirdPlaceMatch }: Props) => {
  const rounds = getRounds(league);
  const activeValue = thirdPlaceMatch ? 'thirdPlaceMatch' : round.toString();

  return (
    <Tabs.Root className="sticky top-12 z-header h-12 w-full" defaultValue={activeValue}>
      <Tabs.List
        className={`center h-12 border-b border-neutral-100 bg-white ${
          league.thirdPlaceMatchEnabled ? 'justify-between gap-0 px-2 py-2.5' : 'gap-5'
        }`}
      >
        {rounds.map((r, index) => {
          const isThirdPlaceMatch =
            league.thirdPlaceMatchEnabled && r === 2 && index === rounds.length - 2;

          return (
            <TabTrigger
              className={league.thirdPlaceMatchEnabled ? 'min-w-0 flex-1' : 'min-w-14'}
              key={`${r}-${index}`}
              value={isThirdPlaceMatch ? 'thirdPlaceMatch' : r.toString()}
              queryKey="round"
              query={isThirdPlaceMatch ? { round: '2', third_place_match: 'true' } : undefined}
            >
              {isThirdPlaceMatch ? '3,4위전' : getRoundLabel(r)}
            </TabTrigger>
          );
        })}
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

  // 16강, 8강, 준결승, 결승
  [16, 8, 4, 2].forEach((r) => {
    if (r <= league.maxRound) {
      rounds.push(r);
    }
  });

  if (league.thirdPlaceMatchEnabled && league.maxRound >= 2) {
    rounds.splice(rounds.length - 1, 0, 2);
  }

  return rounds;
};
