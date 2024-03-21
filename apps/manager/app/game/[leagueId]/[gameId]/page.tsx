'use client';
import { Flex } from '@mantine/core';
import { useParams, usePathname } from 'next/navigation';

import Layout from '@/components/Layout';
import useGameDetailQuery from '@/hooks/queries/useGameDetailQuery';

import GameMenuCard from './_components/GameMenuCard';

export default function GameInfoMap() {
  const pathname = usePathname();
  const params = useParams();

  const gameId = params.gameId as string;

  const { data: game } = useGameDetailQuery(gameId);

  if (!game) return null;

  return (
    <Layout navigationTitle={game.gameName}>
      <Flex direction="column" gap="xs">
        <GameMenuCard href={`${pathname}/detail`} title="기본 정보" />
        <GameMenuCard href={`${pathname}/lineup`} title="라인업" />
        <GameMenuCard href={`${pathname}/timeline`} title="타임라인" />
      </Flex>
    </Layout>
  );
}
