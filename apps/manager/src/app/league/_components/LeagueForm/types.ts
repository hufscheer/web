import { z } from 'zod';

export const leagueFormSchema = z.object({
  leagueName: z.string().min(1, { message: '대회명을 입력해주세요' }),
  round: z
    .string()
    .min(1, { message: '라운드를 입력해주세요' })
    .refine((value) => /^\d+$/.test(value), { message: '라운드를 입력해주세요' }),
  quarter: z.string().min(1, { message: '쿼터를 선택해주세요' }),
  status: z.string().min(1, { message: '상황을 선택해주세요' }),
  startDate: z.date({ message: '시작일을 입력해주세요' }),
  endDate: z.date({ message: '종료일을 입력해주세요' }),
});

export type LeagueFormSchema = z.infer<typeof leagueFormSchema>;

export const leagueDefaultValues = {
  leagueName: '',
  round: '',
  quarter: '',
  status: '',
  startDate: '',
  endDate: new Date(),
};
