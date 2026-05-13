# 조직 선택 기능 설계 (Organization Selection)

- 작성일: 2026-05-13
- 대상 앱: `apps/spectator`
- 관련 브랜치: `link-organization-id`

## 배경

현재 `useOrganizationId` 훅은 nuqs로 URL의 `organizationId` 쿼리 스트링을 읽고, 값이 없으면 `DEFAULT_ID = 9`로 폴백한다. 즉 사용자가 URL에서 쿼리 스트링을 지워도 자동으로 9(한국외국어대학교)로 채워지기 때문에 데이터 누락은 표면적으로 보이지 않으나, **다음과 같은 문제가 있다.**

1. URL이 진실의 원천이 아니다. 사용자가 의도와 무관하게 특정 조직 데이터를 본다.
2. 새로 추가된 조직(경희대학교)에 대해 누군가 URL을 손으로 정리하면 의도치 않게 다른 조직으로 강제 전환된다.
3. 폴백 ID가 코드에 박혀 있어 조직 확장에 친화적이지 않다.

## 목표

- URL이 조직 선택의 단일 진실 원천이 되도록 한다.
- URL에 유효한 조직 식별자가 없으면 명시적인 선택 페이지(`/welcome`)로 유도한다.
- `/welcome`에서는 직전 선택을 localStorage로 보조적으로 활용한다.
- 홈 화면에서 다른 조직으로 전환할 수 있는 BottomSheet UI를 제공한다.

## 비목표

- 조직 단위 권한/인증.
- 조직별 도메인 분리.
- 조직 로고의 실제 에셋 정합(더미 슬롯으로 자리만 확보).
- 기존 `?organizationId=` 쿼리 키와의 하위 호환.

## 용어

- **org**: 새 쿼리 키 이름. 값은 정수(서버가 제공하는 organization id).
- **보호 라우트(Protected route)**: 조직 컨텍스트가 필수인 라우트. 현재로서는 `/[sport]/*`.
- **선택기(Selector)**: `/welcome` — 전체 조직 목록을 노출하여 명시적으로 선택하는 화면.
- **전환기(Switcher)**: 홈 헤더에 있는 BottomSheet 진입 버튼 — 현재 조직을 제외한 다른 조직으로 전환.

## 사용자 흐름

| 진입 URL | 결과 |
| --- | --- |
| `/` (org 없음) | server redirect → `/welcome` |
| `/?org=9` | server redirect → `/soccer?org=9` |
| `/?sport=basketball&org=11` | server redirect → `/basketball?org=11` |
| `/soccer` (org 없음) | middleware → `/welcome` |
| `/soccer?org=` 또는 `?org=abc` | middleware → `/welcome` |
| `/soccer?org=9` | 통과 |
| `/welcome` | 선택 UI (localStorage/URL 기반 사전 선택) |

### `/welcome`에서의 사전 선택 우선순위

1. URL `org` 값이 유효(정수 + 화이트리스트 일치)하면 해당 조직을 선택 상태로.
2. 그 외에는 `localStorage.organizationId` 값을 시도.
3. 둘 다 없거나 무효이면 아무것도 선택 안 됨(CTA disabled).

### 선택 후 흐름 (`/welcome`)

- 카드 탭으로 조직 선택 → 하단 "시작하기" CTA 활성화.
- CTA 클릭 → `localStorage.organizationId = <id>` 저장 → `router.replace('/<DEFAULT_SPORT>?org=<id>')`.

### 전환 흐름 (홈 헤더 → BottomSheet)

- 헤더의 `<HCCLogo>` 옆 트리거 버튼 표시: 현재 조직명 + chevron.
- 트리거 클릭 → BottomSheet 오픈.
- 시트 안에는 **현재 선택된 조직을 제외한** 나머지 조직만 나열.
- 카드 탭 → 선택 표시 → 하단 "선택완료" 버튼 활성화 → 클릭 시:
  1. URL `?org=<id>` 갱신 (history: replace, scroll: false)
  2. localStorage 동기화 (`useOrganizationId` 내부 effect로 자동)
  3. 시트 닫기

## 아키텍처

### 신규/수정 파일

