import Flicking from '@egjs/react-flicking';
import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';

import { useFilterContext } from '@/app/_contexts/FilterContext';
import { useFilterParams } from '@/hooks/useFilterParams';
import useSports from '@/queries/useSports';

import * as styles from './GameFilter.css';

export default function SportFilter() {
  const flickingRef = useRef<Flicking | null>(null);

  const { league, sport: selectedSport, setSport } = useFilterContext();
  const { sports } = useSports(league);
  const { updateSport } = useFilterParams();

  useEffect(() => {
    if (sports && !selectedSport && sports.length > 0) {
      setSport(sports[0].sportId);
      flickingRef.current?.moveTo(0);
    } else if (selectedSport && sports) {
      flickingRef.current?.moveTo(
        sports.findIndex(sport => sport.sportId === selectedSport),
      );
    }
  }, [sports, selectedSport, setSport]);

  if (!sports || sports.length <= 1) return;

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
        {sports.map(sport => (
          <li
            key={sport.sportId}
            className={clsx(
              styles.sportFilterItem,
              sport.sportId === selectedSport && styles.focused,
            )}
          >
            <button onClick={() => updateSport(sport.sportId)}>
              {sport.name}
            </button>
          </li>
        ))}
      </Flicking>
    </div>
  );
}