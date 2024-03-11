import { CaretDownIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { Title } from '@mantine/core';

import Card from '@/components/Card';
import useLeagueQuery from '@/hooks/queries/useLeagueQuery';
import { formatTime } from '@/utils/time';

import * as styles from './LeagueCard.css';

type LeagueCardProps = {
  title: '진행 중' | '예정' | '종료';
};

export default function LeagueCard({ title }: LeagueCardProps) {
  const { data: leagues } = useLeagueQuery();

  return (
    <>
      <Title order={2} className={styles.title}>
        {title}
      </Title>
      {(leagues || []).map(league => (
        <Card.Root key={league.leagueId}>
          <Card.Content>
            <div className={styles.content}>
              <Card.Title text="semibold">{league.name}</Card.Title>
              <Card.SubContent>
                {formatTime(league.startAt, 'YYYY.MM.DD')}-
                {formatTime(league.endAt, 'YYYY.MM.DD')}
              </Card.SubContent>
            </div>
            <Card.Action>
              <Icon source={CaretDownIcon} className={styles.caret} />
            </Card.Action>
          </Card.Content>
        </Card.Root>
      ))}
    </>
  );
}
