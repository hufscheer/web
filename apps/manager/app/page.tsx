'use client';

import { CaretDownIcon, ChatIcon, TrophyIcon } from '@hcc/icons';
import { Icon, Spinner } from '@hcc/ui';
import { Flex, Title } from '@mantine/core';
import Link from 'next/link';
import { Suspense } from 'react';

import Card from '@/components/Card';
import Layout from '@/components/Layout';
import useLeagueQuery from '@/hooks/queries/useLeagueQuery';

import PlayingCard from './_components/PlayingCard';
import * as styles from './page.css';

export default function Page() {
  const { data: leagues } = useLeagueQuery();

  return (
    <Layout navigationVisible={false}>
      <Suspense fallback={<Spinner />}>
        <PlayingCard leagues={leagues?.playing} />
      </Suspense>

      <Title order={2} className={styles.title} mt="lg" mb="xs">
        설정
      </Title>
      <Flex direction="column" gap="xs">
        <Card.Root>
          <Card.Content component={Link} href={`/league`}>
            <Icon source={TrophyIcon} />
            <div className={styles.content}>
              <Card.Title text="semibold">대회 관리</Card.Title>
            </div>
            <Card.Action>
              <Icon source={CaretDownIcon} className={styles.caret} />
            </Card.Action>
          </Card.Content>
        </Card.Root>
        <Card.Root>
          <Card.Content component={Link} href={`/report`}>
            <Icon source={ChatIcon} />
            <div className={styles.content}>
              <Card.Title text="semibold">응원톡 관리</Card.Title>
            </div>
            <Card.Action>
              <Icon source={CaretDownIcon} className={styles.caret} />
            </Card.Action>
          </Card.Content>
        </Card.Root>
      </Flex>
    </Layout>
  );
}
