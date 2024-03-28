import { track } from '@amplitude/analytics-browser';
import { Accordion } from '@hcc/ui';
import dayjs from 'dayjs';
import Link from 'next/link';

import useLeagueArchives from '@/queries/useLeagueArchives';

import * as styles from './LeagueList.css';

const START_YEAR = 2023;
const CURRENT_YEAR = dayjs().year();
const YEARS_LIST = Array.from(
  { length: CURRENT_YEAR - START_YEAR + 1 },
  (_, index) => CURRENT_YEAR - index,
);

type LeagueListProps = {
  handleClose: () => void;
};

export default function LeagueList({ handleClose }: LeagueListProps) {
  const { data: leagues } = useLeagueArchives<typeof YEARS_LIST>(YEARS_LIST);

  const handleClickLeague = (year: number, leagueId: number, name: string) => {
    track(`leagueList | ${year}년도 ${name}(${leagueId})`, {
      clickEvent: `Select Archived League`,
    });

    handleClose();
  };

  return (
    <>
      {YEARS_LIST.map(year => (
        <Accordion type="single" key={year} defaultValue={`${YEARS_LIST[0]}`}>
          <Accordion.Item value={year.toString()}>
            <Accordion.Trigger className={styles.yearName}>
              {year}년도
            </Accordion.Trigger>

            <Accordion.Content>
              <ul className={styles.leagueList}>
                {leagues[year].map(league => (
                  <li key={league.leagueId} className={styles.leagueItem}>
                    <Link
                      href={{
                        pathname: '/',
                        query: { year, league: league.leagueId },
                      }}
                      onClick={() =>
                        handleClickLeague(year, league.leagueId, league.name)
                      }
                    >
                      {league.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      ))}
    </>
  );
}
