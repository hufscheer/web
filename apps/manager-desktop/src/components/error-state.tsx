'use client';

import { HTTPError } from 'ky';
import Link from 'next/link';

import { ErrorIcon } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { routes } from '~/constants/routes';

const statusOf = (error: unknown) => (error instanceof HTTPError ? error.response.status : null);

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-1 items-center justify-center p-8">
    <div className="flex max-w-md flex-col items-center gap-4 rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] px-8 py-10 text-center">
      {children}
    </div>
  </div>
);

export const NotFoundState = () => (
  <Frame>
    <ErrorIcon size={28} className="text-[var(--color-neutral-400)]" />
    <h1 className="text-t4 font-bold">찾을 수 없는 페이지예요</h1>
    <p className="text-t6 text-[var(--color-neutral-500)]">
      주소가 바뀌었거나, 이미 삭제된 대회·경기일 수 있어요.
    </p>
    <div className="mt-2 flex gap-2">
      <Link href={routes.leagues}>
        <Button size="sm" color="black" variant="outline">
          대회 목록
        </Button>
      </Link>
      <Link href={routes.home}>
        <Button size="sm">홈으로</Button>
      </Link>
    </div>
  </Frame>
);

export const ErrorState = ({ error }: { error: unknown }) => {
  const status = statusOf(error);
  if (status === 404) return <NotFoundState />;

  return (
    <Frame>
      <ErrorIcon size={28} className="text-[var(--color-danger-600)]" />
      <h1 className="text-t4 font-bold">데이터를 불러오지 못했어요</h1>
      <p className="text-t6 text-[var(--color-neutral-500)]">
        서버 응답에 문제가 있어요. 잠시 뒤 다시 시도해 주세요.
      </p>
      {status && <p className="text-t7 text-[var(--color-neutral-400)]">응답 코드 {status}</p>}
      <Button
        size="sm"
        color="black"
        variant="outline"
        className="mt-2"
        onClick={() => window.location.reload()}
      >
        새로고침
      </Button>
    </Frame>
  );
};
