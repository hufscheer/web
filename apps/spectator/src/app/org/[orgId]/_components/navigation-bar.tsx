'use client';

import { HomeIcon, TrophyIcon, UsersIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

import type { SportType } from '~/api/types';

import { routes } from '~/constants/routes';
import { useOrganizationId } from '~/hooks/useOrganizationId';
import { useTracker } from '~/hooks/useTracker';
import { cn } from '~/utils/cn';

interface Props extends React.ComponentProps<'nav'> {
  sport: SportType;
}

const NavItems = ({ sport }: { sport: SportType }) => {
  const sendEvent = useTracker({ category: 'NavigationBar' });
  const pathname = usePathname();
  const { organizationId } = useOrganizationId();

  const homeHref = routes.home({ orgId: organizationId, sport });
  const previousHref = routes.previous({ orgId: organizationId, sport });
  const teamsHref = routes.teams({ orgId: organizationId, sport });

  const navItems = [
    { label: '홈', href: homeHref, icon: HomeIcon },
    { label: '대회', href: previousHref, icon: TrophyIcon },
    { label: '팀', href: teamsHref, icon: UsersIcon },
  ];

  return (
    <>
      {navItems.map(({ label, href, icon: Icon }) => {
        const isCurrentPath = href === homeHref ? pathname === homeHref : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
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

export const NavigationBar = ({
  sport,
  'aria-label': ariaLabel = 'Main',
  className,
  ...props
}: Props) => {
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
        <NavItems sport={sport} />
      </Suspense>
    </nav>
  );
};
