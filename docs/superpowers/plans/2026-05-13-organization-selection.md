# Organization Selection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** URL을 단일 진실 원천으로 삼고, `?org=` 누락 시 `/welcome`으로 강제 유도하는 가드 + 조직 선택 랜딩 + 헤더의 BottomSheet 기반 전환기를 추가한다.

**Architecture:** Next.js middleware로 보호 라우트(`/[sport]/*`)에서 `?org` 유효성을 검증해 무효하면 `/welcome`으로 308 redirect. `useOrganizationId` 훅은 discriminated union(`isReady` flag)을 반환해 호출부가 명시적으로 null을 다루게 한다. localStorage는 `/welcome`에서만 사전 선택 보조용으로 사용한다.

**Tech Stack:** Next.js 16 App Router, nuqs(쿼리 상태), `@hcc/ui`의 `BottomSheet`(vaul 기반), Tailwind, React Suspense.

**관련 스펙:** [docs/superpowers/specs/2026-05-13-organization-selection-design.md](../specs/2026-05-13-organization-selection-design.md)

**테스트 전략:** 본 앱은 단위/E2E 테스트 인프라가 없다. 각 Task는 `pnpm dev:spectator` 실행 후 명시된 시나리오로 수동 검증한 뒤 커밋한다. 빌드 검증은 마지막 Task에서 `pnpm build:spectator`로 일괄 수행.

---

## 작업 순서 (Phase 개요)

| Phase | Task | 동작 가능 상태? |
| --- | --- | --- |
| 토대 | 1. 조직 상수 추가 | 기존 동작 유지 |
| 랜딩 | 2. `/welcome` 페이지 (구 키 사용) | `/welcome` 직접 접근 가능, 기존 동작 유지 |
| 가드 | 3. 루트 페이지 분기 | `/` 진입 시 가드 동작 |
| 가드 | 4. middleware 추가 | `/[sport]/*` 가드 동작 |
| 훅 | 5. `useOrganizationId` 리팩토링 + 호출부 가드 | 동작 유지(키는 아직 `organizationId`) |
| 마이그레이션 | 6. URL 키 `organizationId` → `org` 일괄 변경 | 새 키로 전환 완료 |
| 헤더 | 7. `OrgSwitcher` 추가 + `SchoolSelect` 제거 | 전체 기능 완성 |
| 검증 | 8. 빌드/스모크 테스트 | 최종 검수 |

---

## Task 1: 조직 메타 상수 파일 추가

**Files:**

- Create: `apps/spectator/src/constants/organizations.ts`

- [ ] **Step 1: 파일 생성**

```ts
// apps/spectator/src/constants/organizations.ts
export type OrganizationMeta = {
  id: number;
  displayName: string;
};

// 실제 id는 GET /organizations 응답과 일치해야 한다.
// 새 조직 추가 시 이 배열만 갱신.
export const ORGANIZATIONS: readonly OrganizationMeta[] = [
  { id: 9, displayName: '한국외국어대학교' },
  { id: 11, displayName: '경희대학교' },
] as const;
```

> 실제 displayName fallback이나 화이트리스트 검증은 본 작업 범위에서는 API 응답(`useSuspenseOrganizations`)을 진실 원천으로 사용한다. 이 상수는 향후 클라이언트 단 검증/디자인 시안 매핑이 필요할 때 활용하기 위한 자리.

- [ ] **Step 2: TypeScript 컴파일 확인**

Run: `pnpm --filter spectator exec tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 3: 커밋**

```bash
git add apps/spectator/src/constants/organizations.ts
git commit -m "feat: 조직 메타 상수 추가"
```

---

## Task 2: `/welcome` 페이지 구현 (현 시점에는 구 키 `organizationId` 사용)

**Files:**

- Create: `apps/spectator/src/app/welcome/page.tsx`
- Create: `apps/spectator/src/app/welcome/_components/welcome-view.tsx`
- Create: `apps/spectator/src/app/welcome/_components/organization-card.tsx`

> 이 시점에서는 hook도 middleware도 손대지 않으므로 CTA가 사용하는 URL 키는 일단 기존 `organizationId`로 둔다. Task 6에서 `org`로 일괄 변경.

- [ ] **Step 1: `organization-card.tsx` 생성**

```tsx
// apps/spectator/src/app/welcome/_components/organization-card.tsx
'use client';

