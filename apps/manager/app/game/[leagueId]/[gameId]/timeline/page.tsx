'use client';

import { SoccerIcon, SwitchIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { Button, Flex } from '@mantine/core';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import AsyncBoundary from '@/components/AsyncBoundary';
import Layout from '@/components/Layout';

import TimelineList from './_components/List';
import TimelineError from './_components/List/Error';

export default function Timeline() {
  const pathname = usePathname();
  const params = useParams();
  const gameId = params.gameId as string;

  if (!gameId) return null;

  return (
    <Layout navigationTitle="타임라인">
      <Flex gap="xs" mb="lg">
        <Button
          component={Link}
          href={`${pathname}score`}
          variant="white"
          type="button"
          size="lg"
          fz="md"
          fullWidth
          rightSection={<Icon source={SoccerIcon} />}
        >
          득점 추가
        </Button>
        <Button
          component={Link}
          href={`${pathname}replacement`}
          variant="white"
          type="button"
          size="lg"
          fz="md"
          fullWidth
          rightSection={<Icon source={SwitchIcon} />}
        >
          교체 추가
        </Button>
      </Flex>

      <AsyncBoundary errorFallback={props => <TimelineError {...props} />}>
        <TimelineList gameId={gameId} />
      </AsyncBoundary>
    </Layout>
  );
}
