'use client';

import { CaretDownIcon, ChatIcon, SoccerIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
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
      <Suspense fallback={<div>로딩</div>}>
        <PlayingCard leagues={leagues.playing} />
      </Suspense>

      <Title order={2} className={styles.title} mb="xs">
        설정
      </Title>
      <Flex direction="column" gap="xs">
        <Card.Root>
          <Card.Content component={Link} href={`/league`}>
            <Icon source={SoccerIcon} />
            <div className={styles.content}>
              <Card.Title text="semibold">대회 관리</Card.Title>
            </div>
            <Card.Action>
              <Icon source={CaretDownIcon} className={styles.caret} />
            </Card.Action>
          </Card.Content>
        </Card.Root>
        <Card.Root>
          <Card.Content component={Link} href={`/game`}>
            <Icon source={SoccerIcon} />
            <div className={styles.content}>
              <Card.Title text="semibold">경기 관리</Card.Title>
            </div>
            <Card.Action>
              <Icon source={CaretDownIcon} className={styles.caret} />
            </Card.Action>
          </Card.Content>
        </Card.Root>
        <Card.Root>
          <Card.Content component={Link} href={`/cheer-talk`}>
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
