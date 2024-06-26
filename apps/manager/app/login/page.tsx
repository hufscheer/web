'use client';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormLabel,
  Input,
  useToast,
} from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import {
  loginFormSchema,
  LoginFormSchema,
  defaultLoginValue,
} from '@/app/login/form';
import Layout from '@/components/Layout';
import useLoginMutation from '@/hooks/mutations/useLoginMutation';

import * as styles from './page.css';

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();

  const methods = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: defaultLoginValue,
    mode: 'onSubmit',
  });

  const { mutate: mutateLogin } = useLoginMutation();
  const onSubmit = ({ email, password }: LoginFormSchema) => {
    mutateLogin({ email, password }, { onSuccess: () => router.replace('/') });
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
            <FormField name="email">
              <FormLabel>아이디</FormLabel>
              <FormControl>
                <Input type="email" />
              </FormControl>
            </FormField>

            <FormField name="password">
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input type="password" />
              </FormControl>
            </FormField>

            <Button className={styles.submitButton}>로그인</Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
}
