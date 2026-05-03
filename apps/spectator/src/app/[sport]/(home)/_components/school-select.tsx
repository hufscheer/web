'use client';

import { Suspense } from 'react';

import { useSuspenseOrganizations } from '~/api/queries/useOrganizations';
import { Select } from '~/components/ui/select';
import { useOrganizations } from '~/stores/use-organization';

const SchoolSelectContent = () => {
  const { data: organizations } = useSuspenseOrganizations();
  const { organization, setOrganization } = useOrganizations();

  const options = organizations.map((org) => ({ value: org.id, label: org.name }));
  const isValidId = options.some((opt) => opt.value === organization.id);
  const selectedId = isValidId ? organization.id : undefined;

  return (
    <Select
      value={selectedId ?? 2}
      onChange={(id) => setOrganization({ ...organization, id })}
      options={options}
    />
  );
};

export const SchoolSelect = () => (
  <Suspense fallback={<div className="animate-pulse rounded-xl bg-neutral-100" />}>
    <SchoolSelectContent />
  </Suspense>
);
