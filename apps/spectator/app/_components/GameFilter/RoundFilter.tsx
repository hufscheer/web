'use client';

import Flicking from '@egjs/react-flicking';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import useLeagueDetailQuery from '@/queries/useLeagueDetail';

import * as styles from './styles.css';

type RoundFilterProps = {
  initialLeagueId: number;
};

export default function RoundFilter({ initialLeagueId }: RoundFilterProps) {
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
    <div className={styles.roundWrapper}>
      <Flicking
        viewportTag="div"
        cameraTag="ul"
        align="center"
        duration={500}
        autoResize={true}
        bound={true}
        gap={0}
      >
        {rounds.map(roundValue => (
          <li key={roundValue} className={styles.roundFilter}>
            <Link
              className={clsx(styles.roundFilterLink, {
                [styles.roundFilterFocused]: roundValue === currentRound,
                [styles.roundFilterDisabled]:
                  roundValue < leagueDetail?.inProgressRound,
              })}
              href={{ pathname, query: { year, league, round: roundValue } }}
            >
              {roundValue > 2 ? `${roundValue}강` : `결승`}
            </Link>
            <div
              className={clsx(styles.filterLine, {
                [styles.roundFilterLineFocused]: roundValue === currentRound,
              })}
            />
          </li>
        ))}
      </Flicking>
      <div className={styles.divider} />
    </div>
  );
}
