'use client';

import Flicking from '@egjs/react-flicking';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

import useLeague from '@/queries/useLeague';

import * as styles from './GameFilter.css';

export default function LeagueFilter({ year }: { year: number }) {
  const flickingRef = useRef<Flicking | null>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { leagues } = useLeague(year);

  if (!leagues?.length) return <div>길이 부족</div>;

  const selectedLeague =
    Number(searchParams.get('league')) ||
    (leagues.find(league => league.isInProgress) || leagues[0]).leagueId;

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
            <Link
              href={{
                href: pathname,
                query: { year, league: league.leagueId },
              }}
            >
              {league.name}
            </Link>
          </li>
        ))}
      </Flicking>
    </div>
  );
}
