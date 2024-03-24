import { SubtractIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { ActionIcon, Grid, Text, TextInput } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import Image from 'next/image';

import AddButton from '@/components/AddButton';

type TeamFormProps = {
  form: ReturnType<
    typeof useForm<{
      name: string;
      logo: File | string | null;
      players: {
        id: number;
        name: string;
        description: string;
        number: number;
      }[];
    }>
  >;
  edit?: boolean;
};

export default function TeamForm({ form, edit = true }: TeamFormProps) {
  const handleDropLogo = (file: File) => {
    if (file === null) return form.setErrors({ logo: '로고를 업로드하세요.' });

    form.setFieldValue('logo', file);
  };

  const addPlayer = () => {
    const players = form.values.players.concat({
      id: -1,
      name: '',
      description: '',
      number: 0,
    });
    form.setFieldValue('players', players);
  };

  const removePlayer = (index: number) => {
    if (!edit) return;
    const players = form.values.players.filter((_, i) => i !== index);
    form.setFieldValue('players', players);
  };

  return (
    <>
      <Text>로고</Text>
      <Dropzone
        accept={IMAGE_MIME_TYPE}
        onDrop={([file]) => handleDropLogo(file)}
        multiple={false}
        style={{ width: '100%', height: 'auto' }}
        disabled={!edit}
      >
        {form.values.logo && (
          <Image
            src={
              typeof form.values.logo === 'string'
                ? form.values.logo
                : URL.createObjectURL(form.values.logo)
            }
            alt="Team logo"
            width={100}
            height={100}
          />
        )}
        {!form.values.logo && <Text>Drop image here</Text>}
      </Dropzone>
      <TextInput
        label="팀명"
        withAsterisk
        placeholder="필수 항목"
        disabled={!edit}
        {...form.getInputProps('name')}
      />

      <Grid grow>
        <Grid.Col span={7}>이름</Grid.Col>
        <Grid.Col span={2}>번호</Grid.Col>
        <Grid.Col span={0.5} />
      </Grid>
      {form.values.players.map((values, index) => (
        <Grid grow key={values.id}>
          <Grid.Col span={6}>
            <TextInput
              placeholder="선수 이름"
              {...form.getInputProps(`players.${index}.name`)}
              disabled={!edit}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <TextInput
              placeholder="선수 번호"
              type="number"
              {...form.getInputProps(`players.${index}.number`)}
              disabled={!edit}
            />
          </Grid.Col>
          <Grid.Col span={0.5}>
            {
              <ActionIcon
                h="100%"
                w="100%"
                onClick={() => removePlayer(index)}
                variant="subtle"
                disabled={!edit}
              >
                <Icon source={SubtractIcon} color={edit ? 'error' : 'gray'} />
              </ActionIcon>
            }
          </Grid.Col>
        </Grid>
      ))}

      {edit && <AddButton onClick={addPlayer}>선수 추가</AddButton>}
    </>
  );
}