import { clsx as cn } from 'clsx';

type Props = {
  id: number;
  displayName: string;
  selected: boolean;
  onSelect: (id: number) => void;
};

export const OrganizationCard = ({ id, displayName, selected, onSelect }: Props) => (
  <button
    type="button"
    onClick={() => onSelect(id)}
    aria-pressed={selected}
    className={cn(
      'flex w-full items-center gap-3 rounded-2xl border bg-white p-4 transition-colors',
      selected
        ? 'border-[var(--color-primary-600)] bg-primary-50'
        : 'border-neutral-200 hover:border-neutral-300',
    )}
  >
    {/* 로고 슬롯: 추후 실제 이미지로 교체. 현재는 더미 원형 */}
    <div className="size-12 shrink-0 rounded-full bg-neutral-200" aria-hidden />
    <span className="truncate text-base font-medium text-neutral-900">{displayName}</span>
  </button>
);
```

- [ ] **Step 2: `welcome-view.tsx` 생성**

```tsx
// apps/spectator/src/app/welcome/_components/welcome-view.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { useSuspenseOrganizations } from '~/api/queries/useOrganizations';
import { routes } from '~/constants/routes';
import { DEFAULT_SPORT } from '~/utils/sport-route';

import { OrganizationCard } from './organization-card';

const STORAGE_KEY = 'organizationId';
const URL_KEY = 'organizationId'; // Task 6에서 'org'로 일괄 변경

