import { AddIcon, DeleteForeverIcon } from '@hcc/icons';
import { Button, Input, Select } from '@hcc/ui';
import { useId } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import type { TeamFormType } from '~/api';
import { useSuspensePlayers } from '~/api/queries/usePlayers';

type Props = {
  onPrevious: () => void;
};

export const TeamPlayersStep = ({ onPrevious }: Props) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<TeamFormType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'teamPlayers',
  });

  const { data: playersData } = useSuspensePlayers();
  const teamPlayers = watch('teamPlayers') || [];

  const submitDisabledId = useId();

  const handleAddPlayer = () => {
    append({ playerId: 0, jerseyNumber: 0 });
  };

  const handleRemovePlayer = (index: number) => {
    remove(index);
  };

  const getPlayerName = (playerId: number) => {
    const player = playersData?.find(p => p.playerId === playerId);
    return player?.name || '알 수 없는 플레이어';
  };

  // 유효성 검사
  const hasPlayers = teamPlayers.length > 0;
  const allPlayersValid = teamPlayers.every(
    player => player.playerId > 0 && player.jerseyNumber > 0,
  );

  const playerIds = teamPlayers.map(p => p.playerId).filter(id => id > 0);
  const jerseyNumbers = teamPlayers.map(p => p.jerseyNumber).filter(num => num > 0);

  const hasDuplicatePlayers = new Set(playerIds).size !== playerIds.length;
  const hasDuplicateJerseyNumbers = new Set(jerseyNumbers).size !== jerseyNumbers.length;

  const isValid =
    hasPlayers && allPlayersValid && !hasDuplicatePlayers && !hasDuplicateJerseyNumbers;

  // 유효성 검사 에러 메시지
  const getValidationErrors = () => {
    const errors: string[] = [];

    if (!hasPlayers) {
      errors.push('최소 1명의 플레이어를 추가해주세요');
    }

    if (!allPlayersValid) {
      errors.push('모든 플레이어의 정보를 올바르게 입력해주세요');
    }

    if (hasDuplicatePlayers) {
      errors.push('중복된 플레이어가 선택되었습니다');
    }

    if (hasDuplicateJerseyNumbers) {
      errors.push('중복된 등번호가 있습니다');
    }

    return errors;
  };

  const validationErrors = getValidationErrors();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="font-semibold text-gray-900 text-xl">팀 플레이어</h2>
        <p className="text-gray-600 text-sm">팀에 참가할 플레이어들을 추가해주세요.</p>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-3 rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-700 text-sm">플레이어 {index + 1}</h3>
              <Button
                type="button"
                onClick={() => handleRemovePlayer(index)}
                variant="ghost"
                size="sm"
                color="danger"
                className="p-1"
                aria-label={`플레이어 ${index + 1} 제거`}
              >
                <DeleteForeverIcon className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor={`playerId-${field.id}`}
                  className="mb-1 block font-medium text-gray-700 text-sm"
                >
                  플레이어 *
                </label>
                <Controller
                  name={`teamPlayers.${index}.playerId`}
                  control={control}
                  render={({ field: controllerField }) => (
                    <Select
                      {...controllerField}
                      id={`playerId-${field.id}`}
                      aria-describedby={
                        teamPlayers[index]?.playerId > 0 ? `player-${field.id}-info` : undefined
                      }
                    >
                      <option value="">플레이어를 선택하세요</option>
                      {playersData?.map(p => (
                        <option key={p.playerId} value={p.playerId}>
                          {p.name} ({p.studentNumber})
                        </option>
                      ))}
                    </Select>
                  )}
                />
                {teamPlayers[index]?.playerId > 0 && (
                  <p id={`player-${field.id}-info`} className="mt-1 text-gray-500 text-xs">
                    선택된 플레이어: {getPlayerName(teamPlayers[index].playerId)}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`jerseyNumber-${field.id}`}
                  className="mb-1 block font-medium text-gray-700 text-sm"
                >
                  등번호 *
                </label>
                <Controller
                  name={`teamPlayers.${index}.jerseyNumber`}
                  control={control}
                  render={({ field: controllerField }) => (
                    <Input
                      {...controllerField}
                      id={`jerseyNumber-${field.id}`}
                      type="number"
                      placeholder="등번호"
                      min="1"
                      max="99"
                      aria-describedby={`jersey-${field.id}-error`}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          onClick={handleAddPlayer}
          variant="subtle"
          size="lg"
          className="w-full"
        >
          <AddIcon className="mr-2 h-4 w-4" />
          플레이어 추가
        </Button>
      </div>

      {validationErrors.length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4" role="alert">
          <h4 className="mb-2 font-medium text-red-800 text-sm">다음 문제를 해결해주세요:</h4>
          <ul className="space-y-1 text-red-700 text-sm">
            {validationErrors.map((error, index) => (
              <li key={`validation-error-${index}-${error}`} className="flex items-center">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-red-400" />
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {(hasDuplicatePlayers || hasDuplicateJerseyNumbers) && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4" role="alert">
          <h4 className="mb-2 font-medium text-sm text-yellow-800">주의사항:</h4>
          <ul className="space-y-1 text-sm text-yellow-700">
            {hasDuplicatePlayers && (
              <li className="flex items-center">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                중복된 플레이어가 선택되었습니다
              </li>
            )}
            {hasDuplicateJerseyNumbers && (
              <li className="flex items-center">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                중복된 등번호가 있습니다
              </li>
            )}
          </ul>
        </div>
      )}

      {errors.teamPlayers && (
        <div className="text-red-600 text-sm" role="alert">
          {errors.teamPlayers.message}
        </div>
      )}

      <div className="flex space-x-3 pt-4">
        <Button type="button" onClick={onPrevious} variant="subtle" size="lg" className="flex-1">
          이전 단계
        </Button>
        <Button
          type="submit"
          disabled={!isValid}
          size="lg"
          color="black"
          className="flex-1"
          aria-describedby={!isValid ? submitDisabledId : undefined}
        >
          완료
        </Button>
      </div>
    </div>
  );
};
