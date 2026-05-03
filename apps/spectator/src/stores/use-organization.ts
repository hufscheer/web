import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { OrganizationType } from '~/api';

interface OrganizationState {
  organization: OrganizationType;
  setOrganization: (organization: OrganizationType) => void;
}

export const useOrganizations = create<OrganizationState>()(
  persist(
    (set) => ({
      organization: {} as OrganizationType,
      setOrganization: (organization) => set({ organization }),
    }),
    { name: 'hcc-organization' },
  ),
);
