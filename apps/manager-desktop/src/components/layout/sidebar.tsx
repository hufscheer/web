'use client';

import { useMemberInfo } from '@hcc/manager-api';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSyncExternalStore } from 'react';

import {
  BasketballIcon,
  CloseIcon,
  GroupIcon,
  HCCBigLogo,
  MenuIcon,
  PersonIcon,
  RewardedAdsIcon,
  SmsIcon,
  SportsAndOutdoorsIcon,
} from '~/components/icons';
import { openCommandPalette } from '~/components/layout/command-palette';
import { routes } from '~/constants/routes';
import { useMyLiveGames } from '~/hooks/useMyGames';
import { cn } from '~/utils/cn';

const API_ENV = process.env.NEXT_PUBLIC_API_ENV ?? 'dev';

const COLLAPSE_KEY = 'hcc.sidebar.collapsed';
const COLLAPSE_EVENT = 'hcc:sidebar-collapse';

const collapseStore = {
  subscribe(onChange: () => void) {
    window.addEventListener(COLLAPSE_EVENT, onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener(COLLAPSE_EVENT, onChange);
      window.removeEventListener('storage', onChange);
    };
  },
  get() {
    try {
      return localStorage.getItem(COLLAPSE_KEY) === '1';
    } catch {
      return false;
    }
  },
};

const toggleCollapsed = (next: boolean) => {
  try {
    localStorage.setItem(COLLAPSE_KEY, next ? '1' : '0');
  } catch {
    // 저장만 안 될 뿐 접기는 동작한다
  }
  window.dispatchEvent(new Event(COLLAPSE_EVENT));
};

const nav = [
  { href: '/leagues', label: '대회 관리', go: 'L', Icon: RewardedAdsIcon },
  { href: '/cheertalks', label: '응원톡 관리', go: 'C', Icon: SmsIcon },
  { href: '/players', label: '선수 관리', go: 'P', Icon: PersonIcon },
  { href: '/teams/soccer', label: '팀 관리', go: 'T', Icon: GroupIcon },
];

const logout = async () => {
  await fetch('/api/logout', { method: 'POST' });
  window.location.replace(routes.login);
};

