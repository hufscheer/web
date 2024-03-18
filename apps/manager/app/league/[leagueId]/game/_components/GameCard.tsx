import { CaretDownIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { Button, Flex } from '@mantine/core';
import Link from 'next/link';

import Card from '@/components/Card';
import useGameQuery from '@/hooks/queries/useGameQuery';
import { GameState, LeagueType } from '@/types/league';
import { formatTime } from '@/utils/time';

import * as styles from '../page.css';

type PlayingCardProps = {
  league: LeagueType;
  state: GameState;
};

export default function GameCard({ league, state }: PlayingCardProps) {
  const { data } = useGameQuery(league, state);

  if (!data) return;

  return (
    <>
      <p className={styles.title}>
        {state === 'playing'
          ? '진행중'
          : state === 'scheduled'
            ? '예정'
            : '종료'}
      </p>
      <Flex direction="column" gap="xs" mt="md">
        {data.data.map(game => (
          <Card.Root key={game.id}>
            <Card.Content component={Link} href={`/game/${game.id}`}>
              <div style={{ flex: 1 }}>
                <Card.Title text="semibold">{game.gameName}</Card.Title>
                <Card.SubContent>
                  {formatTime(game.startTime, 'YYYY.MM.DD')}
                </Card.SubContent>
              </div>
              <Card.Action>
                <Icon
                  source={CaretDownIcon}
                  style={{ transform: 'rotate(-90deg)' }}
                />
              </Card.Action>
            </Card.Content>
            {state === 'playing' && (
              <Card.Footer>
                <Flex gap="xs">
                  <Button
                    fullWidth
                    component={Link}
                    variant="light"
                    href={`/game/${game.id}/timeline`}
                  >
                    타임 라인
                  </Button>
                  <Button
                    fullWidth
                    component={Link}
                    variant="light"
                    href={`/report`}
                  >
                    응원톡
                  </Button>
                </Flex>
              </Card.Footer>
            )}
          </Card.Root>
        ))}
      </Flex>
    </>
  );
}
