import { CaretDownIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { Button, Flex, Title } from '@mantine/core';
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
  const playingLeagues = useGamesQuery(leagues || []);

  return (
    <>
      {playingLeagues.map(({ data, leagueName }) => (
        <Fragment key={leagueName}>
          <Title order={3} mb="xs">
            {leagueName}
          </Title>
          <Flex direction="column" gap="xs" mb="sm">
            {data.map(game => (
              <Card.Root key={game.id}>
                <Card.Content component={Link} href={`game/${game.id}`}>
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
              </Card.Root>
            ))}
          </Flex>
        </Fragment>
      ))}
    </>
  );
}
