import { z } from 'zod';

export const teamPlayerSchema = z.object({
  name: z.string().min(1, { message: '플레이어 이름을 입력해주세요' }),
  number: z.number().int().min(0, { message: '플레이어 번호를 입력해주세요' }),
});

export const teamFormSchema = z.object({
  logo: z.union([
    z.string().min(1, { message: '팀 로고를 입력해주세요' }),
    z.instanceof(File),
    z.undefined(),
  ]),
  name: z.string().min(1, { message: '팀명을 입력해주세요' }),
  players: z
    .array(teamPlayerSchema)
    .nonempty({ message: '최소 한 명의 플레이어를 추가해주세요' }),
});

export type TeamFormSchema = z.infer<typeof teamFormSchema>;

export const teamDefaultValues = {
  logo: undefined,
  name: '',
  players: [],
};
