import Flicking from '@egjs/react-flicking';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { useFilter } from '@/app/FilterContext';
import useLeague from '@/queries/useLeuage';

import * as styles from './GameFilter.css';

export default function LeagueFilter() {
  const router = useRouter();
  const flickingRef = useRef<Flicking | null>(null);

  const {
    year,
    league: selectedLeague,
    setLeague,
    setMaxRound,
    setRound,
  } = useFilter();
  const { leagues } = useLeague(year);

  useEffect(() => {
    if (leagues.length > 0 && !selectedLeague) {
      setLeague(leagues[0].leagueId);
      flickingRef.current?.moveTo(0);
    } else if (selectedLeague && leagues.length > 0) {
      const league = leagues.find(league => league.leagueId === selectedLeague);
      setMaxRound(league?.maxRound || 0);
      setRound(league?.inProgressRound || league?.maxRound || 0);
      flickingRef.current?.moveTo(league ? leagues.indexOf(league) : -1);
    }
  }, [leagues, selectedLeague, setLeague, setMaxRound, setRound]);

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
            <button onClick={() => router.push('/?league=' + league.leagueId)}>
              {league.name}
            </button>
          </li>
        ))}
      </Flicking>
    </div>
  );
}
