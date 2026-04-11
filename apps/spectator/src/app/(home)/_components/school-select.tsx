'use client';

import { CheckSmallIcon, KeyboardArrowDownIcon } from '@hcc/icons';
import { startTransition, Suspense, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useSuspenseOrganizations } from '~/api/queries/useOrganizations';
import { useOrganizationId } from '~/hooks/useOrganizationId';
import { cn } from '~/utils/cn';

const SchoolSelectContent = () => {
  const { data: organizations } = useSuspenseOrganizations();
  const { organizationId, setOrganizationId } = useOrganizationId();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (organizationId === null && organizations.length > 0) {
      setOrganizationId(organizations[0].id, { scroll: false, history: 'replace' });
    }
  }, [organizationId, organizations, setOrganizationId]);

  const selectedOrg = organizations.find((org) => org.id === organizationId) ?? organizations[0];

  const handleOpen = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    }
    setOpen((prev) => !prev);
  };

  const handleSelect = (id: number) => {
    startTransition(() => {
      setOrganizationId(id, { scroll: false, history: 'replace' });
    });
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleOpen}
        className="center-y cursor-pointer gap-4 rounded-xl bg-(--color-talk) px-2 py-1 text-sm font-medium text-neutral-800"
      >
        {selectedOrg?.name ?? '학교 선택'}
        <KeyboardArrowDownIcon
          size={16}
          className={cn('text-neutral-500 transition-transform duration-150', open && 'rotate-180')}
        />
      </button>

      {open &&
        createPortal(
          <>
            <div className="fixed inset-0 z-50" onClick={() => setOpen(false)} />
            <ul
              className="fixed z-50 overflow-hidden rounded-xl border border-neutral-100 bg-white py-1 shadow-lg"
              style={{
                top: dropdownStyle.top,
                left: dropdownStyle.left,
                width: dropdownStyle.width,
              }}
            >
              {organizations.map((org) => (
                <li key={org.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(org.id)}
                    className={cn(
                      'row-between w-full cursor-pointer px-2 py-2.5 text-sm hover:bg-neutral-50',
                      org.id === organizationId
                        ? 'font-semibold text-(--color-primary-600)'
                        : 'text-neutral-700',
                    )}
                  >
                    {org.name}
                    {org.id === organizationId && (
                      <CheckSmallIcon size={16} className="text-(--color-primary-600)" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </>,
          document.body,
        )}
    </div>
  );
};

export const SchoolSelect = () => (
  <Suspense fallback={<div className="h-7 w-24 animate-pulse rounded-md bg-neutral-100" />}>
    <SchoolSelectContent />
  </Suspense>
);
