import { useGame, useLeagueTeams } from '@hcc/api';
import { CalendarIcon } from '@hcc/icons';
import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icon,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hcc/ui';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

import TimeInput from '@/components/TimeInput';
import { QUARTERS_DB } from '@/constants/games';
import { formatTime } from '@/utils/time';

import * as styles from './styles.css';
import { GameFormSchema } from './types';
import LineupSheet from '../LineupSheet';

type GameFormProps = {
  leagueId: string;
  gameId?: string;
  methods: UseFormReturn<GameFormSchema>;
  submitText: string;
  onSubmit: SubmitHandler<GameFormSchema>;
  type: 'CREATE' | 'UPDATE';
};

export const GameForm = ({
  leagueId,
  gameId,
  methods,
  submitText,
  onSubmit,
  type,
}: GameFormProps) => {
  const { data: teams } = useLeagueTeams(leagueId);
  const { data: game } = useGame(gameId);

  const getTeamName = (teamId: string) => {
    return type === 'CREATE'
      ? teams?.find(t => t.leagueTeamId.toString() === teamId)?.teamName
      : game?.gameTeams.find(t => t.gameTeamId.toString() === teamId)
          ?.gameTeamName;
  };

  const getTeamList = (): { id: number; name: string }[] => {
    if (type === 'CREATE') {
      return teams?.map(t => ({ id: t.leagueTeamId, name: t.teamName })) || [];
    }
    if (type === 'UPDATE') {
      return (
        game?.gameTeams.map(t => ({
          id: t.gameTeamId,
          name: t.gameTeamName,
        })) || []
      );
    }
    return [];
  };

  return (
    <Form {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <section className={styles.section}>
          <h4 className={styles.title}>경기 정보</h4>
          <FormField
            control={methods.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>경기 이름</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="round"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormLabel>라운드</FormLabel>
                  <FormControl>
                    <SelectTrigger>
                      <span>{field.value}</span>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="32강">32강</SelectItem>
                    <SelectItem value="16강">16강</SelectItem>
                    <SelectItem value="8강">8강</SelectItem>
                    <SelectItem value="4강">4강</SelectItem>
                    <SelectItem value="결승">결승</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="quarter"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormLabel>쿼터</FormLabel>
                  <FormControl>
                    <SelectTrigger>
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
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>시작일</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button colorScheme="outline" justify="between" fullWidth>
                        <span>
                          {field.value
                            ? formatTime(field.value, 'YYYY년 MM월 DD일')
                            : ''}
                        </span>
                        <Icon source={CalendarIcon} />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="start">
                    <Calendar
                      defaultValue={field.value}
                      onChange={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>시작 시간</FormLabel>
                <FormControl>
                  <TimeInput type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className={styles.section}>
          <h4 className={styles.title}>참가 팀</h4>
          <FormField
            control={methods.control}
            name="idOfTeam1"
            render={({ field }) => (
              <FormItem>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormLabel>팀 선택 1</FormLabel>
                  <FormControl>
                    {type === 'CREATE' ? (
                      <SelectTrigger caret={false}>
                        <span>{getTeamName(field.value)}</span>
                      </SelectTrigger>
                    ) : (
                      <div className={styles.selectItem}>
                        {getTeamName(field.value)}
                      </div>
                    )}
                  </FormControl>
                  <SelectContent>
                    {getTeamList().map(team => (
                      <SelectItem key={team.id} value={team.id.toString()}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
                {field.value && type === 'UPDATE' && gameId && (
                  <LineupSheet gameId={gameId} teamId={field.value} />
                )}
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="idOfTeam2"
            render={({ field }) => (
              <FormItem>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormLabel>팀 선택 2</FormLabel>
                  <FormControl>
                    {type === 'CREATE' ? (
                      <SelectTrigger caret={false}>
                        <span>{getTeamName(field.value)}</span>
                      </SelectTrigger>
                    ) : (
                      <div className={styles.selectItem}>
                        {getTeamName(field.value)}
                      </div>
                    )}
                  </FormControl>
                  <SelectContent>
                    {getTeamList().map(team => (
                      <SelectItem key={team.id} value={team.id.toString()}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
                {field.value && type === 'UPDATE' && gameId && (
                  <LineupSheet gameId={gameId} teamId={field.value} />
                )}
              </FormItem>
            )}
          />
        </section>

        <section className={styles.section}>
          <h4 className={styles.title}>영상</h4>
          <FormField
            control={methods.control}
            name="videoId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL을 입력하세요</FormLabel>
                <FormControl>
                  <Input type="text" {...field} value={field.value || ''} />
                </FormControl>
              </FormItem>
            )}
          />
        </section>

        <Button type="submit" fontWeight="semibold" fullWidth>
          {submitText}
        </Button>
      </form>
    </Form>
  );
};
