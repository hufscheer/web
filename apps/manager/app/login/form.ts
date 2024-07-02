import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: '아이디는 이메일 형식으로 입력해주세요.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 8글자 이상이어야 합니다.' })
    .regex(/^(?=.*[a-zA-Z])/, {
      message: '비밀번호는 영문자와 특수문자를 포함해야 합니다.',
    }),
});

export const defaultLoginValue = {
  email: '',
  password: '',
};

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
