const COOKIE_NAME = 'org';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1년

/**
 * proxy(서버)에서 `NextRequest.cookies.get(...)`로 직접 읽을 때 사용하는 이름.
 * 클라이언트는 아래 헬퍼/액션을 거치므로 직접 사용할 필요가 없다.
 */
export const ORG_COOKIE_NAME = COOKIE_NAME;

// --- 원자 연산 ---

export const writeOrgCookie = (id: number) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=${id}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
};

export const clearOrgCookie = () => {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
};

export const readOrgCookie = (): number | null => {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=(\\d+)`));
  if (!match) return null;

  const parsed = Number(match[1]);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

// --- 고수준 액션 (쿠키 + 라우터 redirect) ---

type Router = { replace: (href: string) => void };

/**
 * /welcome에서 학교 선택을 확정했을 때 호출.
 * 쿠키 기록 후 지정 경로로 이동한다.
 */
export const startOrgSession = (router: Router, redirectTo: string, id: number) => {
  writeOrgCookie(id);
  router.replace(redirectTo);
};

/**
 * 알 수 없는 org id가 감지됐을 때 호출.
 * 쿠키를 제거하고 /welcome으로 이동한다.
 */
export const abandonOrgSession = (router: Router) => {
  clearOrgCookie();
  router.replace('/welcome');
};
