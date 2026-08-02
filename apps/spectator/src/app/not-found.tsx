'use client';

import { Button } from '@hcc/ui';
import { Jersey_15 } from 'next/font/google';
import { useRouter } from 'next/navigation';

import { routes } from '~/constants/routes';
import { cn } from '~/utils/cn';
import { readOrgCookie } from '~/utils/org-session';
import { DEFAULT_SPORT } from '~/utils/sport-route';

const font = Jersey_15({
  subsets: ['latin'],
  weight: '400',
});

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    const orgId = readOrgCookie();

    if (orgId === null) {
      router.replace(routes.welcome);
      return;
    }

    router.replace(routes.home({ orgId, sport: DEFAULT_SPORT }));
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-5 py-10 text-center">
      <div className="flex flex-col items-center gap-2">
        <p className={cn(font.className, 'text-8xl font-bold text-(--color-primary-600)')}>404</p>
        <p className="text-lg font-semibold text-(--color-greyscale-900)">
          페이지를 찾을 수 없어요
        </p>
        <p className="text-sm text-(--color-greyscale-500)">
          요청하신 페이지가 삭제되었거나 존재하지 않아요.
        </p>
      </div>

      <Button
        onClick={handleGoBack}
        className="h-12 w-full max-w-xs rounded-xl bg-(--color-primary-600) text-base font-semibold text-white"
      >
        홈으로 이동
      </Button>
    </div>
  );
}
