'use client';

import { Flex } from '@mantine/core';
import { useParams, usePathname } from 'next/navigation';

import Layout from '@/components/Layout';
import useLeagueDetailQuery from '@/hooks/queries/useLeagueDetailQuery';

import LeagueMenuCard from './_components/LeagueMenuCard';

export default function LeagueInfoMap() {
  const pathname = usePathname();
  const params = useParams();

  const leagueId = Number(params.leagueId as string);
  const { data: league } = useLeagueDetailQuery(leagueId);

  if (!league) return null;

  return (
    <Layout navigationTitle={league.name}>
      <Flex direction="column" gap="xs">
        <LeagueMenuCard href={`${pathname}/detail`} title="대회 정보 관리" />
        <LeagueMenuCard href={`${pathname}/team`} title="대회 팀 관리" />
        <LeagueMenuCard href={`${pathname}/game`} title="대회 게임 관리" />
      </Flex>
    </Layout>
  );
}
