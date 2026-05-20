'use client';

import type { ReactNode } from 'react';

import { ArrowBackIcon, HCCLogo } from '@hcc/icons';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { routes } from '~/constants/routes';
import { useOrganizationId } from '~/hooks/useOrganizationId';
import { normalizeSportParam } from '~/utils/sport-route';

type Props = {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
};

export const Root = ({ left, center, right }: Props) => (
  <header className="sticky top-0 z-header h-12 w-full shrink-0 border-b border-neutral-100 bg-white">
    <div className="row-between relative h-full w-full px-5">
      <div className="center-y">{left}</div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 truncate">
        {center}
      </div>

      <div className="center-y">{right}</div>
    </div>
  </header>
);

export const Arrow = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label="뒤로"
      className="center h-full cursor-pointer"
      onClick={() => router.back()}
    >
      <ArrowBackIcon size={24} className="text-neutral-900" />
    </button>
  );
};

export const LinkLogo = () => {
  const params = useParams<{ sport?: string }>();
  const sportType = normalizeSportParam(params?.sport);

  const { isReady, organizationId } = useOrganizationId();

  const homePathname = sportType ? routes.home({ sport: sportType }) : routes.root;
  const homeHref = {
    pathname: homePathname,
    query: isReady ? { org: organizationId } : {},
  };

  return (
    <Link className="flex items-end select-none" href={homeHref}>
      <HCCLogo width="71.5" height="21" className="text-[var(--color-primary-600)]" />
    </Link>
  );
};
