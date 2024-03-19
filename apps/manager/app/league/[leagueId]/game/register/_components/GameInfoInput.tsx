import { theme } from '@hcc/styles';
import { Text, Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
import React from 'react';

import { GAMES } from '@/constants/games';
import { GameCreatePayload } from '@/types/game';

type GameInfoInputProps = {
  form: UseFormReturnType<GameCreatePayload>;
};

export function GameInfoInput({ form }: GameInfoInputProps) {
  return (
    <>
      <Text c={theme.colors.gray[4]}>경기 정보</Text>
      <TextInput
        label="명칭"
        placeholder="명칭을 입력해주세요."
        {...form.getInputProps('gameName')}
      />
      <Select
        label="라운드"
        data={GAMES.ROUND}
        placeholder="라운드를 선택해주세요."
        withAsterisk
        {...form.getInputProps('round')}
      />
      <Select
        label="종목"
        data={GAMES.SPORTS}
        placeholder="종목을 선택해주세요"
        withAsterisk
        {...form.getInputProps('sportsId')}
      />
      <DateInput
        valueFormat="YYYY.MM.DD HH:mm"
        placeholder="2000.00.00 00:00"
        withAsterisk
        {...form.getInputProps('startTime')}
      />
    </>
  );
}
