import { Accordion } from '@hcc/ui';
import dayjs from 'dayjs';
import Link from 'next/link';

import useLeagues from '@/queries/useLeagues';

import * as styles from './LeagueList.css';

const START_YEAR = 2023;
const CURRENT_YEAR = dayjs().year();
const YEARS_LIST = Array.from(
  { length: CURRENT_YEAR - START_YEAR + 1 },
  (_, index) => CURRENT_YEAR - index,
);

export default function LeagueList() {
  const { leagues } = useLeagues<typeof YEARS_LIST>(YEARS_LIST);

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
                        query: { year, leagueId: league.leagueId },
                      }}
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
