'use client';

import { Badge, Button, Input, Typography } from '@hcc/ui';
import { Controller, useFormContext } from 'react-hook-form';

import { type GameFormType } from '~/api';
import { InputSelect } from '~/components/ui/input-select';

import { useBasicInfoData } from './use-basic-infos';
import { useBasicInfoDerived } from './use-basic-infp-derived';
import { useTeamSelectHandler } from './use-team-select';

export const BasicInfoStep = ({ leagueId, onNext, onSubmit }: Props) => {
  const { teams, roundOptions, teamOptions } = useBasicInfoData(leagueId);
  const handleTeamChange = useTeamSelectHandler(teams);

  const {
    team1Selected,
    team2Selected,
    team1LineupDone,
    team2LineupDone,
    isBasicValid,
    isSubmitReady,
  } = useBasicInfoDerived();

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <GameInfoFields roundOptions={roundOptions} />

        <TeamSelectFields
          teamOptions={teamOptions}
          team1Selected={team1Selected}
          team2Selected={team2Selected}
          team1LineupDone={team1LineupDone}
          team2LineupDone={team2LineupDone}
          onTeamChange={handleTeamChange}
        />
      </div>

      <StepActions
        isBasicValid={isBasicValid}
        isSubmitReady={isSubmitReady}
        onNext={onNext}
        onSubmit={onSubmit}
      />
    </div>
  );
};

/* ----- pieces ----- */

type Props = {
  leagueId: number;
  onNext: () => void;
  onSubmit: () => void;
};

type TeamNum = 1 | 2;
type TeamOptions = ReturnType<typeof useBasicInfoData>['teamOptions'];
type RoundOptions = ReturnType<typeof useBasicInfoData>['roundOptions'];

const LineupBadge = ({ done }: { done: boolean }) => {
  if (!done) return null;
  return (
    <Badge variant="primary" size="sm">
      ✓ 라인업
    </Badge>
  );
};

const GameInfoFields = ({ roundOptions }: { roundOptions: RoundOptions }) => {
  const { register, control } = useFormContext<GameFormType>();

  return (
    <section>
      <Typography weight="semibold">경기 정보</Typography>

      <div className="column mt-4 gap-3">
        <Input
          {...register('name', { required: '명칭은 필수 입력값이에요.' })}
          size="lg"
          type="text"
          placeholder="명칭"
        />

        <Controller
          name="round"
          control={control}
          render={({ field }) => (
            <InputSelect
              label="라운드"
              options={roundOptions}
              value={field.value?.toString()}
              onValueChange={(v) => field.onChange(Number(v))}
            />
          )}
        />

        <Input
          {...register('startTime', {
            required: '시작 일시는 필수 입력값이에요.',
          })}
          size="lg"
          type="datetime-local"
          placeholder="시작 일시"
          required
        />
      </div>
    </section>
  );
};

type TeamSelectRowProps = {
  teamNum: TeamNum;
  teamOptions: TeamOptions;
  selected: boolean;
  lineupDone: boolean;
  onTeamChange: (teamNum: TeamNum, value: string) => void;
};

const TeamSelectRow = ({
  teamNum,
  teamOptions,
  selected,
  lineupDone,
  onTeamChange,
}: TeamSelectRowProps) => {
  const { control } = useFormContext<GameFormType>();
  const fieldName = `team${teamNum}.leagueTeamId` as const;

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <Controller
          name={fieldName}
          control={control}
          render={({ field }) => (
            <InputSelect
              label={`팀 선택 ${teamNum}`}
              options={teamOptions}
              value={field.value?.toString() || undefined}
              onValueChange={(v) => onTeamChange(teamNum, v)}
            />
          )}
        />
      </div>
      {selected && <LineupBadge done={lineupDone} />}
    </div>
  );
};

type TeamSelectFieldsProps = {
  teamOptions: TeamOptions;
  team1Selected: boolean;
  team2Selected: boolean;
  team1LineupDone: boolean;
  team2LineupDone: boolean;
  onTeamChange: (teamNum: TeamNum, value: string) => void;
};

const TeamSelectFields = ({
  teamOptions,
  team1Selected,
  team2Selected,
  team1LineupDone,
  team2LineupDone,
  onTeamChange,
}: TeamSelectFieldsProps) => (
  <section className="mt-6">
    <Typography weight="semibold">참가 팀</Typography>

    <div className="column mt-4 gap-3">
      <TeamSelectRow
        teamNum={1}
        teamOptions={teamOptions}
        selected={team1Selected}
        lineupDone={team1LineupDone}
        onTeamChange={onTeamChange}
      />
      <TeamSelectRow
        teamNum={2}
        teamOptions={teamOptions}
        selected={team2Selected}
        lineupDone={team2LineupDone}
        onTeamChange={onTeamChange}
      />
    </div>
  </section>
);

type StepActionsProps = {
  isBasicValid: boolean;
  isSubmitReady: boolean;
  onNext: () => void;
  onSubmit: () => void;
};

const StepActions = ({ isBasicValid, isSubmitReady, onNext, onSubmit }: StepActionsProps) => (
  <div className="flex-shrink-0 border-t border-gray-200 bg-white pt-4">
    <div className="column gap-2">
      <Button
        type="button"
        className="w-full"
        size="lg"
        color="primary"
        variant="subtle"
        disabled={!isBasicValid}
        onClick={onNext}
      >
        다음 단계
      </Button>
      <Button
        type="button"
        className="w-full"
        size="lg"
        color="black"
        disabled={!isSubmitReady}
        onClick={onSubmit}
      >
        경기 생성
      </Button>
    </div>
  </div>
);
