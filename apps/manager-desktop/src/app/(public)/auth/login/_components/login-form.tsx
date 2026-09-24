'use client';

import { useLogin } from '@hcc/manager-api';
import { HTTPError } from 'ky';
import { useState } from 'react';

import { ErrorIcon, VisibilityIcon, VisibilityOffIcon } from '~/components/icons';
import { Button } from '~/components/ui/button';

const inputClass =
  'h-9 w-full rounded-[var(--radius-control)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] px-3 text-t6 placeholder:text-[var(--color-neutral-300)]';

// 서버는 계정이 없거나 비밀번호가 틀리면 404·400, 운영자 권한이 없으면 401 을 준다
const loginErrorMessage = (error: unknown) => {
  if (!(error instanceof HTTPError)) return '서버에 연결하지 못했어요.';
  const { status } = error.response;
  if (status === 404 || status === 400) return '이메일 또는 비밀번호가 맞지 않아요.';
  if (status === 401) return '운영자 권한이 없는 계정이에요.';
  return `로그인에 실패했어요. (${status})`;
};

export const LoginForm = () => {
  const { mutate: login, isPending, error } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isPending) return;

    // 전체를 다시 불러 이전 세션의 조회 캐시를 비운다
    login({ email, password }, { onSuccess: () => window.location.replace('/') });
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] p-6"
    >
      <label className="flex flex-col gap-2">
        <span className="text-t7 font-bold text-[var(--color-neutral-600)]">이메일</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="manager@hufscheer.com"
          autoComplete="username"
          required
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-t7 font-bold text-[var(--color-neutral-600)]">비밀번호</span>
        <span className="relative flex items-center">
          <input
            type={visible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className={`${inputClass} pr-10`}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? '비밀번호 숨기기' : '비밀번호 보기'}
            aria-pressed={visible}
            className="absolute right-1.5 inline-flex size-8 items-center justify-center rounded-[var(--radius-chip)] text-[var(--color-neutral-400)] transition-colors hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-neutral-700)]"
          >
            {visible ? <VisibilityOffIcon size={18} /> : <VisibilityIcon size={18} />}
          </button>
        </span>
      </label>

      {error && (
        <p className="text-t7 flex items-center gap-1.5 font-medium text-[var(--color-danger-600)]">
          <ErrorIcon size={14} />
          {loginErrorMessage(error)}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isPending} className="mt-1 w-full">
        {isPending ? '로그인 중…' : '로그인'}
      </Button>
    </form>
  );
};
