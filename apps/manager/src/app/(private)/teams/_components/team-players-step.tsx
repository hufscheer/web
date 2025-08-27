import { CancelIcon } from '@hcc/icons';
import { Button, colors, Input, Typography, toast } from '@hcc/ui';
import { Fragment } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { type TeamFormType, useSuspensePlayers } from '~/api';
import { PlayerAppendDialog } from '~/app/(private)/teams/_components/player-append-dialog';

type Props = {
  onPrevious: () => void;
};

export const TeamPlayersStep = ({ onPrevious }: Props) => {
  const { control, watch } = useFormContext<TeamFormType>();
  const { fields, append, remove } = useFieldArray({ control, name: 'teamPlayers' });

  const { data } = useSuspensePlayers();

  const teamPlayers = watch('teamPlayers') || [];

  const isValid = teamPlayers.length > 0;

  const handleAppendPlayer = (id: number) => {
    if (teamPlayers.find(player => player.playerId === id)) {
      toast.error('이 선수는 이미 추가되었어요.');
      return;
    }

    append({ playerId: id, jerseyNumber: 0 });
  };

  return (
    <Fragment>
      <PlayerAppendDialog onPlayerClick={handleAppendPlayer}>
        <Typography
          className="w-full cursor-pointer rounded-lg border border-neutral-100 px-3 py-2.5 text-left"
          color={colors.neutral400}
          asChild
        >
          <button type="button">선수 이름을 검색하세요</button>
        </Typography>
      </PlayerAppendDialog>

      <Typography className="mt-4" weight="semibold">
        선수
      </Typography>

      <div className="column mt-4 gap-3">
        {fields.map((field, index) => (
          <div key={field.id} className="center-y gap-3">
            <div className="center-y flex-1 gap-3">
              <Input
                size="lg"
                placeholder="선수 이름"
                value={data.find(player => player.playerId === field.playerId)?.name ?? '-'}
                disabled
                readOnly
              />

              <Input
                size="lg"
                placeholder="학번"
                value={
                  data.find(player => player.playerId === field.playerId)?.studentNumber ?? '-'
                }
                disabled
                readOnly
              />

              <Controller
                name={`teamPlayers.${index}.jerseyNumber`}
                control={control}
                render={({ field: f }) => (
                  <Input
                    {...f}
                    id={`jerseyNumber-${field.id}`}
                    size="lg"
                    type="number"
                    placeholder="등번호"
                  />
                )}
              />
            </div>

            <button type="button" className="shrink-0 cursor-pointer" onClick={() => remove(index)}>
              <CancelIcon className="text-[var(--color-danger-600)]" size={24} />
            </button>
          </div>
        ))}

        {fields.length === 0 && (
          <Typography
            className="text-center"
            fontSize={14}
            weight="medium"
            color={colors.neutral500}
          >
            선수를 추가해주세요.
          </Typography>
        )}
      </div>

      <div className="column mt-6 w-full gap-2">
        <Button type="button" onClick={onPrevious} variant="subtle" color="black" size="lg">
          이전 단계
        </Button>
        <Button type="submit" size="lg" color="black" disabled={!isValid}>
          완료
        </Button>
      </div>
    </Fragment>
  );
};
