import { Button, Input, Select, Typography } from '@hcc/ui';
import { useFormContext } from 'react-hook-form';
import type { GameFormType } from '~/api';
import { categories } from '~/constants/team';

type Props = {
  onNext: () => void;
};

export const GameBasicInfoStep = ({ onNext }: Props) => {
  const { register } = useFormContext<GameFormType>();

  const isValid = true;

  return (
    <>
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
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>

        <Select
          {...register('quarter', { required: '쿼터는 필수 입력값이에요.' })}
          size="lg"
          placeholder="쿼터"
          required
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>

        <Select
          {...register('state', { required: '상황은 필수 입력값이에요.' })}
          size="lg"
          placeholder="상황"
          required
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>

        <Select
          {...register('state', { required: '시작 일시는 필수 입력값이에요.' })}
          size="lg"
          placeholder="시작 일시"
          required
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </div>

      <Typography className="mt-4 mb-2" weight="semibold">
        참가 팀
      </Typography>

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
