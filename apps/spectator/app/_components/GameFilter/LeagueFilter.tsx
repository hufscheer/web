import Flicking from '@egjs/react-flicking';
import { clsx } from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { useFilterContext } from '@/app/_contexts/FilterContext';
import { useFilterParams } from '@/hooks/useFilterParams';
import useLeague from '@/queries/useLeuage';

import * as styles from './GameFilter.css';

export default function LeagueFilter() {
  const flickingRef = useRef<Flicking | null>(null);

  const params = useSearchParams();
  const {
    year,
    league: selectedLeague,
    setLeague,
    setSport,
    setMaxRound,
    setRound,
  } = useFilterContext();
  const { leagues } = useLeague(year);
  const { updateLeague } = useFilterParams();

  useEffect(() => {
    if (!leagues) return;

    if (leagues.length > 0 && !selectedLeague) {
      if (params.get('league') === null) setLeague(leagues[0].leagueId);
      flickingRef.current?.moveTo(0);
    } else if (selectedLeague && leagues.length > 0) {
      const league = leagues.find(league => league.leagueId === selectedLeague);
      setMaxRound(league?.maxRound || 0);
      setRound(league?.inProgressRound || league?.maxRound || 0);
      flickingRef.current?.moveTo(league ? leagues.indexOf(league) : -1);
    }
  }, [
    leagues,
    params,
    selectedLeague,
    setLeague,
    setMaxRound,
    setRound,
    setSport,
  ]);

  if (!leagues) return null;

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
        {leagues.map(league => (
          <li
            key={league.leagueId}
            className={clsx(
              styles.leagueFilterItem,
              league.leagueId === selectedLeague && styles.focused,
            )}
          >
            <button onClick={() => updateLeague(league.leagueId)}>
              {league.name}
            </button>
          </li>
        ))}
      </Flicking>
    </div>
  );
}
