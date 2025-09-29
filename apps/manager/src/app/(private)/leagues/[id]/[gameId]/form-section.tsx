'use client';

import { Button, Input, Select, Typography, toast } from '@hcc/ui';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { type GameUpdateFormType, useSuspenseGame, useSuspenseLeague, useUpdateGames } from '~/api';
import { quarterOptions, roundOptions, stateOptions } from '~/constants/leagues';
import { handleFormError } from '~/utils/form-util';

type Props = {
  leagueId: number;
  gameId: number;
};

export const FormSection = ({ leagueId, gameId }: Props) => {
  const router = useRouter();
  const { data: league } = useSuspenseLeague({ leagueId });
  const { data } = useSuspenseGame({ gameId });

  const { register, handleSubmit } = useForm<GameUpdateFormType>({
    defaultValues: { ...data, name: data.gameName, quarter: data.gameQuarter },
  });

  const { mutate } = useUpdateGames();

  const handleFormSubmit = (data: GameUpdateFormType) => {
    mutate(
      { ...data, leagueId, gameId },
      {
        onSuccess: () => {
          toast.success('경기가 수정되었습니다.');
          router.back();
        },
        onError: error => {
          console.log(`[manager/leagues/${leagueId}]`, error);
          toast.error('경기 수정에 실패했습니다. 잠시 후 다시 시도해주세요.');
        },
      },
    );
  };

  return (
    <form
      className="w-full bg-white p-4"
      onSubmit={handleSubmit(handleFormSubmit, handleFormError)}
    >
      <Typography weight="semibold">경기 정보</Typography>

      <div className="column mt-4 gap-3">
        <Input
          {...register('name', { required: '명칭은 필수 입력값이에요.' })}
          size="lg"
          type="text"
          placeholder="명칭"
        />

        <Select
          {...register('round', { required: '라운드는 필수 입력값이에요.' })}
          size="lg"
          placeholder="라운드"
          required
        >
          {roundOptions
            .filter(item => league.maxRound >= item.round)
            .map(item => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
        </Select>

        <Select
          {...register('quarter', { required: '쿼터는 필수 입력값이에요.' })}
          size="lg"
          placeholder="쿼터"
          required
        >
          {Object.entries(quarterOptions).map(([quarter, value]) => (
            <option key={quarter} value={quarter}>
              {value}
            </option>
          ))}
        </Select>

        <Select
          {...register('state', { required: '상황은 필수 입력값이에요.' })}
          size="lg"
          placeholder="상황"
          required
        >
          {Object.entries(stateOptions).map(([state, value]) => (
            <option key={state} value={state}>
              {value}
            </option>
          ))}
        </Select>

        <Input
          {...register('startTime', { required: '시작 일시는 필수 입력값이에요.' })}
          size="lg"
          type="datetime-local"
          placeholder="시작 일시"
          required
        />
      </div>

      <Button className="mt-4 w-full" color="black" type="submit" size="lg">
        경기 수정
      </Button>
    </form>
  );
};
