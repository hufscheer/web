import { ImageIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { Box, Button, Flex, Text, TextInput } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import Image from 'next/image';
import { FormEvent, useState } from 'react';

import AddButton from '@/components/AddButton';
import useCreateLeagueTeamMutation from '@/hooks/mutations/useCreateLeagueTeamMutation';

type LeagueTeamProps = {
  leagueId: number;
};

export default function LeagueTeam({ leagueId }: LeagueTeamProps) {
  const [formFields, setFormFields] = useState([{ name: '', logo: '' }]);

  const handleButtonPlus = () => {
    setFormFields(prev => [...prev, { name: '', logo: '' }]);
  };

  const handleChangeName = (index: number, value: string) => {
    setFormFields(prev => {
      const next = [...prev];
      next[index].name = value;
      return next;
    });
  };

  const handleDropLogo = (index: number, file: File) => {
    setFormFields(prev => {
      const next = [...prev];
      next[index].logo = URL.createObjectURL(file);
      return next;
    });
  };

  const { mutate: createLeagueTeam } = useCreateLeagueTeamMutation();

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();

    formFields.forEach((field, index) => {
      form.append(`names-${index + 1}`, field.name);
      form.append(`logos-${index + 1}`, field.logo);
    });

    createLeagueTeam({ leagueId, payload: form });
  };

  return (
    <Box w="100%">
      <form onSubmit={handleSubmitForm}>
        {formFields.map((field, index) => (
          <Box key={index} mb="lg">
            <Text fz="lg" mb="sm">
              팀 {index + 1}
            </Text>
            <TextInput
              label="팀명"
              name={`names-${index + 1}`}
              value={field.name}
              onChange={e => handleChangeName(index, e.currentTarget.value)}
              placeholder="팀명을 입력하세요."
            />

            <Dropzone
              // loading
              accept={IMAGE_MIME_TYPE}
              name={`logos-${index + 1}`}
              onDrop={([file]) => handleDropLogo(index, file)}
              w="100%"
              h="auto"
              mih={100}
            >
              <Flex justify="center" align="center" h="100">
                {field.logo ? (
                  <Image
                    src={field.logo}
                    alt="팀 로고"
                    width={100}
                    height={100}
                  />
                ) : (
                  <Icon source={ImageIcon} />
                )}
              </Flex>
            </Dropzone>
          </Box>
        ))}
        <Button type="submit">대회 팀 완료</Button>
      </form>

      <AddButton onClick={handleButtonPlus}>팀 추가</AddButton>
    </Box>
  );
}
