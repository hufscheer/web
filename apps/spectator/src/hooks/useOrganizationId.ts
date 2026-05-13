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
