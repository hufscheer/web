import Flicking from '@egjs/react-flicking';
import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';

import { QUERY_PARAMS } from '@/constants/queryParams';
import useLeague from '@/queries/useLeuage';

import * as styles from './LeagueList.css';

type LeagueListProps = {
  year: string;
  selectedLeagueId: string;
  onClick: (key: string, value: string) => void;
};

export default function LeagueList({
  year,
  selectedLeagueId,
  onClick,
}: LeagueListProps) {
  const { leagueList } = useLeague(year);
  const flickingRef = useRef<Flicking | null>(null);

  const selectedLeagueIndex = leagueList.findIndex(
    league => league.leagueId === Number(selectedLeagueId),
  );

  useEffect(() => {
    const flicking = flickingRef.current;

    if (flicking && selectedLeagueIndex >= 0) {
      flicking.moveTo(selectedLeagueIndex);
    }
  }, [selectedLeagueIndex]);

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
        {leagueList.map(league => (
          <li
            key={league.leagueId}
            className={clsx(
              styles.league.item,
              league.leagueId === Number(selectedLeagueId) && styles.focused,
            )}
          >
            <button
              onClick={() =>
                onClick(QUERY_PARAMS.league, String(league.leagueId))
              }
            >
              {league.name}
            </button>
          </li>
        ))}
      </Flicking>
    </div>
  );
}
