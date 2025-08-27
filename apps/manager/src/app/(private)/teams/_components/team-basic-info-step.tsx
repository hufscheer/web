import { CheckCircleIcon, DeleteForeverIcon, FilterHdrIcon } from '@hcc/icons';
import { Button, Input, Select, Typography } from '@hcc/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import type { TeamFormType } from '~/api';
import { ImageUploader } from '~/components/ui';
import { categories, colorPalette } from '~/constants/team';

type Props = {
  onNext: () => void;
};

export const TeamBasicInfoStep = ({ onNext }: Props) => {
  const { register, control, watch } = useFormContext<TeamFormType>();

  const isValid = Boolean(watch('name').trim() && watch('unit').trim() && watch('teamColor'));

  return (
    <>
      <Typography weight="semibold">팀 정보</Typography>

      <div className="column mt-4 gap-3">
        <Controller
          name="logoImageUrl"
          control={control}
          render={({ field }) => {
            return (
              <div className="flex w-full justify-between rounded-lg border border-neutral-100 p-4">
                <ImageUploader onChange={file => field.onChange(file)}>
                  {src => (
                    <span className="center relative h-20 w-20 cursor-pointer overflow-hidden rounded-lg bg-neutral-50">
                      <FilterHdrIcon size={40} />

                      <span
                        className="absolute inset-0 h-20 w-20 bg-center bg-cover"
                        style={{
                          backgroundImage: `url(${
                            typeof field.value === 'string' ? `"${field.value}"` : src
                          })`,
                        }}
                      />
                    </span>
                  )}
                </ImageUploader>
                <button
                  className="center-y h-fit cursor-pointer gap-1 rounded-sm bg-[var(--color-danger-600)] p-1 text-white"
                  type="button"
                  onClick={() => field.onChange('')}
                >
                  <DeleteForeverIcon size={16} />
                  <Typography fontSize={12} weight="medium" asChild>
                    <span>이미지 삭제</span>
                  </Typography>
                </button>
              </div>
            );
          }}
        />

        <Input
          {...register('name', { required: '이름은 필수 입력값이에요.' })}
          size="lg"
          type="text"
          placeholder="팀 이름"
        />

        <Select
          {...register('unit', { required: '소속은 필수 입력값이에요.' })}
          size="lg"
          placeholder="소속"
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
        팀 색상
      </Typography>

      <Controller
        name="teamColor"
        control={control}
        rules={{ required: '팀 색상을 선택해주세요' }}
        render={({ field: { value, onChange } }) => (
          <div className="grid grid-cols-4 gap-3">
            {colorPalette.map(c => {
              const selected = value === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => onChange(c)}
                  aria-pressed={selected}
                  aria-label={`색상 ${c}`}
                  className={twMerge(
                    'relative flex aspect-square w-full cursor-pointer items-center justify-center rounded-lg transition-all duration-150',
                    selected ? 'ring-2 ring-black/60 ring-offset-0' : 'ring-0',
                  )}
                  style={{ backgroundColor: c }}
                >
                  {selected && <CheckCircleIcon size={32} className="text-black/60" />}
                </button>
              );
            })}
          </div>
        )}
      />

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
