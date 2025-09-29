import { Button, Input, Select, Typography } from '@hcc/ui';
import { useFormContext } from 'react-hook-form';
import { type GameFormType, useSuspenseLeague, useSuspenseLeagueTeams } from '~/api';
import { quarterOptions, roundOptions, stateOptions } from '~/constants/leagues';

type Props = {
  leagueId: number;
  onNext: () => void;
};

export const GameBasicInfoStep = ({ leagueId, onNext }: Props) => {
  const { register, watch } = useFormContext<GameFormType>();
  const { data: league } = useSuspenseLeague({ leagueId });
  const { data: teams } = useSuspenseLeagueTeams({ leagueId });

  const watchedFields = watch([
    'name',
    'round',
    'quarter',
    'state',
    'startTime',
    'team1.teamId',
    'team2.teamId',
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
          {roundOptions
            .filter(item => league.maxRound >= item.round)
            .map(item => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
        </Select>

        <Select
          {...register('quarter', { required: '쿼터는 필수 입력값이에요.' })}
          size="lg"
          placeholder="쿼터"
          required
        >
          {Object.entries(quarterOptions).map(([quarter, value]) => (
            <option key={quarter} value={quarter}>
              {value}
            </option>
          ))}
        </Select>

        <Select
          {...register('state', { required: '상황은 필수 입력값이에요.' })}
          size="lg"
          placeholder="상황"
          required
        >
          {Object.entries(stateOptions).map(([state, value]) => (
            <option key={state} value={state}>
              {value}
            </option>
          ))}
        </Select>

        <Input
          {...register('startTime', { required: '시작 일시는 필수 입력값이에요.' })}
          size="lg"
          type="datetime-local"
          placeholder="시작 일시"
          required
        />
      </div>

      <Typography className="mt-5" weight="semibold">
        참가 팀
      </Typography>

      <div className="column mt-4 gap-3">
        <Select
          {...register('team1.teamId', { required: '팀 1은 필수 선택값이에요.' })}
          size="lg"
          placeholder="팀 선택 1"
          required
        >
          {teams.map(team => (
            <option key={team.teamId} value={team.teamId}>
              {team.teamName}
            </option>
          ))}
        </Select>

        <Select
          {...register('team2.teamId', { required: '팀 2는 필수 선택값이에요.' })}
          size="lg"
          placeholder="팀 선택 2"
          required
        >
          {teams.map(team => (
            <option key={team.teamId} value={team.teamId}>
              {team.teamName}
            </option>
          ))}
        </Select>
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
