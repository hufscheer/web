import { SubtractIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { Flex, Text, TextInput } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import Image from 'next/image';

import AddButton from '@/components/AddButton';

type TeamFormProps = {
  form: ReturnType<
    typeof useForm<{
      name: string;
      logo: File | null;
      players: {
        id: number;
        name: string;
        description: string;
        playerNumber: number;
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
      playerNumber: 0,
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
            src={URL.createObjectURL(form.values.logo)}
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

      {form.values.players.map((_, index) => (
        <Flex key={index} align="center" mt="sm">
          <TextInput
            label="이름"
            placeholder="선수 이름"
            {...form.getInputProps(`players.${index}.name`)}
            style={{ flex: 1, marginRight: '8px' }}
            disabled={!edit}
          />
          <TextInput
            label="번호"
            placeholder="선수 번호"
            type="number"
            {...form.getInputProps(`players.${index}.playerNumber`)}
            style={{ width: '100px', marginRight: '8px' }}
            disabled={!edit}
          />
          {edit && (
            <button style={{ flex: '0.1' }} onClick={() => removePlayer(index)}>
              <Icon source={SubtractIcon} color="error" />
            </button>
          )}
        </Flex>
      ))}

      {edit && <AddButton onClick={addPlayer}>선수 추가</AddButton>}
    </>
  );
}
