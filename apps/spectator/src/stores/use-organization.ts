import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { OrganizationType } from '~/api';

type OrganizationId = OrganizationType['id'];

interface OrganizationState {
  organizationId: OrganizationId;
  setOrganization: (organizationId: OrganizationId) => void;
}

export const useOrganizations = create<OrganizationState>()(
  persist(
    (set) => ({
      organizationId: 2,
      setOrganization: (organizationId) => set({ organizationId }),
    }),
    {
      name: 'hcc-organization',
      version: 1,
    },
  ),
);
