'use client';

import Flicking from '@egjs/react-flicking';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import * as styles from './GameFilter.css';

function formatRoundLabel(round: number): string {
  return round > 2 ? `${round}강` : `결승`;
}

type RoundFilterProps = {
  maxRound: number;
  inProgressRound: number;
};

export default function RoundFilter({
  maxRound,
  inProgressRound,
}: RoundFilterProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentRound = Number(searchParams.get('round')) || inProgressRound;
  const year = Number(searchParams.get('year'));
  const league = searchParams.get('league');

  if (!maxRound) return null;

  const rounds = Array.from(
    { length: Math.floor(Math.log2(maxRound)) },
    (_, i) => maxRound / 2 ** i,
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
            {roundValue < inProgressRound ? (
              formatRoundLabel(roundValue)
            ) : (
              <Link
                href={{
                  pathname,
                  query: { year, league, round: roundValue },
                }}
              >
                {formatRoundLabel(roundValue)}
              </Link>
            )}
          </li>
        ))}
      </Flicking>
      <div className={styles.divider} />
    </div>
  );
}
