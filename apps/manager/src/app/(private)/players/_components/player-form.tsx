import type { ComponentProps } from 'react';

import { Button, Input, Typography, toast } from '@hcc/ui';
import { type FieldErrors, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import type { PlayerFormType, TeamType } from '~/api';

type Props = {
  onSubmit: (data: PlayerFormType) => Promise<void> | void;
  initialData?: Partial<PlayerFormType> & { teams?: TeamType[] };
} & Omit<ComponentProps<'form'>, 'onSubmit'>;

export const PlayerForm = ({ className, onSubmit, initialData, ...props }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<PlayerFormType>({
    defaultValues: { name: '', studentNumber: '', ...initialData },
    mode: 'onChange',
  });

  const handleFormSubmit = (data: PlayerFormType) => {
    const result = onSubmit(data);
    if (result instanceof Promise) {
      return result;
    }
    return Promise.resolve();
  };

  const handleFormError = (errors: FieldErrors<PlayerFormType>) => {
    const messages = Object.values(errors)
      .map((error) => error?.message)
      .filter(Boolean);

    const [first, ...rest] = messages;
    const suffix = rest.length > 0 ? ` (외 ${rest.length}개의 오류)` : '';

    toast.error(`${first}${suffix}`);
  };

  return (
    <form
      className={twMerge('column w-full bg-white', className)}
      onSubmit={handleSubmit(handleFormSubmit, handleFormError)}
      {...props}
    >
      <Typography weight="semibold">선수 정보</Typography>

      <div className="column mt-4 gap-3">
        <Input
          size="lg"
          placeholder="이름"
          {...register('name', { required: '이름은 필수 입력값이에요.' })}
        />
        <Input
          size="lg"
          placeholder="학번"
          minLength={9}
          maxLength={10}
          {...register('studentNumber', {
            required: '학번을 입력해주세요.',
            minLength: { value: 9, message: '학번은 9자리에서 10자리 사이여야 합니다.' },
            maxLength: { value: 10, message: '학번은 9자리에서 10자리 사이여야 합니다.' },
            pattern: {
              value: /^\d+$/,
              message: '학번은 숫자만 입력해주세요.',
            },
          })}
        />
        <Input
          name="team"
          size="lg"
          placeholder="팀"
          defaultValue={
            initialData?.teams && initialData.teams.length > 0
              ? initialData.teams.map((team) => team.name).join(', ')
              : '소속팀이 존재하지 않아요.'
          }
          readOnly
          disabled
        />
      </div>

      <Button
        className="mt-6 w-full"
        size="lg"
        color="black"
        type="submit"
        disabled={!isValid}
        loading={isSubmitting}
      >
        완료
      </Button>
    </form>
  );
};
