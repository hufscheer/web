'use client';

import { useManagerLogin } from '@hcc/api';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  useToast,
} from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Layout from '@/components/Layout';

import * as styles from './page.css';

const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: '아이디는 이메일 형식으로 입력해주세요.' }),
  password: z
    .string()
    .min(4, { message: '비밀번호는 8글자 이상이어야 합니다.' }),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();

  const methods = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  });

  const { mutate: mutateLogin } = useManagerLogin();
  const onSubmit = ({ email, password }: LoginFormSchema) => {
    mutateLogin(
      { email, password },
      { onSuccess: () => router.replace('/'), onError: handleError },
    );
  };

  const handleError = () => {
    toast({
      title: '아이디 또는 비밀번호 오류',
      variant: 'destructive',
    });
  };

  return (
    <Layout headerVisible={false} navigationVisible={false}>
      <div className={styles.loginLayout}>
        <div className={styles.header}>
          <p className={styles.branding}>
            Hufscheers
            <br />
            manager
          </p>
          <span className={styles.tag}>매니저 용</span>
        </div>

        <Form {...methods}>
          <form
            className={styles.form}
            onSubmit={methods.handleSubmit(onSubmit, handleError)}
          >
            <FormField
              control={methods.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>아이디</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className={styles.submitButton} size="lg">
              로그인
            </Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
}
