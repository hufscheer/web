import { z } from 'zod';

export const leagueFormSchema = z.object({
  leagueName: z.string().min(1, { message: '대회명을 입력해주세요' }),
  startDate: z.date({ message: '시작일을 입력해주세요' }),
  endDate: z.date().nullable(),
  round: z.string({ message: '라운드를 입력해주세요' }),
});

export type LeagueFormSchema = z.infer<typeof leagueFormSchema>;

export const leagueDefaultValues = {
  leagueName: '',
  endDate: null,
  round: '32',
};
