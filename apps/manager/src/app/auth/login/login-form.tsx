'use client';

import { Button, Input } from '@hcc/ui';
import type { FormEvent } from 'react';
import { useLogin } from '~/api';

export const LoginForm = () => {
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
          window.location.href = '/';
        },
        onError: error => {
          if (error instanceof Error) {
            alert(error.message);
          } else {
            alert('로그인에 실패했습니다. 다시 시도해주세요.');
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
