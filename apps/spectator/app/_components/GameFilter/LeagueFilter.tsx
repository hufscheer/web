'use client';

import Flicking from '@egjs/react-flicking';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

import useLeague from '@/queries/useLeague';

import * as styles from './styles.css';

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
    <div className={styles.leagueWrapper}>
      <Flicking
        ref={flickingRef}
        viewportTag="div"
        cameraTag="ul"
        align="center"
        duration={500}
        autoResize={true}
        bound={true}
        gap={12}
      >
        {leagues.map(league => (
          <li key={league.leagueId} className={styles.filter}>
            <Link
              className={clsx(styles.filterLink, {
                [styles.filterFocused]: league.leagueId === selectedLeague,
              })}
              href={{
                href: pathname,
                query: { year, league: league.leagueId },
              }}
            >
              {league.name}
            </Link>
            <div
              className={clsx(styles.filterLine, {
                [styles.filterLineFocused]: league.leagueId === selectedLeague,
              })}
            />
          </li>
        ))}
      </Flicking>
    </div>
  );
}
