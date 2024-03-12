import Flicking from '@egjs/react-flicking';
import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';

import { QUERY_PARAMS } from '@/constants/queryParams';
import useSportsListByLeagueId from '@/queries/useSportsListByLeagueId';

import * as styles from './SportsList.css';

type SportsListProps = {
  selectedSportId: string;
  leagueId: string;
  onClick: (key: string, value: string) => void;
};

export default function SportsList({
  leagueId,
  selectedSportId,
  onClick,
}: SportsListProps) {
  const { sportList } = useSportsListByLeagueId(leagueId);
  const flickingRef = useRef<Flicking | null>(null);

  const selectedSportIndex = sportList.findIndex(
    sport => sport.sportId === Number(selectedSportId),
  );

  useEffect(() => {
    const flicking = flickingRef.current;

    if (flicking && selectedSportIndex >= 0) {
      flicking.moveTo(selectedSportIndex);
    }
  }, [selectedSportIndex]);

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
        {sportList.map(sport => (
          <li
            key={sport.sportId}
            className={clsx(
              styles.sport.item,
              sport.sportId === Number(selectedSportId) && styles.focused,
            )}
          >
            <button
              onClick={() =>
                onClick(QUERY_PARAMS.sports, String(sport.sportId))
              }
            >
              {sport.name}
            </button>
          </li>
        ))}
      </Flicking>
    </div>
  );
}
