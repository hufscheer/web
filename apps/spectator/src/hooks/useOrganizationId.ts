'use client';

import type { Options } from 'nuqs';

import { parseAsInteger, useQueryState } from 'nuqs';
import { useCallback } from 'react';

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
  const stored = readStorage();

  const [urlId, _setUrlId] = useQueryState(
    'organizationId',
    parseAsInteger.withDefault(stored ?? DEFAULT_ID).withOptions({ clearOnDefault: false }),
  );

  // localStorage에 아직 값이 없으면 현재 URL 값을 저장
  if (stored === null && urlId !== null) {
    writeStorage(urlId);
  }

  const setOrganizationId = useCallback(
    (value: number | ((prev: number) => number | null) | null, options?: Options) => {
      if (typeof value === 'number') {
        writeStorage(value);
      }
      return _setUrlId(value, options);
    },
    [_setUrlId],
  );

  return { organizationId: urlId, setOrganizationId };
};
