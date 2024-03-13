'use client';

import { CaretDownIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { Button, Flex, Text, rem } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';

import useLeagueQuery from '@/hooks/queries/useLeagueQuery';

import LeagueMenuCard from './_components/LeagueMenuCard';

export default function LeagueInfoMap() {
  const pathname = usePathname();
  const router = useRouter();

  const leagueId = Number(pathname.split('/')[2]);
  const { data: leagues } = useLeagueQuery();

  const league = leagues?.find(league => league.leagueId === leagueId);

  if (!league) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Flex h={rem(43)} align="center">
        <Button
          pos="absolute"
          p={0}
          bg="none"
          onClick={() => router.replace('/league')}
        >
          <Icon source={CaretDownIcon} style={{ transform: 'rotate(90deg)' }} />
        </Button>
        <Text flex={1} ta="center" size="md" fw="bold">
          {league.name}
        </Text>
      </Flex>
      <LeagueMenuCard href={`${pathname}/detail`} title="대회 정보 관리" />
      <LeagueMenuCard href={`${pathname}/team`} title="대회 팀 관리" />
      <LeagueMenuCard href={`${pathname}/game`} title="대회 게임 관리" />
    </div>
  );
}
