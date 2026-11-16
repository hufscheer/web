'use client';

import type { ComponentProps } from 'react';

import * as Tabs from '@radix-ui/react-tabs';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

const VALID_TABS = ['cheer', 'lineup', 'timeline', 'video'];
const DEFAULT_TAB = 'cheer';

type GameTabsRootProps = Omit<ComponentProps<typeof Tabs.Root>, 'defaultValue'>;

/**
 * `?tab=` 을 서버 페이지에서 읽으면 경기 페이지가 요청마다 서버에서 렌더링돼 캐시할 수 없다.
 * 그래서 클라이언트에서 읽는다. 서버 HTML 은 기본 탭(응원)으로 그린다.
 */
export const GameTabsRoot = (props: GameTabsRootProps) => (
  <Suspense fallback={<Tabs.Root {...props} defaultValue={DEFAULT_TAB} />}>
    <GameTabsRootFromSearchParams {...props} />
  </Suspense>
);

const GameTabsRootFromSearchParams = (props: GameTabsRootProps) => {
  const router = useRouter();
  const tab = useSearchParams().get('tab');
  const isInvalid = tab !== null && !VALID_TABS.includes(tab);

  useEffect(() => {
    if (isInvalid) router.replace(`?tab=${DEFAULT_TAB}`);
  }, [isInvalid, router]);

  return <Tabs.Root {...props} defaultValue={tab && !isInvalid ? tab : DEFAULT_TAB} />;
};
