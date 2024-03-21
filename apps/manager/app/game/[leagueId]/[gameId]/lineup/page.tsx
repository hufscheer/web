'use client';

import { CaretDownIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { Flex, Group, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

import Card from '@/components/Card';
import Layout from '@/components/Layout';
import useGameTeamsQuery from '@/hooks/queries/useGameTeamsQuery';

type PageProps = {
  params: { gameId: string; leagueId: string };
};

export default function Lineup({ params }: PageProps) {
  const pathname = usePathname();
  const { data: gameTeams } = useGameTeamsQuery(params.gameId);

  return (
    <Layout navigationTitle="라인업">
      <Flex direction="column" gap="sm">
        {gameTeams?.map((team, index) => (
          <Fragment key={team.gameTeamId}>
            <Text c="gray" mt="md">
              팀 {index + 1}
            </Text>
            <Card.Root>
              <Card.Content
                component={Link}
                href={`${pathname}${team.gameTeamId}`}
                justify="space-between"
              >
                <Group>
                  <Image
                    src={team.logoImageUrl}
                    alt={`${team.gameTeamName} logo`}
                    width={36}
                    height={36}
                    loading="lazy"
                  />
                  <Card.Title>{team.gameTeamName}</Card.Title>
                </Group>
                <Card.Action>
                  <Icon source={CaretDownIcon} transform="rotate(-90)" />
                </Card.Action>
              </Card.Content>
            </Card.Root>
          </Fragment>
        ))}
      </Flex>
    </Layout>
  );
}
