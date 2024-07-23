import { LeagueDetailType, stateMap, StateType } from '@hcc/api';
import { Button, Tag } from '@hcc/ui';
import Link from 'next/link';
import { Fragment } from 'react';

import Card from '@/components/Card';
import Divider from '@/components/Divider';
import { formatTime } from '@/utils/time';

import * as styles from './LeagueCard.css';

type LeagueCardProps = {
  leagues: LeagueDetailType[];
};

const LeagueCard = ({ leagues }: LeagueCardProps) => {
  return (
    <>
      {leagues?.map(({ leagueId, league }, index) => {
        const state: StateType = league.isInProgress
          ? 'playing'
          : league.maxRound === league.inProgressRound
            ? 'scheduled'
            : 'finished';

        return (
          <Fragment key={leagueId}>
            <Card.Root>
              <div className={styles.leagueHeader}>
                <Tag
                  colorScheme={state === 'playing' ? 'primary' : 'secondary'}
                >
                  {stateMap[state]}
                </Tag>
                <h3 className={styles.leagueName}>{league.name}</h3>
              </div>

              <hr className={styles.divider} />

              <Card.Content gap={10}>
                <p className={styles.leagueDetailText}>
                  <strong>라운드</strong>&nbsp;{league.maxRound}
                </p>
                <p className={styles.leagueDetailText}>
                  <strong>기간</strong>&nbsp;
                  {formatTime(league.startAt, 'YYYY.MM.DD.')} ~&nbsp;
                  {formatTime(league.endAt, 'YYYY.MM.DD.')}
                </p>
              </Card.Content>

              <Card.Footer>
                <Button colorScheme="secondary" size="xs" asChild fullWidth>
                  <Link href={`/league/${leagueId}/manage-team`}>
                    참가 팀 관리
                  </Link>
                </Button>
                <Button colorScheme="secondary" size="xs" asChild fullWidth>
                  <Link href={`/league/${leagueId}/manage`}>
                    기본 정보 수정
                  </Link>
                </Button>
              </Card.Footer>
            </Card.Root>

            {leagues?.length - 1 !== index && <Divider />}
          </Fragment>
        );
      })}
    </>
  );
};

export default LeagueCard;
