# CLAUDE.md

Claude Code가 이 레포지토리에서 작업할 때 참고하는 단일 지침 문서. 작업 시작 전 이 문서와 [`docs/DOMAIN.md`](docs/DOMAIN.md)의 도메인 용어를 먼저 숙지한다.

## Project overview

훕치치(hcc) — 한국외대 스포츠 경기 중계 플랫폼. 매니저가 대회·게임을 운영하고 관객이 실시간 관람·응원하는 서비스.

- **Monorepo**: Turborepo + pnpm (`pnpm@10`, `node >= 20`)
- **Frontend**: React 19, Next.js 16 (App Router), TypeScript, vanilla-extract
- **Data**: TanStack Query, Axios (via `@hcc/api-base`)
- **Monitoring**: Sentry

> **대회(League) · 게임(Game) · 응원톡(CheerTalk) 같은 도메인 명사가 등장하면** `docs/DOMAIN.md`에서 정의를 먼저 확인한다. 영문 표기는 코드·타입·라우트에 그대로 사용된다.

## Workspace layout

### Apps (`apps/`)

- **`spectator`** — 관객용 앱. 실시간 경기 정보 조회·응원톡·응원횟수. **읽기 중심**이며 운영/관리 기능은 넣지 않는다.
- **`manager`** — 매니저용 모바일 대시보드. 대회·게임 생성, 라인업·점수·타임라인 입력. 관객 전용 읽기 최적화 기능은 넣지 않는다.

### Packages (`packages/` → 패키지명 `@hcc/*`)

- **`api-base`** — 공통 네트워크 레이어. 베이스 URL, 헤더, fetcher, QueryClient 설정. 앱 화면 의존 로직 금지.
- **`icons`** — 공유 아이콘. 앱 전용 임시 아이콘 정의 금지. **아이콘 추가 시 `src/index.ts` export + `pnpm build` 필수.**
- **`style`** — 공유 CSS 변수·유틸·테마. 디자인 토큰은 하드코딩 대신 여기서 가져온다.
- **`ui`** — 재사용 UI 프리미티브·컴포넌트. 앱별 비즈니스 카피나 도메인 의존 props 금지.
- **`toolkit`**, **`ko-fuzzy`** — 공유 유틸리티.

## Working principles

- 요청된 도메인 범위 안에서만 변경한다. 무관 파일은 건드리지 않는다.
- 앱 로컬 로직은 `apps/*`에, 공유 가능한 로직은 `packages/*`에 둔다. spectator와 manager 양쪽에서 쓰이면 패키지화를 먼저 검토한다.
- API 호출은 `@hcc/api-base`와 각 앱의 `src/api/` 레이어 컨벤션을 따른다.
- 디자인 토큰·공유 스타일은 `@hcc/style`에서 가져오고 하드코딩을 최소화한다.
- 재사용 컴포넌트는 `@hcc/ui`에 두고, 앱별 화면은 그걸 조립해 구성한다.
- 공유 패키지를 수정하면 spectator와 manager 양쪽 영향도를 모두 확인한다.

## Code conventions

### TypeScript

- `type`보다 `interface`를 선호한다.
- `enum` 대신 `as const` 객체 맵을 사용한다.
- 타입 검증은 `satisfies` 연산자.
- `any`·무분별한 assertion 금지. 타입을 모르면 `unknown`으로 받고 좁힌다.

### Naming

- 불리언·상태 변수: `isLoading`, `hasError` 등 보조동사 prefix.
- 이벤트 핸들러: `handle` prefix (`handleClick`, `handleSubmit`).
- 디렉터리: kebab-case (`components/auth-wizard`).
- 컴포넌트는 named export.

### React 19 / Next.js 16

- **Server Component 기본.** `'use client'`는 상호작용이 필요한 리프에만 둔다.
- 비동기 런타임 API는 `await` 필수: `cookies()`, `headers()`, `draftMode()`, `params`, `searchParams`.
- 폼 상태는 `useActionState`를 쓴다 (`useFormState`는 deprecated).
- `useFormStatus`의 `data`/`method`/`action` 속성을 활용한다.
- URL 상태 관리는 `nuqs`.
- 로딩·에러 상태는 Suspense와 Error Boundary로 선언적으로 처리한다.
- **요청 인터셉션 파일은 `src/proxy.ts`** (Next 16 컨벤션, default export 이름은 `proxy`). `spectator`가 이미 이 패턴을 사용한다. `manager`의 레거시 `middleware.ts`는 신규 작업에서 `proxy.ts`로 이전 검토.

### Styling

- 토큰·테마 변수는 `@hcc/style`에서. 하드코딩된 hex·px 지양.
- 컴포넌트는 모바일 레이아웃을 기본값으로 설계한다 (manager는 모바일 우선).

### UX states

- 신규 기능은 **empty / loading / error** 세 상태를 모두 설계한다.
- 실시간 점수·쿼터·타임라인 데이터는 결측·지연·중복에 방어적으로 대응한다.
- `console.log`는 커밋에 포함하지 않는다.

## Validation

레포지토리 루트에서 실행한다.

| 목적 | 명령 |
| --- | --- |
| 전체 빌드 | `pnpm build` |
| 전체 린트 | `pnpm lint` |
| 매니저 빌드 | `pnpm build:manager` |
| 관객 빌드 | `pnpm build:spectator` |
| 매니저 dev 서버 | `pnpm dev:manager` |
| 관객 dev 서버 | `pnpm dev:spectator` |

### Pre-commit 체크리스트

- 변경된 앱 또는 패키지에 대해 build 또는 lint를 최소 1회 실행했는가.
- 공유 패키지를 수정했다면 spectator와 manager 양쪽 영향을 확인했는가.
- UI를 바꿨다면 모바일 레이아웃까지 눈으로 확인했는가.

## 추가 참고

- 도메인 용어·엔티티 관계: [`docs/DOMAIN.md`](docs/DOMAIN.md)
- 기존 skill 번들: `.agents/skills/`에 `frontend-design`, `next-best-practices`, `vercel-react-best-practices`, `web-design-guidelines`가 있다. 해당 skill이 다루는 주제가 등장하면 먼저 참조한다.
