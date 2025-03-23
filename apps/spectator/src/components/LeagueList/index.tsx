import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@hcc/ui';
import dayjs from 'dayjs';
import Link from 'next/link';

import useLeagueArchives from '@/src/queries/useLeagueArchives';

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

const LeagueList = ({ handleClose }: LeagueListProps) => {
  const { data: leagues } = useLeagueArchives<typeof YEARS_LIST>(YEARS_LIST);

  return (
    <>
      {YEARS_LIST.map((year) => (
        <Accordion type="single" key={year} defaultValue={`${YEARS_LIST[0]}`} collapsible>
          <AccordionItem value={year.toString()}>
            <AccordionTrigger className={styles.yearName}>{year}년도</AccordionTrigger>

            <AccordionContent>
              <ul className={styles.leagueList}>
                {leagues[year].map((league) => (
                  <li key={league.leagueId} className={styles.leagueItem}>
                    <Link
                      href={{
                        pathname: '/',
                        query: { year, league: league.leagueId },
                      }}
                      onClick={handleClose}
                    >
                      {league.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
};

export default LeagueList;
