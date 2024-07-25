'use client';
import { stateMap, StateType, useGames } from '@hcc/api';
import { Button, Tag } from '@hcc/ui';
import Link from 'next/link';

import Card from '@/components/Card';
import Divider from '@/components/Divider';
import { formatTime } from '@/utils/time';

import * as styles from './GameCard.css';

type GameCardProps = {
  leagueId: string;
  state: StateType;
};

const GameCard = ({ leagueId, state }: GameCardProps) => {
  const { data: games } = useGames(leagueId, state);

  if (!games) return null;

  return (
    <>
      <div className={styles.stateContainer}>{stateMap[state]}</div>
      <Divider />
      {games.length === 0 ? (
        <p className={styles.noGamesMessage}>경기가 없습니다.</p>
      ) : (
        games.map(game => (
          <Card.Root key={game.id}>
            <Card.Head>
              <Tag colorScheme={state === 'playing' ? 'primary' : 'secondary'}>
                {stateMap[state]}
              </Tag>
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
              <Button size="xs" colorScheme="secondary" asChild fullWidth>
                <Link href={`/league/${leagueId}/${game.id}/timeline`}>
                  타임라인 수정
                </Link>
              </Button>
              <Button size="xs" colorScheme="secondary" asChild fullWidth>
                <Link href={`/league/${leagueId}/${game.id}`}>
                  경기 정보 수정
                </Link>
              </Button>
            </Card.Footer>
          </Card.Root>
        ))
      )}
    </>
  );
};

export default GameCard;
