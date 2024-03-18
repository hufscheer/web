import { CaretDownIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { Box, Flex, Title } from '@mantine/core';
import Link from 'next/link';

import Card from '@/components/Card';
import useLeagueQuery from '@/hooks/queries/useLeagueQuery';
import { formatTime } from '@/utils/time';

import * as styles from './LeagueCard.css';

type LeagueCardProps = {
  state: 'playing' | 'scheduled' | 'finished';
};

const titleMap = {
  playing: '진행 중',
  scheduled: '예정',
  finished: '종료',
};

export default function LeagueCard({ state }: LeagueCardProps) {
  const { data: leagues } = useLeagueQuery();

  return (
    <>
      <Title order={2} className={styles.title}>
        {titleMap[state]}
      </Title>
      {!leagues?.[state] ? (
        <Box>{titleMap[state]} 경기가 없습니다.</Box>
      ) : (
        <Flex direction="column" gap="xs">
          {leagues[state].map(league => (
            <Card.Root key={league.leagueId}>
              <Card.Content
                component={Link}
                href={`/league/${league.leagueId}`}
              >
                <div className={styles.content}>
                  <Card.Title text="semibold">{league.name}</Card.Title>
                  <Card.SubContent>
                    {formatTime(league.startAt, 'YYYY.MM.DD')}-
                    {formatTime(league.endAt, 'YYYY.MM.DD')}
                  </Card.SubContent>
                </div>
                <Icon source={CaretDownIcon} className={styles.caret} />
              </Card.Content>
            </Card.Root>
          ))}
        </Flex>
      )}
    </>
  );
}