export const Sidebar = () => {
  const pathname = usePathname();
  const { data: member } = useMemberInfo();
  const liveGames = useMyLiveGames();
  const collapsed = useSyncExternalStore(collapseStore.subscribe, collapseStore.get, () => false);

  return (
    <aside
      className={cn(
        'flex shrink-0 flex-col border-r border-[var(--color-greyscale-50)] bg-[var(--color-sidebar)] transition-[width] duration-150',
        collapsed ? 'w-15' : 'w-(--spacing-sidebar)',
      )}
    >
      <div className="flex flex-col gap-1 p-2">
        <div className="flex items-center gap-1">
          {!collapsed && (
            <Link
              href={routes.home}
              className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-[var(--radius-control)] px-2 text-[var(--color-neutral-900)] select-none hover:bg-[var(--color-neutral-100)]"
            >
              <HCCBigLogo width={60} height={18} />
              <span className="text-t5 min-w-0 flex-1 truncate leading-none font-semibold">
                {member?.nameOfOrganization ?? '매니저'}
              </span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => toggleCollapsed(!collapsed)}
            aria-label={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
            aria-expanded={!collapsed}
            title={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
            className={cn(
              'grid size-9 shrink-0 place-items-center rounded-[var(--radius-control)] text-[var(--color-neutral-500)] hover:bg-[var(--color-neutral-100)]',
              collapsed && 'mx-auto',
            )}
          >
            <MenuIcon size={20} />
          </button>
        </div>

        <button
          type="button"
          onClick={openCommandPalette}
          aria-label="빠른 이동"
          title="빠른 이동 (⌘K)"
          className={cn(
            'flex h-9 items-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] text-left hover:border-[var(--color-neutral-300)]',
            collapsed ? 'justify-center px-0' : 'px-2',
          )}
        >
          {collapsed ? (
            <kbd className="kbd">⌘K</kbd>
          ) : (
            <>
              <span className="text-t7 flex-1 text-[var(--color-neutral-400)]">빠른 이동</span>
              <kbd className="kbd">⌘K</kbd>
            </>
          )}
        </button>
      </div>

      <nav className="flex flex-col gap-1 px-2 py-1">
        {nav.map(({ href, label, go, Icon }) => {
          const root = href.split('/').slice(0, 2).join('/');
          const active = pathname === root || pathname.startsWith(`${root}/`);
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                'group text-t5 flex h-11 items-center rounded-[var(--radius-control)] transition-colors',
                collapsed ? 'justify-center px-0' : 'gap-3 px-3',
                active
                  ? 'bg-[var(--color-neutral-100)] font-semibold text-[var(--color-neutral-900)]'
                  : 'font-medium text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)]/70',
              )}
            >
              <Icon
                size={20}
                className={cn(
                  'shrink-0',
                  active ? 'text-[var(--color-neutral-700)]' : 'text-[var(--color-neutral-400)]',
                )}
              />
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{label}</span>
                  <kbd className="kbd opacity-0 transition-opacity group-hover:opacity-100">
                    G {go}
                  </kbd>
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {!collapsed && liveGames.length > 0 && (
        <div className="mt-3 flex min-h-0 flex-col border-t border-[var(--color-greyscale-50)] pt-3">
          <p className="eyebrow px-4 pb-1">진행 중인 경기</p>
          <div className="flex min-h-0 flex-col overflow-y-auto px-2">
            {liveGames.map((g) => (
              <Link
                key={g.gameId}
                href={routes.gameTimelineOf(g)}
                className="flex flex-col gap-0.5 rounded-[var(--radius-control)] px-2 py-1.5 hover:bg-[var(--color-neutral-100)]/70"
              >
                <span className="text-t8 flex items-center gap-1.5 text-[var(--color-neutral-400)]">
                  {g.sportType === 'SOCCER' ? (
                    <SportsAndOutdoorsIcon
                      size={11}
                      style={{ color: 'var(--color-sport-soccer)' }}
                    />
                  ) : (
                    <BasketballIcon size={11} style={{ color: 'var(--color-sport-basketball)' }} />
                  )}
                  <span className="truncate">{g.leagueName}</span>
                </span>
                <span className="flex items-baseline gap-1.5">
                  <span className="text-t7 min-w-0 flex-1 truncate text-[var(--color-neutral-600)]">
                    {g.gameTeams[0].gameTeamName}
                  </span>
                  <span className="tnum text-t7 shrink-0 font-semibold text-[var(--color-neutral-900)]">
                    {g.gameTeams[0].score}
                    <span className="mx-0.5 font-normal text-[var(--color-neutral-300)]">:</span>
                    {g.gameTeams[1].score}
                  </span>
                  <span className="text-t7 min-w-0 flex-1 truncate text-right text-[var(--color-neutral-600)]">
                    {g.gameTeams[1].gameTeamName}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto p-2 pb-12">
        <span
          className={cn(
            'text-t8 mb-1 inline-flex items-center rounded-[var(--radius-chip)] px-1.5 py-0.5 font-semibold',
            'bg-[var(--color-neutral-200)]/70 text-[var(--color-neutral-500)]',
            collapsed ? 'mx-auto w-full justify-center px-0' : 'mx-2',
          )}
          title={collapsed ? `${API_ENV} 서버` : undefined}
        >
          {API_ENV.toUpperCase()}
        </span>

        {member && !collapsed && (
          <p className="text-t8 truncate px-2 pb-1 text-[var(--color-neutral-400)]">
            {member.email}
          </p>
        )}
        <button
          type="button"
          onClick={logout}
          title={collapsed ? '로그아웃' : undefined}
          aria-label="로그아웃"
          className={cn(
            'text-t5 flex h-11 w-full items-center rounded-[var(--radius-control)] text-left font-medium text-[var(--color-neutral-500)] hover:bg-[var(--color-neutral-100)]',
            collapsed ? 'justify-center px-0' : 'gap-3 px-3',
          )}
        >
          <CloseIcon size={18} className="shrink-0 text-[var(--color-neutral-400)]" />
          {!collapsed && '로그아웃'}
        </button>
      </div>
    </aside>
  );
};
