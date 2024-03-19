'use client';

import Flicking from '@egjs/react-flicking';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import useSports from '@/queries/useSports';

import * as styles from './GameFilter.css';

type SportFilterProps = {
  leagueId: number;
};

export default function SportFilter({ leagueId }: SportFilterProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const year = searchParams.get('year');
  const league = searchParams.get('league');
  const leagueTeam = searchParams.get('leagueTeam');

  const { sports } = useSports(leagueId);

  if (!sports || sports.length <= 1) return;

  const selectedSports = Number(searchParams.get('sports')) || '';

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
        <li>
          <Link
            href={{
              href: pathname,
              query: { year, league, leagueTeam, sports: '' },
            }}
            className={clsx(
              styles.sportFilterItem,
              selectedSports === '' && styles.focused,
            )}
          >
            전체
          </Link>
        </li>
        {sports.map(sport => (
          <li
            key={sport.sportId}
            className={clsx(
              styles.sportFilterItem,
              sport.sportId === selectedSports && styles.focused,
            )}
          >
            <Link
              href={{
                href: pathname,
                query: { year, league, leagueTeam, sports: sport.sportId },
              }}
            >
              {sport.name}
            </Link>
          </li>
        ))}
      </Flicking>
    </div>
  );
}
