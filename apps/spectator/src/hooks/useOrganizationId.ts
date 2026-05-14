'use client';

import { parseAsInteger, useQueryState } from 'nuqs';

type SetOrganizationIdFn = ReturnType<typeof useQueryState<number>>[1];

export type UseOrganizationIdResult =
  | { isReady: true; organizationId: number; setOrganizationId: SetOrganizationIdFn }
  | { isReady: false; organizationId: null; setOrganizationId: SetOrganizationIdFn };

/**
 * URL `?org`을 단일 출처로 사용. 쿠키 동기화는 middleware(proxy.ts)가 담당한다.
 */
export const useOrganizationId = (): UseOrganizationIdResult => {
  const [organizationId, setOrganizationId] = useQueryState('org', parseAsInteger);

  if (organizationId === null) return { isReady: false, organizationId: null, setOrganizationId };
  return { isReady: true, organizationId, setOrganizationId };
};
