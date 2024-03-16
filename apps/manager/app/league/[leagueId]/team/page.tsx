'use client';

import { rem } from '@hcc/styles';
import { Button, Flex } from '@mantine/core';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { MouseEvent, useState } from 'react';

import Card from '@/components/Card';
import Layout from '@/components/Layout';
import useLeagueTeamQuery from '@/hooks/queries/useLeagueTeamQuery';

import LeagueTeamActionIcon from './_components/ActionIcon';

export default function LeagueTeamList() {
  const [edit, setEdit] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const leagueId = params.leagueId as string;

  const { data: leagueTeams } = useLeagueTeamQuery(leagueId);
  // const {} = useDeleteLeagueTeamMutation()

  if (!leagueTeams) return null;

  const handleClickCard = (e: MouseEvent<HTMLButtonElement>) => {
    if (!edit) return;

    e.preventDefault();
    alert('팀 삭제 API');
  };

  const handleClickMenuButton = () => {
    setEdit(prev => !prev);
  };

  if (!leagueTeams.length) {
    return (
      <Layout navigationTitle="대회 팀 관리">
        <Flex align="center" justify="center" style={{ height: '100%' }}>
          팀이 없습니다.
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout
      navigationTitle="대회 팀 관리"
      navigationMenu={
        <Button variant="subtle" onClick={handleClickMenuButton}>
          {edit ? '완료' : '편집'}
        </Button>
      }
    >
      <Flex direction="column" gap={rem(4)}>
        {leagueTeams.map(team => (
          <Card.Root key={team.id}>
            <Card.Content component={Link} href={`${pathname}${team.id}`}>
              <Card.Title style={{ flex: 1 }}>{team.name}</Card.Title>
              <Card.Action onClick={handleClickCard}>
                <LeagueTeamActionIcon edit={edit} />
              </Card.Action>
            </Card.Content>
          </Card.Root>
        ))}
      </Flex>
    </Layout>
  );
}
