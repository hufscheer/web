import { useLeagueTeams } from '@hcc/api';
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

import * as styles from './GameForm.css';
import { GameFormSchema } from './types';
import { LineupCreateSheet } from '../../_components/LineupSheet';
import LineupBadge from '../LineupBadge';

type GameFormProps = {
  leagueId: string;
  methods: UseFormReturn<GameFormSchema>;
  submitText: string;
  onSubmit: SubmitHandler<GameFormSchema>;
  type: 'CREATE' | 'UPDATE';
};

export const GameForm = ({
  leagueId,
  methods,
  submitText,
  onSubmit,
  type,
}: GameFormProps) => {
  const { data: teams } = useLeagueTeams(leagueId);

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
                      <SelectValue>{field.value}</SelectValue>
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
                  value={field.value}
                  onValueChange={value => {
                    field.onChange(value);
                    methods.setValue('playersOfTeam1', []);
                  }}
                >
                  <FormLabel>팀 선택 1</FormLabel>
                  <FormControl>
                    <SelectTrigger caret={false}>
                      <SelectValue>
                        {
                          teams?.find(
                            t => t.leagueTeamId.toString() === field.value,
                          )?.teamName
                        }
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teams?.map(team => (
                      <SelectItem
                        key={team.leagueTeamId}
                        value={team.leagueTeamId.toString()}
                      >
                        {team.teamName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
                {field.value &&
                  (type === 'CREATE' ? (
                    <LineupCreateSheet
                      teamId={field.value}
                      methods={methods}
                      fieldName="playersOfTeam1"
                    >
                      <button className={styles.badge}>
                        <LineupBadge
                          checked={methods.watch('playersOfTeam1').length > 0}
                        />
                      </button>
                    </LineupCreateSheet>
                  ) : null)}
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="idOfTeam2"
            render={({ field }) => (
              <FormItem>
                <Select
                  value={field.value}
                  onValueChange={value => {
                    field.onChange(value);
                    methods.setValue('playersOfTeam2', []);
                  }}
                >
                  <FormLabel>팀 선택 2</FormLabel>
                  <FormControl>
                    <SelectTrigger caret={false}>
                      <SelectValue>
                        {
                          teams?.find(
                            t => t.leagueTeamId.toString() === field.value,
                          )?.teamName
                        }
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teams?.map(team => (
                      <SelectItem
                        key={team.leagueTeamId}
                        value={team.leagueTeamId.toString()}
                      >
                        {team.teamName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
                {field.value &&
                  (type === 'CREATE' ? (
                    <LineupCreateSheet
                      teamId={field.value}
                      methods={methods}
                      fieldName="playersOfTeam2"
                    >
                      <button className={styles.badge}>
                        <LineupBadge
                          checked={methods.watch('playersOfTeam2').length > 0}
                        />
                      </button>
                    </LineupCreateSheet>
                  ) : null)}
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

        <Button type="submit">{submitText}</Button>
      </form>
    </Form>
  );
};
