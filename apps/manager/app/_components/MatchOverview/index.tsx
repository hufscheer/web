import { useGamesByLeagueList, StateType, stateMap } from '@hcc/api';
import { ChevronRightIcon } from '@hcc/icons';
import { Button, Icon, Tag } from '@hcc/ui';
import Link from 'next/link';
import { Fragment } from 'react';

import Card from '@/components/Card';
import Divider from '@/components/Divider';
import { formatTime } from '@/utils/time';

import * as styles from './MatchOverview.css';

type MatchOverviewProps = {
  state: StateType;
};

const MatchOverview = ({ state }: MatchOverviewProps) => {
  const { data } = useGamesByLeagueList({ state });

  return (
    <>
      {data.map(({ league, games }, index) => (
        <Fragment key={league.leagueId}>
          <div className={styles.leagueContainer}>
            <span className={styles.leagueContent}>
              <Tag colorScheme={state === 'PLAYING' ? 'primary' : 'secondary'}>
                {stateMap[state]}
              </Tag>
              <h3 className={styles.leagueName}>{league.name}</h3>
            </span>
            <Link
              className={styles.leagueLink}
              href={`/league/${league.leagueId}`}
            >
              전체 경기
              <Icon source={ChevronRightIcon} size={12} />
            </Link>
          </div>

          <Divider height={1} />

          {games.map((game, index) => (
            <Fragment key={game.id}>
              <Card.Root>
                <Card.Head>
                  <Tag colorScheme="red">{game.gameQuarter}</Tag>
                  {formatTime(game.startTime, 'YYYY.MM.DD. (ddd) HH:mm')}
                </Card.Head>
                <Card.Content marginTop={16} gap={8}>
                  <Card.GameScore
                    {...game.gameTeams[0]}
                    win={game.gameTeams[0].score > game.gameTeams[1].score}
                  />
                  <Card.GameScore
                    {...game.gameTeams[1]}
                    win={game.gameTeams[0].score < game.gameTeams[1].score}
                  />
                </Card.Content>
                <Card.Footer>
                  <Button colorScheme="secondary" size="xs" asChild fullWidth>
                    <Link
                      href={`/league/${league.leagueId}/${game.id}/timeline`}
                    >
                      타임라인 수정
                    </Link>
                  </Button>
                  <Button colorScheme="secondary" size="xs" asChild fullWidth>
                    <Link href={`/league/${league.leagueId}/${game.id}`}>
                      경기 관리
                    </Link>
                  </Button>
                </Card.Footer>
              </Card.Root>
              {games.length - 1 !== index && <Divider height={1} />}
            </Fragment>
          ))}

          {data.length - 1 !== index && <Divider height={6} />}
        </Fragment>
      ))}
    </>
  );
};

export default MatchOverview;
