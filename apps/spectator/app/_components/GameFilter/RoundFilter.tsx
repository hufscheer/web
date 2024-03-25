'use client';

import Flicking from '@egjs/react-flicking';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import useLeagueDetailQuery from '@/queries/useLeagueDetail';

import * as styles from './GameFilter.css';

function formatRoundLabel(round: number): string {
  return round > 2 ? `${round}강` : `결승`;
}

type RoundFilterProps = {
  initialLeagueId: number;
  maxRound: number;
  inProgressRound: number;
};

export default function RoundFilter({
  initialLeagueId,
  inProgressRound,
}: RoundFilterProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const year = Number(searchParams.get('year'));
  const league = searchParams.get('league');

  const { data: leagueDetail } = useLeagueDetailQuery(initialLeagueId);
  const currentRound =
    Number(searchParams.get('round')) || leagueDetail?.inProgressRound;

  if (!leagueDetail) return null;

  const rounds = Array.from(
    { length: Math.floor(Math.log2(leagueDetail.maxRound)) },
    (_, i) => leagueDetail.maxRound / 2 ** i,
  );

  return (
    <div className={styles.wrapper}>
      <Flicking
        viewportTag="div"
        cameraTag="ul"
        align="center"
        duration={500}
        autoResize={true}
        bound={true}
      >
        {rounds.map(roundValue => (
          <li
            key={roundValue}
            className={clsx(styles.roundFilterItem, {
              [styles.roundFilterFocused]: roundValue === currentRound,
              [styles.roundFilterDisabled]: roundValue < inProgressRound,
            })}
          >
            <Link
              href={{ pathname, query: { year, league, round: roundValue } }}
            >
              {formatRoundLabel(roundValue)}
            </Link>
          </li>
        ))}
      </Flicking>
      <div className={styles.divider} />
    </div>
  );
}
