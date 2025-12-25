import { Button, Input, Typography } from '@hcc/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { type GameFormType, useSuspenseLeague, useSuspenseLeagueTeams } from '~/api';
import { InputSelect } from '~/components/ui/input-select';
import { quarterOptions, roundOptions, stateOptions } from '~/constants/leagues';

type Props = {
  leagueId: number;
  onNext: () => void;
};

export const GameBasicInfoStep = ({ leagueId, onNext }: Props) => {
  const { register, watch, setValue, control } = useFormContext<GameFormType>();
  const { data: league } = useSuspenseLeague({ leagueId });
  const { data: teams } = useSuspenseLeagueTeams({ leagueId });

  const watchedFields = watch([
    'name',
    'round',
    'quarter',
    'state',
    'startTime',
    'team1.leagueTeamId',
    'team2.leagueTeamId',
  ]);
  const [name, round, quarter, state, startTime, team1Id, team2Id] = watchedFields;

  const isValid = Boolean(
    name?.trim() &&
      round &&
      quarter &&
      state &&
      startTime &&
      team1Id &&
      team2Id &&
      team1Id !== team2Id,
  );
  const roundFilteredOptions = roundOptions
    .filter(item => league.maxRound >= item.round)
    .map(item => ({ value: item.value.toString(), label: item.label }));

  const quarterListOptions = Object.entries(quarterOptions).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const stateListOptions = Object.entries(stateOptions).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const teamOptions = teams.map(team => ({
    value: team.leagueTeamId.toString(),
    label: team.teamName,
  }));

  const handleTeamChange = (teamNum: 1 | 2, leagueTeamId: string) => {
    const selectedTeam = teams.find(team => team.leagueTeamId.toString() === leagueTeamId);
    if (selectedTeam) {
      setValue(`team${teamNum}.teamId`, selectedTeam.teamId);
      setValue(`team${teamNum}.leagueTeamId`, selectedTeam.leagueTeamId);
      setValue(`team${teamNum}.lineupPlayers`, []);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
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
                options={roundFilteredOptions}
                value={field.value?.toString()}
                onValueChange={field.onChange}
              />
            )}
          />

          <Controller
            name="quarter"
            control={control}
            render={({ field }) => (
              <InputSelect
                label="쿼터"
                options={quarterListOptions}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />

          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <InputSelect
                label="상황"
                options={stateListOptions}
                value={field.value}
                onValueChange={field.onChange}
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

        <Typography className="mt-5" weight="semibold">
          참가 팀
        </Typography>

        <div className="column mt-4 gap-3 pb-4">
          <Controller
            name="team1.leagueTeamId"
            control={control}
            render={({ field }) => (
              <InputSelect
                label="팀 선택 1"
                options={teamOptions}
                value={field.value?.toString()}
                onValueChange={val => {
                  field.onChange(val);
                  handleTeamChange(1, val);
                }}
              />
            )}
          />

          <Controller
            name="team2.leagueTeamId"
            control={control}
            render={({ field }) => (
              <InputSelect
                label="팀 선택 2"
                options={teamOptions}
                value={field.value?.toString()}
                onValueChange={val => {
                  field.onChange(val);
                  handleTeamChange(2, val);
                }}
              />
            )}
          />
        </div>
      </div>

      <div className="flex-shrink-0 border-gray-200 border-t bg-white pt-4">
        <Button
          type="button"
          className="w-full"
          size="lg"
          color="black"
          onClick={onNext}
          disabled={!isValid}
        >
          다음 단계
        </Button>
      </div>
    </div>
  );
};
