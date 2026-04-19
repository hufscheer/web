'use client';

import { HomeIcon, TrophyIcon, UsersIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import type { SportType } from '~/api/types';

import { routes } from '~/constants/routes';
import { useTracker } from '~/hooks/useTracker';
import { cn } from '~/utils/cn';
import { DEFAULT_SPORT, normalizeSportParam, sportToPathSegment } from '~/utils/sport-route';

interface Props extends React.ComponentProps<'nav'> {}

const NavItems = () => {
  const sendEvent = useTracker({ category: 'NavigationBar' });
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams<{ sport: string }>();
  const sport: SportType = normalizeSportParam(params.sport) ?? DEFAULT_SPORT;
  const organizationId = searchParams.get('organizationId');

  const homeHref = routes.home({ sport });
  const previousHref = routes.previous({ sport });
  const teamsHref = routes.teams({ sport });
  const sportPath = `/${sportToPathSegment(sport)}`;

  const navItems = [
    { label: '홈', href: homeHref, icon: HomeIcon },
    { label: '대회', href: previousHref, icon: TrophyIcon },
    { label: '팀', href: teamsHref, icon: UsersIcon },
  ];

  return (
    <>
      {navItems.map(({ label, href, icon: Icon }) => {
        const isCurrentPath =
          href === homeHref ? pathname === sportPath : pathname.startsWith(href);
        const query = {
          ...(organizationId && { organizationId }),
        };
        const hrefWithQuery = Object.keys(query).length > 0 ? { pathname: href, query } : href;

        return (
          <Link
            key={href}
            href={hrefWithQuery}
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
