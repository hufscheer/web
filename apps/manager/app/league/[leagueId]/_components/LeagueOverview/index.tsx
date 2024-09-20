'use client';
import { useLeague } from '@hcc/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Card from '@/components/Card';
import { formatTime } from '@/utils/time';

import * as styles from './LeaugeOverview.css';

type LeagueOverviewProps = {
  leagueId: string;
};

const LeagueOverview = ({ leagueId }: LeagueOverviewProps) => {
  const { data: league, isLoading, error } = useLeague(leagueId);

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && error) router.replace('/');
  }, [isLoading, error, router]);

  if (!league) return null;

  return (
    <Card.Root className={styles.container}>
      <div className={styles.headContainer}>
        <h3 className={styles.title}>{league.name}</h3>
        <Link className={styles.manageLink} href={`/league/${leagueId}/manage`}>
          상세 정보
        </Link>
      </div>
      <Card.Content marginTop={12} gap={10}>
        <p className={styles.description}>
          <strong>라운드</strong>&nbsp;{league.maxRound}
        </p>
        <p className={styles.description}>
          <strong>기간</strong>&nbsp;
          {formatTime(league.startAt, 'YYYY.MM.DD.')} ~&nbsp;
          {formatTime(league.endAt, 'YYYY.MM.DD.')}
        </p>
      </Card.Content>
    </Card.Root>
  );
};

export default LeagueOverview;
