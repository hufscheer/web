'use client';

import { Toast } from '@hcc/ui';
import { Box, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import useLoginMutation from '@/hooks/mutations/useLoginMutation';

import * as styles from './page.css';

export default function Login() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: value => (value.includes('@') ? null : 'Invalid email'),
      password: value => (value.length >= 4 ? null : 'Password is too short'),
    },
    validateInputOnChange: true,
  });
  const { mutate: mutateLogin } = useLoginMutation();
  const handleSubmit = (values: typeof form.values) => {
    mutateLogin(values, {
      onSuccess: () => Toast.show('로그인에 성공했습니다!'),
      onError: () => Toast.show('이메일 혹은 비밀번호를 확인해주세요.'),
    });
  };

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit)} className={styles.page}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="이메일을 입력해주세요."
          {...form.getInputProps('email')}
        />

        <TextInput
          type="password"
          withAsterisk
          label="Password"
          placeholder="비밀번호을 입력해주세요."
          {...form.getInputProps('password')}
        />

        <Button mt="md" fullWidth type="submit">
          로그인
        </Button>
      </form>
    </Box>
  );
}
