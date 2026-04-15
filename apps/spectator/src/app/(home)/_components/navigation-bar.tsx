'use client';

import { HomeIcon, TrophyIcon, UsersIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { useTracker } from '~/hooks/useTracker';
import { cn } from '~/utils/cn';

const NAVBAR_ITEMS = [
  { label: '홈', href: '/', icon: HomeIcon },
  { label: '대회', href: '/previous', icon: TrophyIcon },
  { label: '팀', href: '/teams', icon: UsersIcon },
];

interface Props extends React.ComponentProps<'nav'> {}

const NavItems = () => {
  const sendEvent = useTracker({ category: 'NavigationBar' });
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sport = searchParams.get('sport');
  const organizationId = searchParams.get('organizationId');

  return (
    <>
      {NAVBAR_ITEMS.map(({ label, href, icon: Icon }) => {
        const isCurrentPath = href === '/' ? pathname === '/' : pathname.startsWith(href);
        const query = {
          ...(sport && { sport }),
          ...(organizationId && { organizationId }),
        };
        const hrefWithSport = Object.keys(query).length > 0 ? { pathname: href, query } : href;

        return (
          <Link
            key={href}
            href={hrefWithSport}
            aria-current={isCurrentPath ? 'page' : undefined}
            className={cn(
              'center-y flex flex-col gap-1',
              isCurrentPath && 'text-(--color-primary-600)',
            )}
            onClick={() => sendEvent({ action: 'click', value: label })}
          >
            <Icon size={20} />
            <Typography fontSize={14}>{label}</Typography>
          </Link>
        );
      })}
    </>
  );
};

export const NavigationBar = ({ 'aria-label': ariaLabel = 'Main', className, ...props }: Props) => {
  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        'fixed bottom-0 flex h-navbar-height w-full max-w-(--app-max-width) items-center justify-around gap-4 border-t border-t-greyscale-100 bg-white px-5',
        className,
      )}
      {...props}
    >
      <Suspense>
        <NavItems />
      </Suspense>
    </nav>
  );
};
