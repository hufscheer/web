import {
  GameTeamType,
  useCreateReplacementTimeline,
  useGame,
  useGameLineup,
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
  Spinner,
  useToast,
} from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import TimeInput from '@/components/TimeInput';
import { QUARTER_ID, QUARTER_KEY, QUARTERS_DB } from '@/constants/games';

import * as styles from './styles.css';
import {
  replacementDefaultValues,
  replacementFormSchema,
  ReplacementFormSchema,
} from '../../_types';

type ReplacementFormProps = {
  gameId: string;
  onClose?: () => void;
  quarter?: string;
};

const ReplacementForm = ({
  gameId,
  onClose,
  quarter,
}: ReplacementFormProps) => {
  const { toast } = useToast();
  const { data: game } = useGame(gameId);
  const teams: GameTeamType[] = game?.gameTeams ?? [];

  const { data: lineupPlayers } = useGameLineup(gameId);

  const methods = useForm<ReplacementFormSchema>({
    resolver: zodResolver(replacementFormSchema),
    defaultValues: replacementDefaultValues,
  });

  const { mutate: createReplacementTimelineMutation, isPending } =
    useCreateReplacementTimeline();

  const onSubmit = (data: ReplacementFormSchema) => {
    if (isPending)
      return toast({
        title: '선수를 교체 중입니다. 잠시만 기다려주세요.',
        variant: 'destructive',
      });

    createReplacementTimelineMutation(
      {
        gameId,
        recordedAt: Number(data.recordedAt),
        recordedQuarterId: QUARTER_ID[data.recordedQuarterId as QUARTER_KEY],
        gameTeamId: Number(data.gameTeamId),
        originLineupPlayerId: Number(data.originLineupPlayerId),
        replacementLineupPlayerId: Number(data.replacementLineupPlayerId),
      },
      {
        onSuccess: () => {
          methods.reset();
          if (onClose) onClose();
        },
      },
    );
  };

  const gameTeamId = methods.watch('gameTeamId');
  const players = useMemo(() => {
    return (
      lineupPlayers?.find(lineup => lineup.gameTeamId.toString() === gameTeamId)
        ?.candidatePlayers ?? []
    );
  }, [lineupPlayers, gameTeamId]);

  const playingPlayers = useMemo(() => {
    return (
      lineupPlayers?.find(lineup => lineup.gameTeamId.toString() === gameTeamId)
        ?.starterPlayers ?? []
    );
  }, [lineupPlayers, gameTeamId]);

  useEffect(() => {
    methods.setValue('originLineupPlayerId', '');
    methods.setValue('replacementLineupPlayerId', '');
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

        <h4 className={styles.sectionTitle}>교체 상세 정보</h4>
        <section className={styles.section}>
          <FormField
            control={methods.control}
            name="replacementLineupPlayerId"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormLabel>교체 투입 선수</FormLabel>
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
            name="originLineupPlayerId"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormLabel>교체 아웃 선수</FormLabel>
                  <FormControl>
                    <SelectTrigger type="button">
                      <SelectValue>
                        {playingPlayers.find(
                          player => player.id.toString() === field.value,
                        )?.playerName ?? '선수 선택'}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {playingPlayers.map(player => (
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

        <Button
          disabled={isPending}
          type="submit"
          fontWeight="semibold"
          fullWidth
        >
          {isPending ? <Spinner /> : '타임라인 등록'}
        </Button>
      </form>
    </Form>
  );
};

export default ReplacementForm;
