/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import {
  LegacyRoundType,
  StateType,
  useCreateGame,
  useLeagueTeams,
} from '@hcc/api';
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
  toast,
  Toaster,
} from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Layout from '@/components/Layout';
import TimeInput from '@/components/TimeInput';
import {
  getStateByQuarter,
  QUARTER_ID,
  QUARTER_KEY,
  QUARTERS_DB,
} from '@/constants/games';
import { formatTime } from '@/utils/time';

import * as styles from './styles.css';

const registerGameFormSchema = z.object({
  name: z.string().min(1, { message: '경기 이름을 입력해주세요.' }),
  round: z.string().min(1, { message: '라운드를 입력해주세요.' }),
  quarter: z.string().min(1, {
    message: '쿼터를 입력해주세요.',
  }),
  startDate: z.date({ message: '시작일을 입력해주세요' }),
  startTime: z.string().min(1, { message: '시작 시간을 입력해주세요' }),
  idOfTeam1: z.string().min(1, { message: '홈팀을 입력해주세요.' }),
  idOfTeam2: z.string().min(1, { message: '원정팀을 입력해주세요.' }),
  videoId: z.string().nullable(),
  // playersOfTeam1: z.string().array(),
  // playersOfTeam2: z.string().array(),
});

const defaultValues = {
  name: '',
  round: '',
  quarter: '경기전',
  startDate: new Date(),
  startTime: '',
  idOfTeam1: '',
  idOfTeam2: '',
  videoId: '',
  // playersOfTeam1: [],
  // playersOfTeam2: [],
};

export type RegisterGameFormSchema = z.infer<typeof registerGameFormSchema>;

type PageProps = {
  params: { leagueId: string };
};

export default function Page({ params }: PageProps) {
  const [selectedTeamNames, setSelectedTeamNames] = useState<[string, string]>([
    '',
    '',
  ]);
  const [team1, setTeam1] = useState<string>('');
  const [team2, setTeam2] = useState<string>('');

  const router = useRouter();

  const methods = useForm<RegisterGameFormSchema>({
    resolver: zodResolver(registerGameFormSchema),
    defaultValues,
  });

  // 리그팀 목록 조회 -> 선택한 리그팀 선수 조회 -> 선발, 후보 결정
  const { data: leagueTeams } = useLeagueTeams(params.leagueId);
  const { mutate: createGameMutate } = useCreateGame({
    leagueId: params.leagueId,
  });

  const onSubmit = ({ startTime, ...data }: RegisterGameFormSchema) => {
    const quarter = data.quarter as QUARTER_KEY;
    const request: Omit<
      RegisterGameFormSchema,
      'startTime' | 'idOfTeam1' | 'idOfTeam2' | 'quarter'
    > & {
      leagueId: string;
      idOfTeam1: number;
      idOfTeam2: number;
      quarter: number;
      state: StateType;
      round: LegacyRoundType;
    } = {
      ...data,
      idOfTeam1: Number(data.idOfTeam1),
      idOfTeam2: Number(data.idOfTeam2),
      leagueId: params.leagueId,
      round: data.round as LegacyRoundType,
      startDate: new Date(
        `${data.startDate.toLocaleDateString()}:${startTime}`,
      ),
      quarter: QUARTER_ID[quarter],
      state: getStateByQuarter(quarter),
    };

    createGameMutate(request, {
      // TODO 선수 등록으로 이동
      onSuccess: () => {
        router.replace('');
      },
    });

    toast({
      title: '대회 정보 수정 메시지',
      description: (
        <div>
          <div>data.name: {data.name}</div>
          <div>data.round: {data.round}</div>
          <div>data.quarter: {data.quarter}</div>
          <div>data.state: {QUARTER_ID[data.quarter as QUARTER_KEY]}</div>
          <div>data.startDate: {data.startDate.toLocaleDateString()}</div>
          <div>data.startTime: {startTime}</div>
          <div>data.startTime: {data.idOfTeam1}</div>
          <div>data.startTime: {data.idOfTeam2}</div>
        </div>
      ),
    });
    // TODO: API 호출 구현 필요
  };

  useEffect(() => {
    const nextSelectedTeamNames: [string, string] = [
      leagueTeams?.find(team => team.leagueTeamId === Number(team1))
        ?.teamName || '',
      leagueTeams?.find(team => team.leagueTeamId === Number(team2))
        ?.teamName || '',
    ];

    setSelectedTeamNames(nextSelectedTeamNames);
  }, [leagueTeams, team1, team2]);

  return (
    <Layout navigationTitle="새로운 경기 생성">
      <section className={styles.page}>
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className={styles.form}
          >
            <div className={styles.block}>
              <h2 className={styles.title}>경기 정보</h2>
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
                          <Button
                            colorScheme="outline"
                            fullWidth
                            justify="between"
                            style={{ borderColor: '#F3F3F5' }}
                          >
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
            </div>

            <div className={styles.block}>
              <h2 className={styles.title}>참가 팀</h2>
              <FormField
                control={methods.control}
                name="idOfTeam1"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={team => {
                        setTeam1(team);
                        field.onChange(team);
                      }}
                      defaultValue={field.value}
                    >
                      <FormLabel>팀 선택 1</FormLabel>
                      <FormControl>
                        <SelectTrigger caret={false}>
                          <SelectValue>{selectedTeamNames[0]}</SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {leagueTeams?.map(team => (
                          <SelectItem
                            key={team.leagueTeamId}
                            value={`${team.leagueTeamId}`}
                          >
                            {team.teamName}
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
                name="idOfTeam2"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={team => {
                        setTeam2(team);
                        field.onChange(team);
                      }}
                      defaultValue={field.value}
                    >
                      <FormLabel>팀 선택 2</FormLabel>
                      <FormControl>
                        <SelectTrigger caret={false}>
                          <SelectValue>{selectedTeamNames[1]}</SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {leagueTeams?.map(team => (
                          <SelectItem
                            key={team.leagueTeamId}
                            value={`${team.leagueTeamId}`}
                          >
                            <div>{team.teamName}</div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className={styles.block}>
              <h2 className={styles.title}>영상</h2>
              <FormField
                control={methods.control}
                name="videoId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>영상</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} value={field.value || ''} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" fullWidth>
              제출
            </Button>
          </form>
        </Form>

        <Toaster />
      </section>
    </Layout>
  );
}
