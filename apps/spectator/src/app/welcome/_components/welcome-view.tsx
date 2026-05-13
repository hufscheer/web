'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { useSuspenseOrganizations } from '~/api/queries/useOrganizations';
import { routes } from '~/constants/routes';
import { DEFAULT_SPORT } from '~/utils/sport-route';

import { OrganizationCard } from './organization-card';

const STORAGE_KEY = 'organizationId';
const URL_KEY = 'org';

export const WelcomeView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: organizations } = useSuspenseOrganizations();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const knownIds = useMemo(() => new Set(organizations.map((o) => o.id)), [organizations]);

  useEffect(() => {
    // URL 우선
    const rawUrl = searchParams.get(URL_KEY);
    const fromUrl = rawUrl === null ? Number.NaN : Number(rawUrl);
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
    // 선택 상태 초기화는 마운트 시 한 번만 수행. searchParams가 바뀌어도 이미 선택한 값을 덮어쓰지 않는다.
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
          className="h-12 w-full rounded-xl bg-[var(--color-primary-600)] text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
        >
          시작하기
        </button>
      </div>
    </div>
  );
};