| 경로 | 종류 | 역할 |
| --- | --- | --- |
| `apps/spectator/middleware.ts` | 신규 | 보호 라우트 진입 시 `?org` 검증. 무효면 `/welcome`. |
| `apps/spectator/src/app/page.tsx` | 수정 | `?org`이 없으면 `/welcome`, 있으면 sport 홈으로 1-hop redirect. |
| `apps/spectator/src/app/welcome/page.tsx` | 신규 | 서버 경계. `<WelcomeView />` 마운트. |
| `apps/spectator/src/app/welcome/_components/welcome-view.tsx` | 신규 | 선택 상태 관리 + CTA. |
| `apps/spectator/src/app/welcome/_components/organization-card.tsx` | 신규 | 조직 카드 (로고 슬롯 + 이름 + 선택 상태). |
| `apps/spectator/src/app/[sport]/(home)/layout.tsx` | 수정 | `<SchoolSelect />` → `<OrgSwitcher />` 교체. |
| `apps/spectator/src/app/[sport]/(home)/_components/org-switcher.tsx` | 신규 | 트리거 버튼 + BottomSheet. |
| `apps/spectator/src/hooks/useOrganizationId.ts` | 수정 | `DEFAULT_ID` 제거. discriminated union 반환. |
| `apps/spectator/src/constants/organizations.ts` | 신규 | 조직 메타 (id, displayName, 로고 슬롯) 화이트리스트. |
| `apps/spectator/src/app/[sport]/(home)/_components/school-select.tsx` | 삭제 | OrgSwitcher로 대체. |

### 진입 가드 (middleware)

```ts
// apps/spectator/middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_PREFIXES = ['/soccer', '/basketball']; // SportType 기준

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const raw = searchParams.get('org');
  const parsed = raw === null ? NaN : Number(raw);
  const isValid = Number.isInteger(parsed) && parsed > 0;
  if (isValid) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = '/welcome';
  url.search = '';
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ['/((?!_next|api|welcome|favicon.ico|.*\\.).*)'],
};
```

- middleware는 정수 검증만 수행. 화이트리스트(존재하는 조직인지) 검증은 클라이언트 페치 결과로 자연스럽게 처리(ErrorBoundary). 이유: 조직 추가 시 두 곳을 동기화하지 않기 위함.
- `/welcome`, `_next`, 정적 자산, api는 matcher로 제외.

### 루트 페이지 흐름

```ts
// apps/spectator/src/app/page.tsx
type Props = {
  searchParams: Promise<{ sport?: string; org?: string }>;
};

const Page = async ({ searchParams }: Props) => {
  const { sport, org } = await searchParams;
  const parsed = org ? Number(org) : NaN;
  const isValid = Number.isInteger(parsed) && parsed > 0;
  if (!isValid) {
    redirect('/welcome');
  }
  const sportType = normalizeSportParam(sport) ?? DEFAULT_SPORT;
  redirect(`${routes.home({ sport: sportType })}?org=${parsed}`);
};
```

### `useOrganizationId` 훅

```ts
type UseOrganizationIdResult =
  | { isReady: true; organizationId: number; setOrganizationId: SetOrgFn }
  | { isReady: false; organizationId: null; setOrganizationId: SetOrgFn };

export const useOrganizationId = (): UseOrganizationIdResult => {
  const [organizationId, setOrganizationId] = useQueryState(
    'org',
    parseAsInteger,
  );

  useEffect(() => {
    if (organizationId !== null) {
      localStorage.setItem('organizationId', String(organizationId));
    }
  }, [organizationId]);

  if (organizationId === null) {
    return { isReady: false, organizationId: null, setOrganizationId };
  }
  return { isReady: true, organizationId, setOrganizationId };
};
```

- 호출부는 `if (!isReady) return null;` 패턴으로 number 좁히기. middleware로 보호된 라우트에서는 사실상 `isReady === true`가 보장되지만, 타입 안전성과 추가 방어선 차원에서 유지.
- localStorage 키는 기존 `organizationId` 그대로 사용 (URL 키만 `org`로 변경).
- 마운트 시 localStorage → URL 복구 로직은 제거. 그 책임은 `/welcome`이 진다.

### 조직 상수 (화이트리스트)

```ts
// apps/spectator/src/constants/organizations.ts
import type { ReactNode } from 'react';

export type OrganizationMeta = {
  id: number;
  displayName: string;
  // 로고 슬롯은 더미. 추후 실제 이미지/컴포넌트로 교체.
};

export const ORGANIZATIONS: readonly OrganizationMeta[] = [
  { id: 9, displayName: '한국외국어대학교' },
  { id: 11, displayName: '경희대학교' },
] as const;
```

- 실제 id는 코드 작성 시 백엔드/`/organizations` 응답으로 재확인 필요.
- 이 상수는 `/welcome` 사전 선택 검증과 BottomSheet/카드 displayName fallback에 활용. 데이터 자체는 여전히 `useSuspenseOrganizations`가 진실 원천.

### `/welcome` 컴포넌트 구조

```text
app/welcome/
├── page.tsx                  // server boundary, <WelcomeView /> 마운트
└── _components/
    ├── welcome-view.tsx      // client: 선택 상태 + CTA
    └── organization-card.tsx // client: 로고 슬롯 + 이름 + selected 상태
```

