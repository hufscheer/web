import { theme } from '@hcc/styles';
import { Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { GameCreatePayload } from '@/types/game';

type VideoInputProps = {
  form: UseFormReturnType<GameCreatePayload>;
};

export default function VideoInput({ form }: VideoInputProps) {
  return (
    <>
      <Text mt="lg" c={theme.colors.gray[4]}>
        영상
      </Text>
      <TextInput
        label="URL"
        placeholder="유튜브 링크 혹은 빈 값 입력"
        {...form.getInputProps('videoId')}
      />
    </>
  );
}
