'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

type NavigatorOptions = {
  scroll?: boolean;
  history?: 'push' | 'replace';
};

type SetOrganizationIdFn = (nextId: number, options?: NavigatorOptions) => void;

const ORG_PREFIX_REGEX = /^\/org\/[^/]+/;

/**
 * URL 세그먼트 `/org/[orgId]` 를 소스로 사용한다.
 * segment 가 없는 경로는 proxy 가 리다이렉트하므로 orgId 는 항상 존재한다.
 */
export const useOrganizationId = (): {
  organizationId: number;
  setOrganizationId: SetOrganizationIdFn;
} => {
  const { orgId } = useParams<{ orgId: string }>();
  const router = useRouter();
  const pathname = usePathname();

  const organizationId = Number(orgId);

  const setOrganizationId = useCallback<SetOrganizationIdFn>(
    (nextId, options) => {
      const nextPath = pathname.replace(ORG_PREFIX_REGEX, `/org/${nextId}`);
      const method = options?.history === 'push' ? 'push' : 'replace';
      router[method](nextPath, { scroll: options?.scroll ?? true });
    },
    [pathname, router],
  );

  return { organizationId, setOrganizationId };
};
