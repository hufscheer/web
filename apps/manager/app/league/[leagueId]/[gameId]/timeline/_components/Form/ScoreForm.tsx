import {
  GameTeamType,
  useGame,
  useGameLineupPlaying,
  useCreateScoreTimeline,
} from '@hcc/api';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import TimeInput from '@/components/TimeInput';
import { QUARTER_ID, QUARTER_KEY, QUARTERS_DB } from '@/constants/games';

import * as styles from './styles.css';
import {
  scoreDefaultValues,
  scoreFormSchema,
  ScoreFormSchema,
} from '../../_types';

type ScoreFormProps = {
  gameId: string;
  onClose?: () => void;
  quarter?: string;
};

const ScoreForm = ({ gameId, onClose, quarter }: ScoreFormProps) => {
  const { data: game } = useGame(gameId);
  const teams: GameTeamType[] = game?.gameTeams ?? [];

  const { data: lineupPlayingPlayers } = useGameLineupPlaying(gameId);

  const methods = useForm<ScoreFormSchema>({
    resolver: zodResolver(scoreFormSchema),
    defaultValues: scoreDefaultValues,
  });

  const { mutate: createScoreTimelineMutation, isPending } =
    useCreateScoreTimeline();

  const onSubmit = (data: ScoreFormSchema) => {
    if (isPending) return;

    createScoreTimelineMutation(
      {
        gameId,
        recordedAt: Number(data.recordedAt),
        recordedQuarterId: QUARTER_ID[data.recordedQuarterId as QUARTER_KEY],
        gameTeamId: Number(data.gameTeamId),
        scoreLineupPlayerId: Number(data.scoreLineupPlayerId),
      },
      {
        onSuccess: () => {
          methods.reset();
          if (onClose) onClose();
        },
        onError: () => {
          alert('error');
        },
      },
    );
  };

  const gameTeamId = methods.watch('gameTeamId');
  const players = useMemo(() => {
    return (
      lineupPlayingPlayers?.find(
        lineup => lineup.gameTeamId.toString() === gameTeamId,
      )?.gameTeamPlayers ?? []
    );
  }, [lineupPlayingPlayers, gameTeamId]);

  useEffect(() => {
    methods.setValue('scoreLineupPlayerId', '');
  }, [gameTeamId, methods]);

  if (!quarter)
    return (
      <p className={styles.emptyQuarterMessage}>
        상태 변경을 통해 쿼터 상태를 지정해주세요.
      </p>
    );

  return (
    <Form {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <h4 className={styles.sectionTitle}>상황</h4>
        <section className={styles.section}>
          <FormField
            control={methods.control}
            name="recordedQuarterId"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormLabel>쿼터</FormLabel>
                  <FormControl>
                    <SelectTrigger type="button">
                      <SelectValue>
                        {QUARTERS_DB[field.value as QUARTER_KEY]}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(QUARTERS_DB).map(([quarter, value]) => (
                      <SelectItem key={quarter} value={quarter}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="gameTeamId"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormLabel>팀 명</FormLabel>
                  <FormControl>
                    <SelectTrigger type="button">
                      <SelectValue>
                        {teams.find(
                          team => team.gameTeamId.toString() === field.value,
                        )?.gameTeamName ?? '팀 선택'}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teams.map(team => (
                      <SelectItem
                        key={team.gameTeamId}
                        value={team.gameTeamId.toString()}
                      >
                        {team.gameTeamName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <h4 className={styles.sectionTitle}>득점 상세 정보</h4>
        <section className={styles.section}>
          <FormField
            control={methods.control}
            name="scoreLineupPlayerId"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormLabel>선수</FormLabel>
                  <FormControl>
                    <SelectTrigger type="button">
                      <SelectValue>
                        {players.find(
                          player => player.id.toString() === field.value,
                        )?.playerName ?? '선수 선택'}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {players.map(player => (
                      <SelectItem key={player.id} value={player.id.toString()}>
                        {player.playerName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="recordedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>시간</FormLabel>
                <FormControl>
                  <TimeInput type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <Button type="submit" fontWeight="semibold" fullWidth>
          타임라인 등록
        </Button>
      </form>
    </Form>
  );
};

export default ScoreForm;
