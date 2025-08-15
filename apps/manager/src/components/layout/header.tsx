'use client';

import { ArrowBackIcon, HCCLogo } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { ROUTES } from '~/constants/routes';

type Props =
  | { arrow: true; title: string; menu?: ReactNode }
  | { arrow?: false | undefined; title?: string; menu?: ReactNode };

export const Header = ({ arrow, title, menu }: Props) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-header w-full border-neutral-100 border-b bg-white">
      <div className="relative row-between h-12 w-full px-5">
        {arrow ? (
          <>
            <button
              type="button"
              aria-label="뒤로"
              className="center aspect-square h-full"
              onClick={() => router.back()}
            >
              <ArrowBackIcon size={24} className="text-neutral-900" />
            </button>
            <Typography
              className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 truncate text-center font-semibold text-neutral-900"
              asChild
            >
              <h2>{title}</h2>
            </Typography>
            <div className="center-y">{menu ?? null}</div>
          </>
        ) : (
          <>
            <Link className="flex select-none items-end gap-2" href={ROUTES.HOME}>
              <HCCLogo width="71.5" height="21" className="text-neutral-900" />
              <span className="font-medium leading-none">매니저</span>
            </Link>
            <div className="center-y">{menu ?? null}</div>
          </>
        )}
      </div>
    </header>
  );
};
