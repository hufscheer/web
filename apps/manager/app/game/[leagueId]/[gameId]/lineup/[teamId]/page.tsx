'use client';

import { rem, theme } from '@hcc/styles';
import { Button, Flex, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Layout from '@/components/Layout';
import useCreateLineupMutation from '@/hooks/mutations/useCreateLineupMutation';
import useLineupPlayerQuery from '@/hooks/queries/useLineupPlayerQuery';
import { LineupPayload } from '@/types/game';
import { LeaguePlayerWithIDPayload } from '@/types/league';

import PlayerCard from './_components/PlayerCard';

type PageProps = {
  params: { teamId: string };
};

export type PlayerWithCaptain = LeaguePlayerWithIDPayload & {
  isCaptain?: boolean;
};

export default function LineupEdit({ params }: PageProps) {
  const router = useRouter();
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerWithCaptain[]>(
    [],
  );

  const { data: players } = useLineupPlayerQuery(params.teamId);
  const { mutate: mutateSaveLineup, isPending } = useCreateLineupMutation();

  const handleClickAction = (player: PlayerWithCaptain) => {
    setSelectedPlayers(prev => {
      const index = prev.findIndex(p => p.id === player.id);

      if (index === -1) return [...prev, player];

      return prev.filter((_, i) => i !== index);
    });
  };

  const handleCaptain = (playerId: number) => {
    setSelectedPlayers(prev =>
      prev.map(p => ({
        ...p,
        isCaptain: p.id === playerId,
      })),
    );
  };

  const handleButtonRemoveAll = () => {
    setSelectedPlayers([]);
  };

  const handleButtonAddAll = () => {
    setSelectedPlayers(
      players?.map(player => ({
        ...player,
        isCaptain: false,
      })) as PlayerWithCaptain[],
    );
  };

  const handleSave = () => {
    if (isPending) return;
    if (!selectedPlayers.length) return alert('선발 선수를 선택해주세요.');
    if (selectedPlayers.filter(p => p.isCaptain).length !== 1)
      return alert('주장을 한 명 선택해주세요.');

    mutateSaveLineup(
      {
        teamId: params.teamId,
        payload: selectedPlayers.map(player => ({
          name: player.name,
          number: player.number,
          description: player.description,
          isCaptain: player.isCaptain || false,
        })) as LineupPayload[],
      },
      {
        onSuccess: () => {
          router.back();
        },
      },
    );
  };

  const SaveButton = () => {
    return (
      <Button variant="subtle" onClick={handleSave}>
        저장
      </Button>
    );
  };

  return (
    <Layout navigationTitle={'라인업 등록'} navigationMenu={<SaveButton />}>
      <Flex mt="xl" mb="xs" justify="space-between" align="center">
        <Text c="gray">선발</Text>
        <Button
          onClick={handleButtonRemoveAll}
          variant="light"
          color="red"
          size="xs"
          fz={14}
        >
          전체 제거
        </Button>
      </Flex>
      <ul>
        {!selectedPlayers.length ? (
          <Flex
            bg={theme.colors.gray[2]}
            c={theme.colors.gray[4]}
            style={theme => ({ borderRadius: theme.defaultRadius })}
            w="100%"
            justify="center"
            align="center"
            h={rem(60)}
          >
            등록된 라인업이 없습니다.
          </Flex>
        ) : (
          selectedPlayers?.map(player => (
            <li key={player.id}>
              <PlayerCard
                player={player}
                handleCaptain={handleCaptain}
                handleClickAction={handleClickAction}
                removable
              />
            </li>
          ))
        )}
      </ul>

      <Flex mt="xl" mb="xs" justify="space-between" align="center">
        <Text c="gray">후보</Text>
        <Button onClick={handleButtonAddAll} variant="light" size="xs" fz={14}>
          전체 등록
        </Button>
      </Flex>
      <ul>
        {players?.map(player => {
          if (selectedPlayers.find(p => p.id === player.id)) return null;

          return (
            <li key={player.id}>
              <PlayerCard
                player={player}
                handleCaptain={handleCaptain}
                handleClickAction={handleClickAction}
              />
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}
