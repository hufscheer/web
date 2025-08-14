'use client';

import { Button, Input, toast } from '@hcc/ui';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useLogin } from '~/api';
import { ROUTES } from '~/constants/routes';

export const LoginForm = () => {
  const router = useRouter();
  const { mutate } = useLogin();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    mutate(
      { email, password },
      {
        onSuccess: () => {
          router.push(ROUTES.HOME);
        },
        onError: error => {
          if (error instanceof Error) {
            toast.error(error.name);
          } else {
            toast.error('아이디 또는 비밀번호 오류');
          }
        },
      },
    );
  };

  return (
    <form className="column w-full" onSubmit={handleSubmit}>
      <Input
        id="email"
        name="email"
        size="xl"
        type="email"
        placeholder="이메일"
        autoComplete="email"
      />
      <Input
        id="password"
        name="password"
        className="mt-4"
        size="xl"
        type="password"
        placeholder="비밀번호"
        autoComplete="current-password"
      />
      <Button className="mt-6" size="xl" color="black" variant="solid" type="submit">
        로그인
      </Button>
    </form>
  );
};