export const WelcomeView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: organizations } = useSuspenseOrganizations();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const knownIds = useMemo(() => new Set(organizations.map((o) => o.id)), [organizations]);

  useEffect(() => {
    // URL 우선
    const fromUrl = Number(searchParams.get(URL_KEY) ?? '');
    if (Number.isInteger(fromUrl) && knownIds.has(fromUrl)) {
      setSelectedId(fromUrl);
      return;
    }
    // 다음 localStorage
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return;
    const fromStorage = Number(raw);
    if (Number.isInteger(fromStorage) && knownIds.has(fromStorage)) {
      setSelectedId(fromStorage);
    }
    // searchParams는 mount 시 한 번만 평가하면 충분
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [knownIds]);

  const handleStart = () => {
    if (selectedId === null) return;
    localStorage.setItem(STORAGE_KEY, String(selectedId));
    router.replace(`${routes.home({ sport: DEFAULT_SPORT })}?${URL_KEY}=${selectedId}`);
  };

  return (
    <div className="flex min-h-dvh flex-col px-5 py-10">
      {/* 카피는 Figma에 맞춰 추후 정합 */}
      <h1 className="text-2xl font-bold text-neutral-900">응원할 학교를 선택해주세요</h1>
      <p className="mt-2 text-sm text-neutral-600">선택한 학교의 대회 정보를 보여드려요.</p>

      <ul className="mt-8 flex flex-col gap-3">
        {organizations.map((org) => (
          <li key={org.id}>
            <OrganizationCard
              id={org.id}
              displayName={org.name}
              selected={selectedId === org.id}
              onSelect={setSelectedId}
            />
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <button
          type="button"
          disabled={selectedId === null}
          onClick={handleStart}
          className="h-12 w-full rounded-xl bg-[var(--color-primary-600)] text-base font-semibold text-white disabled:bg-neutral-200 disabled:text-neutral-400"
        >
          시작하기
        </button>
      </div>
    </div>
  );
};
```

- [ ] **Step 3: `page.tsx` 생성**

```tsx
// apps/spectator/src/app/welcome/page.tsx
import type { Metadata } from 'next';

import { Spinner } from '@hcc/ui';
import { ErrorBoundary, Suspense } from '@suspensive/react';

import { WelcomeView } from './_components/welcome-view';

export const metadata: Metadata = { title: '학교 선택' };

export default function Page() {
  return (
    <ErrorBoundary fallback={<div className="p-5 text-center">조직 정보를 불러오지 못했어요.</div>}>
      <Suspense
        clientOnly
        fallback={
          <div className="flex min-h-dvh items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <WelcomeView />
      </Suspense>
    </ErrorBoundary>
  );
}
```

- [ ] **Step 4: dev server로 수동 검증**

Run: `pnpm dev:spectator`
브라우저: `http://localhost:11113/welcome`
- 두 조직 카드가 보이는지
- 카드 탭 시 하이라이트되고 CTA가 활성화되는지
- CTA 클릭 시 `/<DEFAULT_SPORT>?organizationId=<id>`로 이동하는지
- 이동 후 localStorage에 `organizationId` 저장됐는지 (DevTools Application 탭)
- `/welcome` 다시 진입 시 localStorage 값이 선택 상태로 복원되는지

- [ ] **Step 5: 커밋**

```bash
git add apps/spectator/src/app/welcome
git commit -m "feat: 조직 선택 랜딩 페이지(/welcome) 추가"
```

---

## Task 3: 루트 페이지 서버 분기 추가

**Files:**

- Modify: `apps/spectator/src/app/page.tsx`

- [ ] **Step 1: page.tsx 교체**

```tsx
// apps/spectator/src/app/page.tsx
import { redirect } from 'next/navigation';

import { routes } from '~/constants/routes';
import { DEFAULT_SPORT, normalizeSportParam } from '~/utils/sport-route';

type Props = {
  searchParams: Promise<{ sport?: string; organizationId?: string }>;
};

const Page = async ({ searchParams }: Props) => {
  const { sport, organizationId } = await searchParams;
  const parsed = organizationId ? Number(organizationId) : NaN;
  const isValid = Number.isInteger(parsed) && parsed > 0;

  if (!isValid) {
    redirect('/welcome');
  }

  const sportType = normalizeSportParam(sport) ?? DEFAULT_SPORT;
  redirect(`${routes.home({ sport: sportType })}?organizationId=${parsed}`);
};

export default Page;
```

> URL 키는 아직 `organizationId`. Task 6에서 `org`로 일괄 변경.

- [ ] **Step 2: dev server로 수동 검증**

Run: `pnpm dev:spectator`
- `http://localhost:11113/` → `/welcome`으로 이동되는지
- `http://localhost:11113/?organizationId=9` → `/soccer?organizationId=9`으로 이동되는지
- `http://localhost:11113/?organizationId=abc` → `/welcome`으로 이동되는지
- `http://localhost:11113/?sport=basketball&organizationId=11` → `/basketball?organizationId=11`로 이동되는지

- [ ] **Step 3: 커밋**

```bash
git add apps/spectator/src/app/page.tsx
git commit -m "feat: 루트 진입 시 organizationId 유효성 검증 후 분기"
```

---

## Task 4: middleware 추가 (보호 라우트 가드)

**Files:**

- Create: `apps/spectator/middleware.ts`

- [ ] **Step 1: middleware 작성**

```ts
// apps/spectator/middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_PREFIXES = ['/soccer', '/basketball'];

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  if (!isProtected) return NextResponse.next();

  const raw = searchParams.get('organizationId');
  const parsed = raw === null ? NaN : Number(raw);
  const isValid = Number.isInteger(parsed) && parsed > 0;
  if (isValid) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = '/welcome';
  url.search = '';
  return NextResponse.redirect(url, 308);
}

export const config = {
  // _next, api, welcome, 정적 자산은 제외
  matcher: ['/((?!_next|api|welcome|favicon.ico|.*\\.).*)'],
};
```

> URL 키는 아직 `organizationId`. Task 6에서 `org`로 일괄 변경.

- [ ] **Step 2: dev server로 수동 검증**

Run: `pnpm dev:spectator`
- `http://localhost:11113/soccer` (organizationId 없음) → `/welcome`으로 이동
- `http://localhost:11113/soccer?organizationId=9` → 정상 진입
- `http://localhost:11113/soccer?organizationId=abc` → `/welcome`으로 이동
- `http://localhost:11113/welcome` → middleware에 잡히지 않고 그대로 진입
- `http://localhost:11113/basketball/games/123?organizationId=9` → 정상 진입 (보호 prefix 하위 경로)

- [ ] **Step 3: 커밋**

```bash
git add apps/spectator/middleware.ts
git commit -m "feat: 보호 라우트 진입 시 organizationId 가드 미들웨어 추가"
```

---

## Task 5: `useOrganizationId` 훅 리팩토링 + 모든 호출부 isReady 가드

**Files:**

- Modify: `apps/spectator/src/hooks/useOrganizationId.ts`
- Modify (총 13개 호출부):
  - `apps/spectator/src/components/layout/header.tsx`
  - `apps/spectator/src/app/[sport]/(home)/_components/school-select.tsx`
  - `apps/spectator/src/app/[sport]/(home)/_components/tab.tsx`
  - `apps/spectator/src/app/[sport]/(home)/previous/_components/league-card-list.tsx`
  - `apps/spectator/src/app/[sport]/(home)/previous/_components/year-filter.tsx`
  - `apps/spectator/src/app/[sport]/(home)/previous/_components/league-card.tsx`
  - `apps/spectator/src/app/[sport]/(home)/teams/_components/match-history.tsx`
  - `apps/spectator/src/app/[sport]/(home)/teams/_components/tab.tsx`
  - `apps/spectator/src/app/[sport]/(home)/teams/_components/team-card.tsx`
  - `apps/spectator/src/app/[sport]/(home)/teams/_components/team-filter/index.tsx`
  - `apps/spectator/src/app/[sport]/_calendar/_components/GameCard.tsx`
  - `apps/spectator/src/app/[sport]/leagues/_components/game-list.tsx`
  - `apps/spectator/src/app/[sport]/teams/[id]/_components/team-info.tsx`

- [ ] **Step 1: 훅 교체**

```ts
// apps/spectator/src/hooks/useOrganizationId.ts
'use client';

import { parseAsInteger, useQueryState } from 'nuqs';
import { useEffect } from 'react';

const STORAGE_KEY = 'organizationId';

type SetOrganizationIdFn = ReturnType<typeof useQueryState<number>>[1];

export type UseOrganizationIdResult =
  | { isReady: true; organizationId: number; setOrganizationId: SetOrganizationIdFn }
  | { isReady: false; organizationId: null; setOrganizationId: SetOrganizationIdFn };

export const useOrganizationId = (): UseOrganizationIdResult => {
  const [organizationId, setOrganizationId] = useQueryState('organizationId', parseAsInteger);

  useEffect(() => {
    if (organizationId !== null) {
      localStorage.setItem(STORAGE_KEY, String(organizationId));
    }
  }, [organizationId]);

  if (organizationId === null) {
    return { isReady: false, organizationId: null, setOrganizationId };
  }
  return { isReady: true, organizationId, setOrganizationId };
};
```

> URL 키는 아직 `organizationId`. Task 6에서 `org`로 일괄 변경. `DEFAULT_ID`와 마운트 시 localStorage 복구 로직 제거.

- [ ] **Step 2: 호출부 패턴 통일 — discriminated union 가드 추가**

각 호출부의 패턴은 다음과 같이 일관되게 변경한다:

**기존:**
```ts
const { organizationId } = useOrganizationId();
// organizationId 사용 (number로 가정)
```

**변경:**
```ts
const result = useOrganizationId();
if (!result.isReady) return null;
const { organizationId } = result;
// organizationId는 number로 좁혀짐
```

`setOrganizationId`도 함께 쓰는 경우는 다음과 같이:

```ts
const result = useOrganizationId();
if (!result.isReady) return null;
const { organizationId, setOrganizationId } = result;
```

각 파일에서 `const { organizationId, ... } = useOrganizationId();` 형태를 위 패턴으로 치환한다. 컴포넌트가 conditional rendering을 이미 다른 이유로 하고 있더라도, 훅 호출 자체는 항상 가장 위에서 한 번 호출되어야 한다(React Rules of Hooks).

**다중 호출부 주의:** 한 파일 안에 여러 컴포넌트/함수가 각각 `useOrganizationId`를 호출하는 경우가 있다 (예: `app/[sport]/(home)/_components/tab.tsx` line 26과 line 107, `app/[sport]/(home)/teams/_components/tab.tsx`도 동일 패턴 가능성). 각 호출부마다 동일한 `if (!result.isReady) return null;` 가드를 독립적으로 추가한다.

> 예외: `school-select.tsx`는 Task 7에서 어차피 삭제될 파일이므로 빌드만 통과하면 됨. 빠르게 동일 패턴 적용 후 진행.
> 예외: `header.tsx`는 organizationId가 null이어도 `<HCCLogo>` 자체는 보여야 하므로 다음 분기 패턴을 사용:

```ts
// header.tsx 안에서
const result = useOrganizationId();
const organizationId = result.isReady ? result.organizationId : null;
const homeHref = {
  pathname: homePathname,
  query: organizationId !== null ? { organizationId } : {},
};
```

- [ ] **Step 3: 타입체크**

Run: `pnpm --filter spectator exec tsc --noEmit`
Expected: 에러 없음. 만약 호출부 중 `if (!result.isReady)` 가드 후에도 좁혀지지 않은 곳이 있으면 destructure 패턴 누락이므로 수정.

- [ ] **Step 4: dev server로 수동 검증**

Run: `pnpm dev:spectator`
- `http://localhost:11113/soccer?organizationId=9` → 홈이 정상 렌더되는지
- `http://localhost:11113/soccer?organizationId=9` 에서 previous/teams 페이지 진입해 데이터 로딩 정상 동작 확인
- `http://localhost:11113/welcome` 진입 정상
- localStorage에 organizationId가 계속 동기화되는지 (DevTools)

- [ ] **Step 5: 커밋**

```bash
git add apps/spectator/src/hooks/useOrganizationId.ts \
        apps/spectator/src/components/layout/header.tsx \
        'apps/spectator/src/app/[sport]'
git commit -m "refactor: useOrganizationId를 discriminated union으로 변경"
```

---

## Task 6: URL 키 `organizationId` → `org` 일괄 마이그레이션

**Files (모두 Modify):**

- `apps/spectator/src/hooks/useOrganizationId.ts`
- `apps/spectator/src/components/layout/header.tsx`
- `apps/spectator/src/app/[sport]/(home)/_components/navigation-bar.tsx`
- `apps/spectator/src/app/page.tsx`
- `apps/spectator/middleware.ts`
- `apps/spectator/src/app/welcome/_components/welcome-view.tsx`

> 이 시점에서 URL 키를 한 번에 바꿔서 일관성을 확보한다. localStorage 키는 그대로 `organizationId` 유지.

- [ ] **Step 1: 훅 키 변경**

`apps/spectator/src/hooks/useOrganizationId.ts`:

```ts
const [organizationId, setOrganizationId] = useQueryState('org', parseAsInteger);
```

(`'organizationId'` → `'org'`)

- [ ] **Step 2: header 쿼리 키 변경**

`apps/spectator/src/components/layout/header.tsx`의 `homeHref` 구성에서 `query: { organizationId }` → `query: { org: organizationId }`로 변경.

```ts
const homeHref = {
  pathname: homePathname,
  query: organizationId !== null ? { org: organizationId } : {},
};
```

- [ ] **Step 3: navigation-bar 쿼리 키 변경**

`apps/spectator/src/app/[sport]/(home)/_components/navigation-bar.tsx` line 24:

```ts
const organizationId = searchParams.get('org');
```

또한 같은 파일에서 이 값을 사용해 URL을 다시 만드는 부분이 있다면 모두 `org`로. (`searchParams.get('organizationId')` → `searchParams.get('org')`)

- [ ] **Step 4: 루트 페이지 키 변경**

`apps/spectator/src/app/page.tsx`:

```ts
type Props = {
  searchParams: Promise<{ sport?: string; org?: string }>;
};

const Page = async ({ searchParams }: Props) => {
  const { sport, org } = await searchParams;
  const parsed = org ? Number(org) : NaN;
  const isValid = Number.isInteger(parsed) && parsed > 0;
  if (!isValid) redirect('/welcome');

  const sportType = normalizeSportParam(sport) ?? DEFAULT_SPORT;
  redirect(`${routes.home({ sport: sportType })}?org=${parsed}`);
};
```

- [ ] **Step 5: middleware 키 변경**

`apps/spectator/middleware.ts`:

```ts
const raw = searchParams.get('org');
```

(`'organizationId'` → `'org'`)

- [ ] **Step 6: welcome-view 키 변경**

`apps/spectator/src/app/welcome/_components/welcome-view.tsx` 상단의 `URL_KEY` 상수를 `'org'`로 변경. CTA 핸들러도 자연스럽게 `?org=<id>`로 navigate.

```ts
const URL_KEY = 'org';
```

- [ ] **Step 7: 전수 검사**

Run: `grep -rn "'organizationId'\|\"organizationId\"" apps/spectator/src apps/spectator/middleware.ts | grep -v "STORAGE_KEY\|localStorage\|queryKey.ts"`
Expected: 결과 비어 있어야 함 (queryKey.ts의 API 호출 파라미터는 의도적으로 유지).

또한 URL 쿼리 구성에서 누락 검사:
Run: `grep -rn "organizationId=" apps/spectator/src apps/spectator/middleware.ts`
Expected: 결과 비어 있어야 함.

- [ ] **Step 8: 타입체크 + dev server 검증**

Run: `pnpm --filter spectator exec tsc --noEmit`
Expected: 에러 없음

Run: `pnpm dev:spectator`
- `http://localhost:11113/` → `/welcome`
- `/welcome`에서 학교 선택 + 시작하기 → URL이 `?org=<id>` 형태인지
- 새로고침 후 같은 조직 유지
- `http://localhost:11113/soccer` (org 없음) → `/welcome`으로 가는지
- `http://localhost:11113/soccer?organizationId=9` (구 키) → `/welcome`으로 가는지 (호환 미지원이므로 정상 동작)

- [ ] **Step 9: 커밋**

```bash
git add apps/spectator
git commit -m "feat: URL 쿼리 키를 organizationId에서 org로 변경"
```

---

## Task 7: `OrgSwitcher` 추가 + `SchoolSelect` 제거

**Files:**

- Create: `apps/spectator/src/app/[sport]/(home)/_components/org-switcher.tsx`
- Modify: `apps/spectator/src/app/[sport]/(home)/layout.tsx`
- Delete: `apps/spectator/src/app/[sport]/(home)/_components/school-select.tsx`

- [ ] **Step 1: `org-switcher.tsx` 생성**

```tsx
// apps/spectator/src/app/[sport]/(home)/_components/org-switcher.tsx
'use client';

import { Suspense } from 'react';

import { BottomSheet, Spinner } from '@hcc/ui';
import { ErrorBoundary } from '@suspensive/react';
import { startTransition, useState } from 'react';

import { useSuspenseOrganizations } from '~/api/queries/useOrganizations';
import { useOrganizationId } from '~/hooks/useOrganizationId';

const OrgSwitcherContent = () => {
  const { data: organizations } = useSuspenseOrganizations();
  const result = useOrganizationId();
  const [open, setOpen] = useState(false);
  const [pendingId, setPendingId] = useState<number | null>(null);

  // middleware로 보호되므로 사실상 항상 isReady=true
  if (!result.isReady) return null;
  const { organizationId, setOrganizationId } = result;

  const current = organizations.find((o) => o.id === organizationId);
  const alternatives = organizations.filter((o) => o.id !== organizationId);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setPendingId(null);
  };

  const handleConfirm = () => {
    if (pendingId === null) return;
    startTransition(async () => {
      await setOrganizationId(pendingId, { scroll: false, history: 'replace' });
    });
    setOpen(false);
    setPendingId(null);
  };

  return (
    <BottomSheet open={open} onOpenChange={handleOpenChange}>
      <BottomSheet.Trigger asChild>
        <button
          type="button"
          className="flex max-w-[160px] items-center gap-1 truncate text-sm font-medium text-neutral-900"
        >
          <span className="truncate">{current?.name ?? '학교 선택'}</span>
          {/* chevron 아이콘 — 디자인에 맞는 @hcc/icons 항목 사용 */}
          <span aria-hidden>▾</span>
        </button>
      </BottomSheet.Trigger>
      <BottomSheet.Content>
        <BottomSheet.Header>
          {/* 카피는 Figma에 맞춰 추후 정합 */}
          <BottomSheet.Title>다른 학교를 선택해주세요</BottomSheet.Title>
        </BottomSheet.Header>
        <ul className="flex flex-col gap-2 px-5 pb-2">
          {alternatives.map((org) => {
            const selected = pendingId === org.id;
            return (
              <li key={org.id}>
                <button
                  type="button"
                  onClick={() => setPendingId(org.id)}
                  aria-pressed={selected}
                  className={
                    selected
                      ? 'flex w-full items-center gap-3 rounded-2xl border border-[var(--color-primary-600)] bg-primary-50 p-4'
                      : 'flex w-full items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4'
                  }
                >
                  <div className="size-10 shrink-0 rounded-full bg-neutral-200" aria-hidden />
                  <span className="truncate text-base text-neutral-900">{org.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <BottomSheet.Footer>
          <button
            type="button"
            disabled={pendingId === null}
            onClick={handleConfirm}
            className="h-12 w-full rounded-xl bg-[var(--color-primary-600)] text-base font-semibold text-white disabled:bg-neutral-200 disabled:text-neutral-400"
          >
            선택완료
          </button>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export const OrgSwitcher = () => (
  <ErrorBoundary fallback={null}>
    <Suspense
      fallback={<div className="h-5 w-24 animate-pulse rounded bg-neutral-100" aria-hidden />}
    >
      <OrgSwitcherContent />
    </Suspense>
  </ErrorBoundary>
);
```

- [ ] **Step 2: 레이아웃 교체**

`apps/spectator/src/app/[sport]/(home)/layout.tsx`:

```tsx
import '@hcc/ui/styles.css';
import '~/styles/globals.css';
import type { PropsWithChildren } from 'react';

import { Header } from '~/components/layout';

import { NavigationBar } from './_components/navigation-bar';
import { OrgSwitcher } from './_components/org-switcher';

type Props = PropsWithChildren;

const RootLayout = ({ children }: Props) => {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <Header center={<OrgSwitcher />} />
      <div className="flex flex-1 flex-col pb-navbar-height">{children}</div>
      <NavigationBar />
    </div>
  );
};

export default RootLayout;
```

(기존 `SchoolSelect`/`ErrorBoundary` 래핑은 `OrgSwitcher` 내부로 이동했으므로 단순화.)

- [ ] **Step 3: school-select.tsx 삭제**

```bash
git rm apps/spectator/src/app/[sport]/\(home\)/_components/school-select.tsx
```

- [ ] **Step 4: 타입체크**

Run: `pnpm --filter spectator exec tsc --noEmit`
Expected: 에러 없음. `school-select`를 import하는 곳이 더는 없는지 grep으로 확인.

Run: `grep -rn "school-select" apps/spectator/src`
Expected: 결과 비어 있어야 함.

- [ ] **Step 5: dev server로 수동 검증**

Run: `pnpm dev:spectator`
- `http://localhost:11113/soccer?org=9` 진입 → 헤더 좌측에 학교명 + chevron 트리거 보이는지
- 트리거 클릭 → BottomSheet 열림
- 시트 안에 현재 학교(한국외국어대학교)는 보이지 않고 경희대학교만 보이는지
- 경희대 카드 탭 → 하이라이트, "선택완료" 활성화
- "선택완료" 클릭 → 시트 닫히고 URL `?org=11`로 갱신, 헤더 학교명이 "경희대학교"로 변경
- 다시 트리거 클릭 → 이번에는 시트 안에 한국외국어대학교만 보이는지
- 새로고침 후에도 경희대학교 유지 + localStorage 동기화 확인

- [ ] **Step 6: 커밋**

```bash
git add apps/spectator
git commit -m "feat: 헤더 학교 전환 BottomSheet(OrgSwitcher) 도입, SchoolSelect 제거"
```

---

## Task 8: 빌드 검증 + 전체 스모크 테스트

**Files:** 없음

- [ ] **Step 1: spectator 빌드**

Run: `pnpm build:spectator`
Expected: 에러 없이 성공.

- [ ] **Step 2: lint**

Run: `pnpm --filter spectator lint`
Expected: 에러 없음. (경고는 본 작업 범위 외에서 발생한 것이라면 무시 가능.)

- [ ] **Step 3: 전체 사용자 흐름 스모크 테스트**

Run: `pnpm dev:spectator`

체크리스트 (모두 통과해야 종료):

- [ ] `localStorage` 비운 상태에서 `http://localhost:11113/` → `/welcome` (사전 선택 없음, CTA disabled)
- [ ] `/welcome`에서 한국외국어대학교 선택 → "시작하기" → `/soccer?org=9`
- [ ] 새로고침 → 동일 페이지 유지
- [ ] 헤더 트리거 → 시트 → 경희대학교 선택 → "선택완료" → URL `?org=11`로 갱신, 페이지 데이터 재페치
- [ ] URL bar에서 `?org=11` 제거 후 엔터 → 즉시 `/welcome`로 이동
- [ ] `/welcome`에서 이전 선택(경희대)이 사전 선택되어 있는지 (localStorage에서 복원)
- [ ] `http://localhost:11113/soccer?org=99` (목록에 없는 id) 진입 → 페이지가 ErrorBoundary로 자연스럽게 떨어지는지(빈 화면 아님)
- [ ] `http://localhost:11113/?org=11&sport=basketball` 직접 진입 → `/basketball?org=11`로 진입되는지
- [ ] 헤더의 HCCLogo 클릭 → 현재 sport 홈으로 이동하며 `?org=` 유지되는지

- [ ] **Step 4: 최종 커밋 (필요 시)**

스모크 테스트 중 사소한 수정이 있었다면 커밋. 없으면 생략.

```bash
git add apps/spectator
git commit -m "fix: 스모크 테스트 후속 수정"
```

---

## 변경 요약 (예상)

| 추가 | 수정 | 삭제 |
| --- | --- | --- |
| `middleware.ts` | `useOrganizationId.ts` (대폭) | `school-select.tsx` |
| `constants/organizations.ts` | `app/page.tsx` |  |
| `app/welcome/page.tsx` | `app/[sport]/(home)/layout.tsx` |  |
| `app/welcome/_components/welcome-view.tsx` | `components/layout/header.tsx` |  |
| `app/welcome/_components/organization-card.tsx` | `app/[sport]/(home)/_components/navigation-bar.tsx` |  |
| `app/[sport]/(home)/_components/org-switcher.tsx` | 호출부 12개에 `isReady` 가드 추가 |  |
