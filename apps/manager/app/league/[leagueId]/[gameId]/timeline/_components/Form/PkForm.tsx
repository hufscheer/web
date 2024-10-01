import {
  GameTeamType,
  useGame,
  useGameLineupPlaying,
  useCreatePkTimeline,
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
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import * as styles from './styles.css';
import { pkDefaultValues, pkFormSchema, PkFormSchema } from '../../_types';

type PkFormProps = {
  gameId: string;
  onClose?: () => void;
};

const PkForm = ({ gameId, onClose }: PkFormProps) => {
  const { data: game } = useGame(gameId);
  const teams: GameTeamType[] = game?.gameTeams ?? [];

  const { data: lineupPlayingPlayers } = useGameLineupPlaying(gameId);

  const methods = useForm<PkFormSchema>({
    resolver: zodResolver(pkFormSchema),
    defaultValues: pkDefaultValues,
  });

  const { mutate: createPkTimeline, isPending } = useCreatePkTimeline();
  const onSubmit = (data: PkFormSchema) => {
    if (isPending) return;

    createPkTimeline(
      {
        gameId,
        recordedAt: 0,
        recordedQuarterId: 7,
        gameTeamId: Number(data.gameTeamId),
        scorerId: Number(data.scorerId),
        isSuccess: Boolean(Number(data.isSuccess)),
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

  return (
    <Form {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <h4 className={styles.sectionTitle}>상황</h4>
        <section className={styles.section}>
          <FormField
            control={methods.control}
            name="gameTeamId"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={value => {
                    field.onChange(value);
                    methods.setValue('scorerId', '');
                  }}
                  value={field.value}
                >
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
            name="scorerId"
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
        </section>

        <section className={styles.section}>
          <FormField
            control={methods.control}
            name="isSuccess"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormLabel>상태</FormLabel>
                  <FormControl>
                    <SelectTrigger type="button">
                      <SelectValue>
                        {field.value === '1' ? '성공' : '실패'}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem key={1} value="1">
                      성공
                    </SelectItem>
                    <SelectItem key={0} value="0">
                      실축
                    </SelectItem>
                  </SelectContent>
                </Select>
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

export default PkForm;
