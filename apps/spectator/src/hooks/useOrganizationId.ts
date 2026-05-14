'use client';

import { parseAsInteger, useQueryState } from 'nuqs';
import { useEffect } from 'react';

import { writeOrgCookie } from '~/utils/org-session';

type SetOrganizationIdFn = ReturnType<typeof useQueryState<number>>[1];

export type UseOrganizationIdResult =
  | { isReady: true; organizationId: number; setOrganizationId: SetOrganizationIdFn }
  | { isReady: false; organizationId: null; setOrganizationId: SetOrganizationIdFn };

export const useOrganizationId = (): UseOrganizationIdResult => {
  const [organizationId, setOrganizationId] = useQueryState('org', parseAsInteger);

  useEffect(() => {
    if (organizationId === null) return;

    writeOrgCookie(organizationId);
  }, [organizationId]);

  if (organizationId === null) return { isReady: false, organizationId: null, setOrganizationId };
  return { isReady: true, organizationId, setOrganizationId };
};
