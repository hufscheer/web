import { ImageIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { Box, Button, Flex, Text, TextInput } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import Image from 'next/image';
import { FormEvent } from 'react';

import useCreateLeagueTeamMutation from '@/hooks/mutations/useCreateLeagueTeamMutation';

type LeagueTeamProps = {
  leagueId: number;
  handleTeamId: (id: number) => void;
  nextStep: () => void;
};

export default function LeagueTeam({
  leagueId,
  handleTeamId,
  nextStep,
}: LeagueTeamProps) {
  const form = useForm<{
    name: string;
    logo: File | null;
  }>({
    initialValues: {
      name: '',
      logo: null,
    },
    validate: {
      name: value => value.length < 2 && '팀명은 두 글자 이상입니다!',
    },
  });

  const handleDropLogo = (file: File) => {
    if (file === null) return form.setErrors({ logo: '로고를 업로드하세요.' });

    form.setFieldValue('logo', file);
  };

  const { mutate: createLeagueTeam, isPending } = useCreateLeagueTeamMutation();

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPending) return;
    if (!form.values.logo) return alert('로고를 업로드하세요.');

    form.validate();

    const payload = new FormData();
    const { name, logo } = form.values;

    payload.append('names', name);
    payload.append('logos', logo as File);

    createLeagueTeam(
      { leagueId, payload },
      {
        onSuccess: ({ teamIds }) => {
          const teamId = teamIds.pop();

          if (!teamId) return alert('팀 생성에 실패했습니다.');

          handleTeamId(teamId);
          nextStep();
        },
      },
    );
  };

  return (
    <Box w="100%">
      <form onSubmit={handleSubmitForm}>
        <Box mb="lg">
          <Text fz="lg" mb="sm">
            새로운 팀
          </Text>
          <TextInput
            withAsterisk
            label="팀명"
            {...form.getInputProps('name')}
            placeholder="팀명을 입력하세요."
          />

          <Dropzone
            accept={[MIME_TYPES.png]}
            {...form.getInputProps('logo')}
            onDrop={([file]) => handleDropLogo(file)}
            w="100%"
            h="auto"
            mih={100}
          >
            <Flex justify="center" align="center" h="100">
              {form.values.logo ? (
                <Image
                  src={URL.createObjectURL(form.values.logo)}
                  alt="팀 로고"
                  width={100}
                  height={100}
                />
              ) : (
                <Flex gap="sm">
                  <Icon source={ImageIcon} color="gray" />
                  <Text c="gray">
                    드래그 혹은 클릭하여 로고를 업로드하세요.
                  </Text>
                </Flex>
              )}
            </Flex>
          </Dropzone>
        </Box>
        <Button fullWidth type="submit">
          대회 팀 완료
        </Button>
      </form>
    </Box>
  );
}
