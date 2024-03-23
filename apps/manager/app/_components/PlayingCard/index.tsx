import { CaretDownIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { Button, Flex, rem, Title } from '@mantine/core';
import Link from 'next/link';
import { Fragment } from 'react';

import Card from '@/components/Card';
import useGamesQuery from '@/hooks/queries/useGamesQuery';
import { LeagueType } from '@/types/league';
import { formatTime } from '@/utils/time';

import * as styles from './PlayingCard.css';

type PlayingCardProps = {
  leagues: LeagueType[] | undefined;
};

export default function PlayingCard({ leagues }: PlayingCardProps) {
  const playingLeagues = useGamesQuery(leagues || [], 'playing');

  return (
    <>
      {playingLeagues.map(({ leagueId, data, leagueName }) => (
        <Fragment key={leagueName}>
          <Title order={3} mt="lg" mb="xs" size={rem(20)}>
            {leagueName}
          </Title>
          <Flex direction="column" gap="xs">
            {data.map(game => (
              <Card.Root key={game.id}>
                <Card.Content
                  component={Link}
                  href={`/game/${leagueId}/${game.id}`}
                >
                  <div style={{ flex: 1 }}>
                    <Card.Title text="semibold">{game.gameName}</Card.Title>
                    <Card.SubContent>
                      {formatTime(game.startTime, 'YYYY.MM.DD')}
                    </Card.SubContent>
                  </div>
                  <Card.Action>
                    <Icon source={CaretDownIcon} className={styles.caret} />
                  </Card.Action>
                </Card.Content>
                <Card.Footer>
                  <Flex gap="xs">
                    <Button
                      fullWidth
                      component={Link}
                      variant="light"
                      href={`/game/${leagueId}/${game.id}/timeline`}
                    >
                      타임 라인
                    </Button>
                    <Button
                      fullWidth
                      component={Link}
                      variant="light"
                      href={`/game/${leagueId}/${game.id}/lineup`}
                    >
                      라인업
                    </Button>
                  </Flex>
                </Card.Footer>
              </Card.Root>
            ))}
          </Flex>
        </Fragment>
      ))}
    </>
  );
}