- `<WelcomeView />`에서 `useSuspenseOrganizations()`로 목록 페치.
- 마운트 시 (a) URL `?org` → (b) localStorage `organizationId` 순서로 초기 `selectedId` 결정. 단, 응답 목록에 존재하는 id일 때만 채택.
- CTA: `selectedId === null`이면 disabled.
- CTA 클릭 핸들러:
  1. `localStorage.setItem('organizationId', String(selectedId))`
  2. `router.replace(\`${routes.home({ sport: DEFAULT_SPORT })}?org=${selectedId}\`)`

### `<OrgSwitcher />` 컴포넌트

```text
app/[sport]/(home)/_components/
└── org-switcher.tsx
```

- 외부 래퍼는 기존 `SchoolSelect`와 동일한 패턴으로 `<Suspense fallback={...}>` 경계를 둔다. 내부 콘텐츠 컴포넌트(`<OrgSwitcherContent />`)에서 `useSuspenseOrganizations()` + `useOrganizationId()` 호출.
- 트리거 버튼: 현재 organization의 `name` + chevron 아이콘. 길면 truncate.
- 트리거 클릭 → `@hcc/ui`의 `BottomSheet` 오픈.
- 시트 내부:
  - 타이틀/카피는 Figma 그대로 (구현 시점에 동기화).
  - 카드 목록은 `organizations.filter((o) => o.id !== organizationId)`. 즉 현재 선택은 제외.
  - 시트 안에서 임시 선택 상태(`pendingId`)를 보관.
  - "선택완료" 버튼은 `pendingId === null`이면 disabled. 클릭 시 `setOrganizationId(pendingId)` 후 시트 닫기.

### 헤더 통합

```tsx
// apps/spectator/src/app/[sport]/(home)/layout.tsx
<Header
  center={
    <ErrorBoundary fallback={null}>
      <OrgSwitcher />
    </ErrorBoundary>
  }
/>
```

기존 `<SchoolSelect />` 및 그 파일은 삭제.

## 엣지 케이스

| 상황 | 처리 |
| --- | --- |
| `/[sport]?org=` (빈 값) | middleware → `/welcome` |
| `/[sport]?org=abc` (정수 아님) | middleware → `/welcome` |
| `/[sport]?org=999` (목록에 없는 id) | middleware 통과 → API 호출 404/빈 결과 → ErrorBoundary |
| `/welcome` 직접 진입 | 그대로 선택 UI 노출 |
| `/welcome`에서 뒤로가기 | 직전 페이지로 이동 (자연스러움) |
| localStorage가 유효하지 않은 값 | `Number.isInteger` 검사로 무시, 초기 선택 안 함 |
| organizations API 실패 | `/welcome`/BottomSheet에서 ErrorBoundary가 에러 메시지 노출 |
| 두 탭에서 다른 조직 선택 | localStorage는 last-write-wins. URL은 각 탭 독립 — 충돌 없음 |
| 트리거 버튼 클릭 시 organizations 페치 지연 | Suspense fallback으로 시트 내부 스피너 |

## 테스트

### E2E (Playwright)

- `/soccer` 직접 진입 → `/welcome`으로 리다이렉트
- `/welcome`에서 조직 카드 탭 → CTA 활성화 → "시작하기" 클릭 → `/<sport>?org=<id>` 이동
- 새로고침 후 같은 조직 유지
- 헤더 트리거 버튼 클릭 → 시트 열림 → 현재 조직이 목록에 없는지 확인
- 시트에서 다른 조직 탭 + "선택완료" → URL/디스플레이 갱신
- URL bar에서 `?org=` 제거 후 엔터 → middleware로 `/welcome` 리다이렉트

### 단위/통합

- middleware: valid/invalid/missing 케이스
- `/`의 server redirect 분기
- `useOrganizationId` discriminated union 동작 (URL 채워졌을 때 / 비었을 때)
- `/welcome` 사전 선택 우선순위 (URL > localStorage > none)

## 마이그레이션

- 기존 `?organizationId=` 쿼리 키와의 하위 호환은 고려하지 않음. 새 키 `?org=`로 전환 후, 기존 키가 있는 링크는 middleware의 검증에 걸려 `/welcome`으로 안내된다.
- 삭제 대상: `school-select.tsx`, `useOrganizationId.ts`의 `DEFAULT_ID = 9` 및 마운트 시 localStorage 복구 effect.

## 미정 사항 (구현 시 확정)

- BottomSheet 및 `/welcome`의 카피는 Figma를 그대로 따른다.
- 조직 로고 에셋은 현재 더미 슬롯(`<div className="size-12 rounded-full bg-neutral-200" />` 등). 실제 에셋 적용은 본 작업 범위에 포함되지 않는다.
- `PROTECTED_PREFIXES` 배열은 sport가 늘어날 때 동기화 필요. 추후 `sport-route` 유틸을 middleware-safe 형태로 추출하면 자동화 가능.
