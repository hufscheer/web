import Flicking from '@egjs/react-flicking';
import { clsx } from 'clsx';
import { useRef } from 'react';

import { useFilterContext } from '@/app/_contexts/FilterContext';
import { useFilterParams } from '@/hooks/useFilterParams';

import * as styles from './GameFilter.css';

function formatRoundLabel(round: number): string {
  return round > 2 ? `${round}강` : `결승`;
}

export default function RoundFilter() {
  const flickingRef = useRef<Flicking | null>(null);
  const { maxRound, round } = useFilterContext();
  const { updateRound } = useFilterParams();

  if (!maxRound) return null;

  const rounds = Array.from(
    { length: Math.floor(Math.log2(maxRound)) },
    (_, i) => maxRound / 2 ** i,
  );

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
