'use client';

import { rem } from '@hcc/styles';
import { Box, Flex } from '@mantine/core';
import { usePathname } from 'next/navigation';

import Layout from '@/components/Layout';
import useGameDetailQuery from '@/hooks/queries/useGameDetailQuery';

import GameCard from './_components/GameCard';

type PageProps = {
  params: { gameId: string; leagueId: string };
};

export default function GameInfoMap({ params }: PageProps) {
  const { data: game } = useGameDetailQuery(params.gameId);
  const pathname = usePathname();

  if (!game) return null;

  return (
    <Layout navigationTitle={game?.gameName}>
      <Box mb="lg">
        <GameCard href={`${pathname}/detail`}>게임 정보</GameCard>
      </Box>
      <Flex direction="column" gap={rem(4)}>
        <GameCard href={`${pathname}/lineup`}>라인업</GameCard>
        <GameCard href={`${pathname}/timeline`}>타임라인</GameCard>
      </Flex>
    </Layout>
  );
}
