import { Button, Input, Select, Typography } from '@hcc/ui';
import { useFormContext } from 'react-hook-form';
import { type GameFormType, useSuspenseLeague, useSuspenseLeagueTeams } from '~/api';
import { quarterOptions, roundOptions, stateOptions } from '~/constants/leagues';

type Props = {
  leagueId: number;
  onNext: () => void;
};

export const GameBasicInfoStep = ({ leagueId, onNext }: Props) => {
  const { register, watch, setValue } = useFormContext<GameFormType>();
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

  const handleTeam1Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTeam = teams.find(team => team.leagueTeamId.toString() === event.target.value);
    if (selectedTeam) {
      setValue('team1.teamId', selectedTeam.teamId);
      setValue('team1.leagueTeamId', selectedTeam.leagueTeamId);
      setValue('team1.lineupPlayers', []);
    }
  };

  const handleTeam2Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTeam = teams.find(team => team.leagueTeamId.toString() === event.target.value);
    if (selectedTeam) {
      setValue('team2.teamId', selectedTeam.teamId);
      setValue('team2.leagueTeamId', selectedTeam.leagueTeamId);
      setValue('team2.lineupPlayers', []);
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

        <div className="column mt-4 gap-3 pb-4">
          <Select
            size="lg"
            placeholder="팀 선택 1"
            required
            value={team1Id || ''}
            onChange={handleTeam1Change}
          >
            {teams.map(team => (
              <option key={team.leagueTeamId} value={team.leagueTeamId}>
                {team.teamName}
              </option>
            ))}
          </Select>

          <Select
            size="lg"
            placeholder="팀 선택 2"
            required
            value={team2Id || ''}
            onChange={handleTeam2Change}
          >
            {teams.map(team => (
              <option key={team.leagueTeamId} value={team.leagueTeamId}>
                {team.teamName}
              </option>
            ))}
          </Select>
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
