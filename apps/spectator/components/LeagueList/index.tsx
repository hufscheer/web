import { Accordion } from '@hcc/ui';
import dayjs from 'dayjs';
import Link from 'next/link';

import useLeagues from '@/queries/useLeagues';

import * as styles from './LeagueList.css';
import List from '../List';

const START_YEAR = 2023;
const CURRENT_YEAR = dayjs().year();
const YEARS_LIST = Array.from(
  { length: CURRENT_YEAR - START_YEAR + 1 },
  (_, index) => CURRENT_YEAR - index,
);

export default function LeagueList() {
  const { leagues } = useLeagues<typeof YEARS_LIST>(YEARS_LIST);

  return (
    <List lists={YEARS_LIST} className={styles.yearList}>
      {year => (
        <Accordion type="single" key={year}>
          <Accordion.Item value={year.toString()}>
            <Accordion.Trigger className={styles.yearName}>
              {year}년도
            </Accordion.Trigger>

            <Accordion.Content>
              <List
                lists={leagues[year] || []}
                _key="leagueId"
                className={styles.leagueList}
              >
                {league => (
                  <li className={styles.leagueItem}>
                    <Link
                      href={{
                        pathname: '/',
                        query: { year, leagueId: league.leagueId },
                      }}
                    >
                      {league.name}
                    </Link>
                  </li>
                )}
              </List>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      )}
    </List>
  );
}
