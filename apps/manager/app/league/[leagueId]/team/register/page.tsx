'use client';

import { SubtractIcon } from '@hcc/icons';
import { theme } from '@hcc/styles';
import { Icon } from '@hcc/ui';
import { Flex, Text, TextInput } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import Image from 'next/image';

import AddButton from '@/components/AddButton';
import Layout from '@/components/Layout';
import { LeagueTeamPayload } from '@/types/league';

export default function Page() {
  const leagueTeam = useForm<LeagueTeamPayload>({
    initialValues: {
      names: [''],
      logos: [],
    },
  });

  const leaguePlayer = useForm({
    initialValues: {
      players: [{ name: '', description: null, playerNumber: 0 }],
    },
  });

  return (
    <Layout
      navigationTitle="대회 팀 생성"
      navigationMenu={<button>완료</button>}
    >
      <Text>로고</Text>
      <Dropzone
        accept={IMAGE_MIME_TYPE}
        onDrop={files => {
          const newLogoUrl = URL.createObjectURL(files[0]);
          leagueTeam.setFieldValue('logos', [newLogoUrl]);
        }}
        multiple={false}
        style={{ width: '100%', height: 'auto' }}
      >
        {leagueTeam.values.logos.length > 0 && (
          <Image
            src={leagueTeam.values.logos[0]}
            alt="Team logo"
            onLoad={() => URL.revokeObjectURL(leagueTeam.values.logos[0])}
            width={100}
            height={100}
          />
        )}
        {leagueTeam.values.logos.length === 0 && (
          <Text ta="center">Drop image here</Text>
        )}
      </Dropzone>

      <TextInput
        mt="lg"
        label="팀명"
        withAsterisk
        placeholder="필수 항목"
        {...leagueTeam.getInputProps('names.0')}
      />

      <Flex mt="lg">
        <Text flex={0.6}>이름</Text>
        <Text flex={0.3}>번호</Text>
        <Text flex={0.1}>-</Text>
      </Flex>
      {leaguePlayer.values.players.map((player, index) => (
        <Flex key={index} align="center">
          <TextInput
            label="이름"
            {...leaguePlayer.getInputProps(`players.${index}.name`)}
            placeholder="이름을 입력하세요."
            flex={0.6}
          />
          <TextInput
            label="번호"
            type="number"
            {...leaguePlayer.getInputProps(`players.${index}.playerNumber`)}
            placeholder="번호"
            flex={0.3}
          />
          <button
            style={{ flex: '0.1' }}
            onClick={() => leaguePlayer.removeListItem('players', index)}
          >
            <Icon source={SubtractIcon} color="error" />
          </button>
        </Flex>
      ))}
      <AddButton
        bg={theme.colors.white}
        onClick={() =>
          leaguePlayer.insertListItem('players', {
            name: '',
            backNumber: 0,
          })
        }
      >
        신규 선수 추가
      </AddButton>
    </Layout>
  );
}
