import { Box, Button, Text, TextInput } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import Image from 'next/image';

import AddButton from '@/components/AddButton';
import useCreateLeagueTeamMutation from '@/hooks/mutations/useCreateLeagueTeamMutation';

type LeagueTeamProps = {
  leagueId: number;
};

export default function LeagueTeam({ leagueId }: LeagueTeamProps) {
  const form = useForm({
    initialValues: { data: [{ names: '', logos: '' }] },
  });
  const { mutate: createLeagueTeam } = useCreateLeagueTeamMutation();

  return (
    <Box w="100%">
      {form.values.data.map((value, index) => (
        <Box key={index}>
          <TextInput
            label="팀명"
            {...form.getInputProps(`data.${index}.names`)}
          />
          <Dropzone
            accept={IMAGE_MIME_TYPE}
            {...form.getInputProps(`data.${index}.logos`)}
            onDrop={files => {
              form.values.data[index].logos = URL.createObjectURL(files[0]);
            }}
            w="100%"
            h="auto"
          >
            {form.values.data[index].logos ? (
              <Image
                src={value.logos}
                alt="preview image"
                onLoad={() => URL.revokeObjectURL(value.logos)}
                onLoadedData={() => URL.revokeObjectURL(value.logos)}
                width={100}
                height={100}
              />
            ) : (
              <Text ta="center">Drop images here</Text>
            )}
          </Dropzone>
        </Box>
      ))}

      <AddButton
        fullWidth
        onClick={() => form.insertListItem('data', { names: '', logos: '' })}
      >
        신규 팀 추가
      </AddButton>

      <Button
        onClick={() =>
          createLeagueTeam({
            leagueId,
            payload: form.values.data.reduce(
              (acc, cur) => {
                acc.names.push(cur.names);
                acc.logos.push(cur.logos);

                return acc;
              },
              { names: [] as string[], logos: [] as string[] },
            ),
          })
        }
      >
        대회 팀 완료
      </Button>
    </Box>
  );
}
