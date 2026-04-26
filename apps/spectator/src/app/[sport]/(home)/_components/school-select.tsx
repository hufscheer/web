'use client';

import { startTransition, Suspense, useEffect } from 'react';

import { useSuspenseOrganizations } from '~/api/queries/useOrganizations';
import { Select } from '~/components/ui/select';
import { useOrganizationId } from '~/hooks/useOrganizationId';

const SchoolSelectContent = () => {
  const { data: organizations } = useSuspenseOrganizations();
  const { organizationId, setOrganizationId } = useOrganizationId();

  const options = organizations.map((org) => ({ value: org.id, label: org.name }));
  const isValidId = options.some((opt) => opt.value === organizationId);
  const selectedId = isValidId ? organizationId : organizations[0]?.id;

  useEffect(() => {
    if (!isValidId && selectedId !== undefined) {
      startTransition(() => {
        setOrganizationId(selectedId, { scroll: false, history: 'replace' });
      });
    }
  }, [isValidId, selectedId, setOrganizationId]);

  const handleChange = (id: number) => {
    startTransition(() => {
      setOrganizationId(id, { scroll: false, history: 'replace' });
    });
  };

  if (selectedId === undefined) return null;

  return <Select value={selectedId} onChange={handleChange} options={options} />;
};

export const SchoolSelect = () => (
  <Suspense fallback={<div className="animate-pulse rounded-xl bg-neutral-100" />}>
    <SchoolSelectContent />
  </Suspense>
);
