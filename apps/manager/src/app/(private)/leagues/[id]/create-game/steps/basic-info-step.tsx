'use client';

import { Badge, Button, Input, Typography } from '@hcc/ui';
import { useCallback, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  type GameFormTeamType,
  type GameFormType,
  useSuspenseLeague,
  useSuspenseLeagueTeams,
} from '~/api';
import { InputSelect } from '~/components/ui/input-select';
import { getRoundOptions } from '~/constants/leagues';

type Props = {
  leagueId: number;
  onNext: () => void;
  onSubmit: () => void;
};

type Team = ReturnType<typeof useSuspenseLeagueTeams>['data'][number];

const useBasicInfoData = (leagueId: number) => {
  const { data: league } = useSuspenseLeague({ leagueId });
  const { data: teams } = useSuspenseLeagueTeams({ leagueId });

  const roundOptions = useMemo(
    () =>
      getRoundOptions(league.sportType)
        .filter((item) => league.maxRound >= item.round)
        .map((item) => ({ value: item.value.toString(), label: item.label })),
    [league.maxRound, league.sportType],
  );

  const teamOptions = useMemo(
    () =>
      teams.map((t) => ({
        value: t.leagueTeamId.toString(),
        label: t.teamName,
      })),
    [teams],
  );

  return { teams, roundOptions, teamOptions };
};

const useTeamSelectHandler = (teams: Team[]) => {
  const { setValue } = useFormContext<GameFormType>();

  return useCallback(
    (teamNum: 1 | 2, leagueTeamIdStr: string) => {
      const target = teams.find((t) => t.leagueTeamId.toString() === leagueTeamIdStr);
      if (!target) return;
      setValue(`team${teamNum}.teamId`, target.teamId);
      setValue(`team${teamNum}.leagueTeamId`, target.leagueTeamId);
      setValue(`team${teamNum}.lineupPlayers`, []);
    },
    [teams, setValue],
  );
};

const isTeamLineupComplete = (team: GameFormTeamType) =>
  team.lineupPlayers.some((p) => p.state === 'STARTER') &&
  team.lineupPlayers.some((p) => p.isCaptain);

const useBasicInfoDerived = () => {
  const { watch } = useFormContext<GameFormType>();
  const [name, round, startTime, team1, team2] = watch([
    'name',
    'round',
    'startTime',
    'team1',
    'team2',
  ]);

  const isBasicValid = Boolean(
    name?.trim() &&
    round &&
    startTime &&
    team1?.leagueTeamId &&
    team2?.leagueTeamId &&
    team1.leagueTeamId !== team2.leagueTeamId,
  );

  const team1LineupDone = isTeamLineupComplete(team1);
  const team2LineupDone = isTeamLineupComplete(team2);
  const isSubmitReady = isBasicValid && team1LineupDone && team2LineupDone;

  return {
    team1Selected: Boolean(team1?.leagueTeamId),
    team2Selected: Boolean(team2?.leagueTeamId),
    team1LineupDone,
    team2LineupDone,
    isBasicValid,
    isSubmitReady,
  };
};

const LineupBadge = ({ done }: { done: boolean }) => {
  if (!done) return null;
  return (
    <Badge variant="primary" size="sm">
      ✓ 라인업
    </Badge>
  );
};

export const BasicInfoStep = ({ leagueId, onNext, onSubmit }: Props) => {
  const { register, control } = useFormContext<GameFormType>();
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

        <Typography className="mt-6" weight="semibold">
          참가 팀
        </Typography>

        <div className="column mt-4 gap-3">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Controller
                name="team1.leagueTeamId"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    label="팀 선택 1"
                    options={teamOptions}
                    value={field.value?.toString()}
                    onValueChange={(v) => handleTeamChange(1, v)}
                  />
                )}
              />
            </div>
            {team1Selected && <LineupBadge done={team1LineupDone} />}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Controller
                name="team2.leagueTeamId"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    label="팀 선택 2"
                    options={teamOptions}
                    value={field.value?.toString()}
                    onValueChange={(v) => handleTeamChange(2, v)}
                  />
                )}
              />
            </div>
            {team2Selected && <LineupBadge done={team2LineupDone} />}
          </div>
        </div>
      </div>

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
    </div>
  );
};
