'use client';

import type { ReactNode } from 'react';

import { ArrowBackIcon, HCCLogo } from '@hcc/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { routes } from '~/constants/routes';

type Props = {
  arrow?: boolean;
  center?: ReactNode;
  menu?: ReactNode;
};

export const Header = ({ arrow, center, menu }: Props) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-header h-12 w-full shrink-0 border-b border-neutral-100 bg-white">
      <div className="row-between relative h-full w-full px-5">
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
            <Link
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 truncate"
              href={routes.home}
            >
              <HCCLogo width="71.5" height="21" className="text-[var(--color-primary-600)]" />
            </Link>
            <div className="center-y">{menu ?? null}</div>
          </>
        ) : (
          <>
            <div className="center-y gap-4">
              <Link className="flex items-end select-none" href={routes.home}>
                <HCCLogo width="71.5" height="21" className="text-[var(--color-primary-600)]" />
              </Link>
              {center}
            </div>
            <div className="center-y">{menu ?? null}</div>
          </>
        )}
      </div>
    </header>
  );
};
