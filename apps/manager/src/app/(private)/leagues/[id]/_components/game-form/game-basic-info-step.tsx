import { Button, Input, Typography } from '@hcc/ui';
import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { type GameFormType, useSuspenseLeague, useSuspenseLeagueTeams } from '~/api';
import { InputSelect } from '~/components/ui/input-select';
import { getRoundOptions } from '~/constants/leagues';

type Props = {
  leagueId: number;
  onNext: () => void;
};

export const GameBasicInfoStep = ({ leagueId, onNext }: Props) => {
  const { register, watch, setValue, control } = useFormContext<GameFormType>();
  const { data: league } = useSuspenseLeague({ leagueId });
  const { data: teams } = useSuspenseLeagueTeams({ leagueId });
  const isThirdPlaceMatchEnabled = league.thirdPlaceMatchEnabled === true;

  const watchedFields = watch([
    'name',
    'round',
    'startTime',
    'team1.leagueTeamId',
    'team2.leagueTeamId',
  ]);
  const [name, round, startTime, team1Id, team2Id] = watchedFields;
  const thirdPlaceMatch = watch('thirdPlaceMatch');

  const isValid = Boolean(
    name?.trim() && round && startTime && team1Id && team2Id && team1Id !== team2Id,
  );

  const roundFilteredOptions = useMemo(
    () =>
      getRoundOptions(league.sportType, isThirdPlaceMatchEnabled)
        .filter((item) => league.maxRound >= item.round)
        .map((item) => ({ value: item.value.toString(), label: item.label })),
    [isThirdPlaceMatchEnabled, league.maxRound, league.sportType],
  );

  const teamOptions = teams.map((team) => ({
    value: team.leagueTeamId.toString(),
    label: team.teamName,
  }));

  const handleTeamChange = (teamNum: 1 | 2, leagueTeamId: string) => {
    const selectedTeam = teams.find((team) => team.leagueTeamId.toString() === leagueTeamId);
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
                value={thirdPlaceMatch ? 'thirdPlaceMatch' : field.value?.toString()}
                onValueChange={(value) => {
                  const isThirdPlaceMatch = value === 'thirdPlaceMatch';
                  field.onChange(isThirdPlaceMatch ? 2 : Number(value));
                  setValue('thirdPlaceMatch', isThirdPlaceMatch);
                }}
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
                onValueChange={(val) => {
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
                onValueChange={(val) => {
                  field.onChange(val);
                  handleTeamChange(2, val);
                }}
              />
            )}
          />
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-gray-200 bg-white pt-4">
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
