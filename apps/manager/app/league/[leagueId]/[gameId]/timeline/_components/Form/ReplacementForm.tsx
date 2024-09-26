import { GameTeamType, useCreateReplacementTimeline, useGame } from '@hcc/api';
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
import { useForm } from 'react-hook-form';

import { QUARTER_ID, QUARTER_KEY, QUARTERS_DB } from '@/constants/games';

import * as styles from './Form.css';
import {
  replacementDefaultValues,
  replacementFormSchema,
  ReplacementFormSchema,
} from '../../_types';

type ReplacementFormProps = {
  gameId: string;
  onClose?: () => void;
};

const ReplacementForm = ({ gameId, onClose }: ReplacementFormProps) => {
  const { data: game } = useGame(gameId);
  const teams: GameTeamType[] = game?.gameTeams ?? [];

  // const { data: lineupPlayers } = useGameLineup(gameId);
  // const { data: lineupPlayingPlayers } = useGameLineupPlaying(gameId);

  const methods = useForm<ReplacementFormSchema>({
    resolver: zodResolver(replacementFormSchema),
    defaultValues: replacementDefaultValues,
  });

  const { mutate: createReplacementTimelineMutation } =
    useCreateReplacementTimeline();
  const onSubmit = (data: ReplacementFormSchema) => {
    createReplacementTimelineMutation({
      gameId,
      recordedAt: Number(data.recordedAt),
      recordedQuarterId: QUARTER_ID[data.recordedQuarterId as QUARTER_KEY],
      gameTeamId: Number(data.gameTeamId),
      originLineupPlayerId: Number(data.originLineupPlayerId),
      replacementLineupPlayerId: Number(data.replacementLineupPlayerId),
    });
    if (onClose) onClose();
  };

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
                      <SelectValue>{field.value}</SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(QUARTERS_DB).map(([quarter, value]) => (
                      <SelectItem key={quarter} value={value}>
                        {quarter}
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
        <section className={styles.section}></section>

        <Button type="submit" fontWeight="semibold" fullWidth>
          타임라인 등록
        </Button>
      </form>
    </Form>
  );
};

export default ReplacementForm;
