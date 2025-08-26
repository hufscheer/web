import { Button, Input, Select, Typography } from '@hcc/ui';
import { Controller, useFormContext } from 'react-hook-form';
import type { TeamFormType } from '~/api';

type Props = {
  onNext: () => void;
};

export const TeamBasicInfoStep = ({ onNext }: Props) => {
  const { control, watch } = useFormContext<TeamFormType>();

  const isValid = Boolean(watch('name').trim() && watch('unit').trim() && watch('teamColor'));

  return (
    <>
      <Typography weight="semibold">팀 정보</Typography>

      <div className="column mt-4 gap-3">
        <Controller
          name="name"
          control={control}
          rules={{
            required: '팀명을 입력해주세요',
            minLength: { value: 2, message: '팀명은 2자 이상이어야 합니다' },
          }}
          render={({ field }) => <Input {...field} size="lg" type="text" placeholder="팀 이름" />}
        />

        <Controller
          name="logoImageUrl"
          control={control}
          rules={{
            pattern: {
              value: /^https?:\/\/.+/,
              message: '올바른 URL을 입력해주세요',
            },
          }}
          render={({ field }) => (
            <Input {...field} type="url" placeholder="https://example.com/logo.png" />
          )}
        />

        <Controller
          name="unit"
          control={control}
          rules={{ required: '소속 단위를 입력해주세요' }}
          render={({ field }) => <Select {...field} size="lg" placeholder="소속" />}
        />

        <Controller
          name="teamColor"
          control={control}
          rules={{ required: '팀 색상을 선택해주세요' }}
          render={({ field }) => (
            <Select {...field}>
              <option value="">색상을 선택하세요</option>
              <option value="#FF0000">빨강</option>
              <option value="#0000FF">파랑</option>
              <option value="#00FF00">초록</option>
              <option value="#FFFF00">노랑</option>
              <option value="#FF00FF">마젠타</option>
              <option value="#00FFFF">시안</option>
              <option value="#FFA500">주황</option>
              <option value="#800080">보라</option>
              <option value="#000000">검정</option>
              <option value="#FFFFFF">흰색</option>
            </Select>
          )}
        />
      </div>

      <Button
        type="button"
        className="mt-6 w-full"
        size="lg"
        color="black"
        onClick={onNext}
        disabled={!isValid}
      >
        다음 단계
      </Button>
    </>
  );
};
