import { useLeaguesManageOnManager } from '@hcc/api';
import { ChevronRightIcon } from '@hcc/icons';
import { Button, Icon, Tag } from '@hcc/ui';
import Link from 'next/link';
import { Fragment } from 'react';

import Card from '@/components/Card';
import Divider from '@/components/Divider';
import { formatTime } from '@/utils/time';

import * as styles from './styles.css';

const LeagueCard = () => {
  const { data: leagues } = useLeaguesManageOnManager();

  if (!leagues) return null;

  return (
    <>
      {leagues.map((league, index) => {
        return (
          <Fragment key={league.id}>
            <Card.Root>
              <div className={styles.leagueHeader}>
                <div className={styles.leagueTitle}>
                  <Tag colorScheme={league.leagueProgress === '진행 중' ? 'red' : 'secondary'}>
                    {league.leagueProgress}
                  </Tag>
                  <h3 className={styles.leagueName}>{league.name}</h3>
                </div>
                <Link className={styles.leagueLink} href={`/league/${league.id}`}>
                  <Icon source={ChevronRightIcon} size={12} />
                </Link>
              </div>

              <hr className={styles.divider} />

              <Card.Content gap={10}>
                <p className={styles.leagueDescription}>
                  <strong>참여</strong>&nbsp;{league.sizeOfLeagueTeams}개 팀
                </p>
                <p className={styles.leagueDescription}>
                  <strong>라운드</strong>&nbsp;{league.maxRound}강
                </p>
                <p className={styles.leagueDescription}>
                  <strong>기간</strong>&nbsp;
                  {formatTime(league.startAt, 'YYYY.MM.DD.')} ~&nbsp;
                  {formatTime(league.endAt, 'YYYY.MM.DD.')}
                </p>
              </Card.Content>

              <Card.Footer>
                <Button colorScheme="secondary" size="xs" asChild fullWidth>
                  <Link href={`/league/${league.id}/team`}>참가 팀 관리</Link>
                </Button>
                <Button colorScheme="secondary" size="xs" asChild fullWidth>
                  <Link href={`/league/${league.id}/cheer-talk`}>응원톡 관리</Link>
                </Button>
              </Card.Footer>
            </Card.Root>

            {leagues.length - 1 !== index && <Divider />}
          </Fragment>
        );
      })}
    </>
  );
};

export default LeagueCard;
