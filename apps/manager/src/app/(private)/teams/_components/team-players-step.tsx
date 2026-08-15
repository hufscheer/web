import { CancelIcon, CloseIcon } from '@hcc/icons';
import { Button, colors, Input, Modal, Typography, toast } from '@hcc/ui';
import { Fragment, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import type { TeamFormType } from '~/api';
import type { SelectedPlayer } from '~/app/(private)/teams/_components/player-append-dialog';

import { PlayerAppendDialog } from '~/app/(private)/teams/_components/player-append-dialog';

import { AddPlayerBottomSheet } from './assistants/add-player-bottom-sheet';
import { FloatingActionButton } from './assistants/floating-action-button';

type Props = {
  onPrevious: () => void;
  isEditMode?: boolean;
};

export const TeamPlayersStep = ({ onPrevious, isEditMode }: Props) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isAssistantModalOpen, setIsAssistantModalOpen] = useState(false);
  const { control, watch } = useFormContext<TeamFormType>();
  const teamName = watch('name');
  const teamUnit = watch('unit');
  const teamColor = watch('teamColor');
  const sportType = watch('sportType');
  const logoImageUrl = watch('logoImageUrl');
  const { fields, append, remove } = useFieldArray({ control, name: 'teamPlayers' });

  const teamPlayers = watch('teamPlayers') || [];

  const isValid =
    teamPlayers.length > 0 &&
    teamPlayers.every(
      (player) =>
        !!player.name?.trim() && player.jerseyNumber !== undefined && player.jerseyNumber !== null,
    );

  const handleAssistantButtonClick = () => {
    if (fields.length > 0) setIsAssistantModalOpen(true);
    else setIsBottomSheetOpen(true);
  };

  const handleAppendPlayer = ({ playerId, name, studentNumber }: SelectedPlayer) => {
    const existingIndex = teamPlayers.findIndex((player) => player.playerId === playerId);
    if (existingIndex >= 0) {
      remove(existingIndex);
      return;
    }

    append({ playerId, name, studentNumber, jerseyNumber: 0 });
  };

  return (
    <Fragment>
      <div className="column h-full min-h-0">
        <PlayerAppendDialog
          onPlayerClick={handleAppendPlayer}
          selectedPlayerIds={teamPlayers.flatMap((player) =>
            player.playerId === undefined ? [] : [player.playerId],
          )}
        >
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

        <div className="column mt-4 min-h-0 flex-1 gap-3 overflow-y-auto">
          {fields.map((field, index) => (
            <div key={field.id} className="center-y gap-3">
              <div className="center-y flex-1 gap-3">
                <Input
                  size="lg"
                  placeholder="선수 이름"
                  value={field.name || '-'}
                  readOnly
                  onClick={() =>
                    toast.info('이름과 학번은 선수 관리에서 수정할 수 있어요', {
                      id: 'readonly-player-field',
                    })
                  }
                />

                <Input
                  size="lg"
                  placeholder="학번"
                  value={field.studentNumber || '-'}
                  readOnly
                  onClick={() =>
                    toast.info('이름과 학번은 선수 관리에서 수정할 수 있어요', {
                      id: 'readonly-player-field',
                    })
                  }
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
                      value={f.value ?? ''}
                      onChange={(e) => {
                        const num = e.target.valueAsNumber;
                        f.onChange(Number.isNaN(num) ? '' : num);
                      }}
                    />
                  )}
                />
              </div>

              <button
                type="button"
                className="shrink-0 cursor-pointer"
                onClick={() => remove(index)}
              >
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
              등록된 선수가 없습니다
            </Typography>
          )}
        </div>
        {!isEditMode && <FloatingActionButton onClick={handleAssistantButtonClick} />}

        {fields.length > 0 && (
          <div className="shrink-0 border-t border-neutral-100 bg-white pt-3">
            <div className="center-y justify-between">
              <Typography fontSize={13} color={colors.neutral500}>
                {fields.length}/50
              </Typography>
              <button type="button" className="text-xs text-neutral-400" onClick={() => remove()}>
                초기화
              </button>
            </div>
            <div className="mt-2 flex flex-nowrap gap-2 overflow-x-auto pb-1">
              {fields.map((field, index) => (
                <Button
                  key={field.id}
                  variant="subtle"
                  type="button"
                  className="center-y shrink-0 gap-1 rounded-full bg-blue-50 px-2 py-1.5 text-sm whitespace-nowrap text-blue-600"
                  onClick={() => remove(index)}
                  aria-label={`${field.name} 선택 해제`}
                >
                  <span>{field.name}</span>
                  <CloseIcon width={12} height={12} color="var(--color-primary-600)" />
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="column shrink-0 gap-2 bg-white pt-3 pb-5">
          <Button type="button" onClick={onPrevious} variant="subtle" size="lg">
            이전 단계
          </Button>
          <Button type="submit" size="lg" disabled={!isValid}>
            완료
          </Button>
        </div>
      </div>

      <Modal open={isAssistantModalOpen} onOpenChange={setIsAssistantModalOpen}>
        <Modal.Content className="w-[80vw] rounded-lg bg-white px-[17px] pt-[22px] pb-[17px]">
          <Modal.Title className="mb-2 text-lg font-semibold text-greyscale-900">
            추가된 선수 정보가 저장되지 않아요
          </Modal.Title>
          <Modal.Description className="mb-6 text-base whitespace-pre-line text-greyscale-300">
            {`어시스턴트를 사용하면 정보가 사라져요.\n계속 진행할까요?`}
          </Modal.Description>
          <div className="flex gap-[10px]">
            <Button
              variant="ghost"
              color="black"
              size="md"
              onClick={() => setIsAssistantModalOpen(false)}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              color="black"
              size="md"
              onClick={() => {
                setIsAssistantModalOpen(false);
                setIsBottomSheetOpen(true);
              }}
              className="flex-1"
            >
              계속하기
            </Button>
          </div>
        </Modal.Content>
      </Modal>

      <AddPlayerBottomSheet
        isOpen={isBottomSheetOpen}
        onOpenChange={setIsBottomSheetOpen}
        teamName={teamName}
        teamUnit={teamUnit}
        teamColor={teamColor}
        sportType={sportType}
        logoImageUrl={logoImageUrl}
      />
    </Fragment>
  );
};
