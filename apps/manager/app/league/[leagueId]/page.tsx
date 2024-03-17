'use client';

import { Flex } from '@mantine/core';
import { usePathname } from 'next/navigation';

import Layout from '@/components/Layout';
import useLeagueQuery from '@/hooks/queries/useLeagueQuery';

import LeagueMenuCard from './_components/LeagueMenuCard';

export default function LeagueInfoMap() {
  const pathname = usePathname();

  const leagueId = Number(pathname.split('/').at(-2));
  const { data: leagues } = useLeagueQuery();

  const league = leagues?.finished.find(league => league.leagueId === leagueId);

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
