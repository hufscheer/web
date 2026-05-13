'use client';

import { BottomSheet } from '@hcc/ui';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { startTransition, useState } from 'react';

import { useSuspenseOrganizations } from '~/api/queries/useOrganizations';
import { useOrganizationId } from '~/hooks/useOrganizationId';

const OrgSwitcherContent = () => {
  const { data: organizations } = useSuspenseOrganizations();
  const result = useOrganizationId();
  const [open, setOpen] = useState(false);
  const [pendingId, setPendingId] = useState<number | null>(null);

  // middleware로 보호되므로 사실상 항상 isReady=true
  if (!result.isReady) return null;
  const { organizationId, setOrganizationId } = result;

  const current = organizations.find((o) => o.id === organizationId);
  const alternatives = organizations.filter((o) => o.id !== organizationId);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setPendingId(null);
  };

  const handleConfirm = () => {
    if (pendingId === null) return;
    startTransition(async () => {
      await setOrganizationId(pendingId, { scroll: false, history: 'replace' });
    });
    setOpen(false);
    setPendingId(null);
  };

  return (
    <BottomSheet open={open} onOpenChange={handleOpenChange}>
      <BottomSheet.Trigger asChild>
        <button
          type="button"
          className="flex max-w-[160px] items-center gap-1 truncate text-sm font-medium text-neutral-900"
        >
          <span className="truncate">{current?.name ?? '학교 선택'}</span>
          {/* chevron 아이콘 — 디자인에 맞는 @hcc/icons 항목 사용 */}
          <span aria-hidden>▾</span>
        </button>
      </BottomSheet.Trigger>
      <BottomSheet.Content>
        <BottomSheet.Header>
          {/* 카피는 Figma에 맞춰 추후 정합 */}
          <BottomSheet.Title>다른 학교를 선택해주세요</BottomSheet.Title>
        </BottomSheet.Header>
        <ul className="flex flex-col gap-2 px-5 pb-2">
          {alternatives.map((org) => {
            const selected = pendingId === org.id;
            return (
              <li key={org.id}>
                <button
                  type="button"
                  onClick={() => setPendingId(org.id)}
                  aria-pressed={selected}
                  className={
                    selected
                      ? 'flex w-full items-center gap-3 rounded-2xl border border-[var(--color-primary-600)] bg-[var(--color-primary-50)] p-4'
                      : 'flex w-full items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4'
                  }
                >
                  <div className="size-10 shrink-0 rounded-full bg-neutral-200" aria-hidden />
                  <span className="truncate text-base text-neutral-900">{org.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <BottomSheet.Footer>
          <button
            type="button"
            disabled={pendingId === null}
            onClick={handleConfirm}
            className="h-12 w-full rounded-xl bg-[var(--color-primary-600)] text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
          >
            선택완료
          </button>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export const OrgSwitcher = () => (
  <ErrorBoundary fallback={null}>
    <Suspense
      fallback={<div className="h-5 w-24 animate-pulse rounded bg-neutral-100" aria-hidden />}
    >
      <OrgSwitcherContent />
    </Suspense>
  </ErrorBoundary>
);
