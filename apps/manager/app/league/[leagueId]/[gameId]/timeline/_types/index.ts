import { z } from 'zod';

export const scoreFormSchema = z.object({
  recordedQuarterId: z.string({ message: '쿼터 ID를 입력해주세요' }),
  recordedAt: z.string({ message: '기록된 시간을 입력해주세요' }),
  gameTeamId: z.string({ message: '팀 ID를 입력해주세요' }),
  scoreLineupPlayerId: z.string({ message: '득점 선수 ID를 입력해주세요' }),
});

export type ScoreFormSchema = z.infer<typeof scoreFormSchema>;

export const scoreDefaultValues = Object.fromEntries(
  Object.keys(scoreFormSchema.shape).map(key => [key, '']),
);

export const replacementFormSchema = z.object({
  recordedQuarterId: z.string({ message: '쿼터 ID를 입력해주세요' }),
  recordedAt: z.string({ message: '기록된 시간을 입력해주세요' }),
  gameTeamId: z.string({ message: '팀 ID를 입력해주세요' }),
  originLineupPlayerId: z.string({ message: '교체 전 선수 ID를 입력해주세요' }),
  replacementLineupPlayerId: z.string({
    message: '교체 후 선수 ID를 입력해주세요',
  }),
});

export type ReplacementFormSchema = z.infer<typeof replacementFormSchema>;

export const replacementDefaultValues = Object.fromEntries(
  Object.keys(replacementFormSchema.shape).map(key => [key, '']),
);

export const progressFormSchema = z.object({
  recordedQuarterId: z.string({ message: '쿼터 ID를 입력해주세요' }),
  recordedAt: z.string({ message: '기록된 시간을 입력해주세요' }),
});

export type ProgressFormSchema = z.infer<typeof progressFormSchema>;

export const progressDefaultValues = Object.fromEntries(
  Object.keys(replacementFormSchema.shape).map(key => [key, '']),
);

export const pkFormSchema = z.object({
  gameTeamId: z.string({ message: '팀 ID를 입력해주세요' }),
  scorerId: z.string({ message: '득점 선수 ID를 입력해주세요' }),
  isSuccess: z.string({ message: '득점 여부를 입력해주세요' }),
});

export type PkFormSchema = z.infer<typeof pkFormSchema>;

export const pkDefaultValues = Object.fromEntries(
  Object.keys(pkFormSchema.shape).map(key => [key, '']),
);
