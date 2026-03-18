'use client';

import { HomeIcon, TrophyIcon, UsersIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '~/utils/cn';

const NAVBAR_ITEMS = [
  { label: '홈', href: '/', icon: HomeIcon },
  { label: '대회', href: '/previous', icon: TrophyIcon },
  { label: '학과', href: '/teams', icon: UsersIcon },
];

interface Props extends React.ComponentProps<'nav'> {}

export const NavigationBar = ({ 'aria-label': ariaLabel = 'Main', className, ...props }: Props) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        'fixed bottom-0 flex h-(--hcc-navbar-height) w-full max-w-(--app-max-width) items-center justify-around gap-4 border-t border-t-greyscale-100 bg-white px-5',
        className,
      )}
      {...props}
    >
      {NAVBAR_ITEMS.map(({ label, href, icon: Icon }) => {
        const isCurrentPath = href === '/' ? pathname === '/' : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            aria-current={isCurrentPath ? 'page' : undefined}
            className={cn(
              'center-y flex flex-col gap-1',
              isCurrentPath && 'text-(--color-primary-600)',
            )}
          >
            <Icon size={20} />
            <Typography fontSize={14}>{label}</Typography>
          </Link>
        );
      })}
    </nav>
  );
};
