import Flicking from '@egjs/react-flicking';
import { clsx } from 'clsx';
import { useRef } from 'react';

import { useFilter } from '@/app/FilterContext';
import { useFilterParams } from '@/hooks/useFilterParams';

import * as styles from './GameFilter.css';

function calculateRounds(maxRound: number): number[] {
  const rounds: number[] = [];
  for (let round = maxRound; round >= 1; round /= 2) rounds.push(round);
  return rounds;
}

function formatRoundLabel(round: number): string {
  return round > 1 ? `${round}강` : `결승`;
}

export default function RoundFilter() {
  const flickingRef = useRef<Flicking | null>(null);
  const { maxRound, round } = useFilter();
  const { updateRound } = useFilterParams();

  const rounds = calculateRounds(maxRound || -1);

  return (
    <div className={styles.wrapper}>
      <Flicking
        ref={flickingRef}
        viewportTag="div"
        cameraTag="ul"
        align="center"
        duration={500}
        autoResize={true}
        bound={true}
      >
        {rounds.map((roundValue, index) => (
          <li
            key={index}
            className={clsx(
              styles.roundFilterItem,
              roundValue === Number(round) && styles.roundFilterFocused,
            )}
          >
            <button onClick={() => updateRound(roundValue)}>
              {formatRoundLabel(roundValue)}
            </button>
          </li>
        ))}
      </Flicking>
      <div className={styles.divider} />
    </div>
  );
}
