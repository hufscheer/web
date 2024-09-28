import { z } from 'zod';

export const playerSchema = z.object({
  name: z.string(),
  number: z.string(),
  isCaptain: z.boolean(),
});

export const gameFormSchema = z.object({
  name: z.string().min(1, { message: '경기 이름을 입력해주세요.' }),
  round: z.string().min(1, { message: '라운드를 입력해주세요.' }),
  quarter: z.string().min(1, { message: '쿼터를 입력해주세요.' }),
  startDate: z.date({ message: '시작일을 입력해주세요' }),
  startTime: z.string().min(1, { message: '시작 시간을 입력해주세요' }),
  idOfTeam1: z.string().min(1, { message: '홈팀을 입력해주세요.' }),
  idOfTeam2: z.string().min(1, { message: '원정팀을 입력해주세요.' }),
  videoId: z.string().nullable(),
  playersOfTeam1: z.array(playerSchema),
  playersOfTeam2: z.array(playerSchema),
});

export type GameFormSchema = z.infer<typeof gameFormSchema>;

export const gameDefaultValues = {
  name: '',
  round: '',
  quarter: '경기전',
  startDate: new Date(),
  startTime: '',
  idOfTeam1: '',
  idOfTeam2: '',
  videoId: '',
  playersOfTeam1: [],
  playersOfTeam2: [],
};
