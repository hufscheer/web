'use client';

import { parseAsInteger, useQueryState } from 'nuqs';
import { useEffect } from 'react';

const STORAGE_KEY = 'organizationId';
const DEFAULT_ID = 2;

const readStorage = (): number | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw === null) return null;
  const parsed = Number(raw);

  return Number.isFinite(parsed) ? parsed : null;
};

const writeStorage = (id: number) => {
  localStorage.setItem(STORAGE_KEY, String(id));
};

export const useOrganizationId = () => {
  const [organizationId, setOrganizationId] = useQueryState(
    'organizationId',
    parseAsInteger.withDefault(DEFAULT_ID).withOptions({ clearOnDefault: false }),
  );

  // 마운트 후 localStorage 복구 (URL에 param이 없을 때만)
  useEffect(() => {
    const stored = readStorage();
    if (stored !== null && stored !== organizationId) {
      // oxlint-disable-next-line typescript/no-floating-promises
      setOrganizationId(stored, { scroll: false, history: 'replace' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // organizationId가 변경될 때마다 localStorage 동기화
  useEffect(() => {
    if (organizationId !== null) {
      writeStorage(organizationId);
    }
  }, [organizationId]);

  return { organizationId, setOrganizationId };
};
