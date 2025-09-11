'use client';

import { ArrowBackIcon, HCCLogo } from '@hcc/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { routes } from '~/constants/routes';

type Props = {
  arrow?: boolean;
  menu?: ReactNode;
};

export const Header = ({ arrow, menu }: Props) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-header w-full border-neutral-100 border-b bg-white">
      <div className="relative row-between h-12 w-full px-5">
        {arrow ? (
          <>
            <button
              type="button"
              aria-label="뒤로"
              className="center h-full cursor-pointer"
              onClick={() => router.back()}
            >
              <ArrowBackIcon size={24} className="text-neutral-900" />
            </button>
            <span className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 truncate">
              <HCCLogo width="71.5" height="21" className="text-[var(--color-primary-600)]" />
            </span>
            <div className="center-y">{menu ?? null}</div>
          </>
        ) : (
          <>
            <Link className="flex select-none items-end gap-2" href={routes.home}>
              <HCCLogo width="71.5" height="21" className="text-[var(--color-primary-600)]" />
            </Link>
            <div className="center-y">{menu ?? null}</div>
          </>
        )}
      </div>
    </header>
  );
};
