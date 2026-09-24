'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  AddIcon,
  GroupIcon,
  PersonIcon,
  RewardedAdsIcon,
  SmsIcon,
  TimerOutlineIcon,
} from '~/components/icons';
import { routes } from '~/constants/routes';
import { matchup } from '~/constants/sports';
import { useMyLiveGames } from '~/hooks/useMyGames';
import { useMyLeagues } from '~/hooks/useMyLeagues';
import { cn } from '~/utils/cn';

type Item = {
  id: string;
  group: string;
  label: string;
  /** 목록에는 안 보이지만 검색에 걸리는 말 */
  keywords?: string;
  hint?: string;
  href: string;
  Icon: typeof PersonIcon;
};

/** `g` 다음 글자로 사이드바 항목에 바로 간다 */
export const GO_KEYS: { key: string; label: string; href: string }[] = [
  { key: 'h', label: '홈', href: routes.home },
  { key: 'l', label: '대회 관리', href: routes.leagues },
  { key: 'c', label: '응원톡 관리', href: routes.cheertalks },
  { key: 'p', label: '선수 관리', href: routes.players },
  { key: 't', label: '팀 관리', href: routes.teams() },
];

/**
 * 한글 입력 상태에서는 `e.key` 가 "ㅎ" 처럼 IME 글자로 온다. 물리 위치인 `e.code` 도 같이 본다.
 * Dvorak 처럼 배열이 다르면 반대로 `e.code` 가 어긋나서 둘 중 하나만 맞아도 통과시킨다.
 */
const isKey = (e: KeyboardEvent, letter: string) =>
  e.code === `Key${letter.toUpperCase()}` || e.key.toLowerCase() === letter;

const OPEN_EVENT = 'hcc:command-palette';

export const openCommandPalette = () => window.dispatchEvent(new Event(OPEN_EVENT));

/** 입력 중에는 단축키를 받지 않는다 */
const isTyping = (target: EventTarget | null) => {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return (
    el.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) ||
    !!el.closest?.('[role="dialog"]')
  );
};

export const CommandPalette = () => {
  const router = useRouter();
  const leagues = useMyLeagues();
  const liveGames = useMyLiveGames();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(
    () => [
      ...liveGames.map((game) => ({
        id: `live-${game.gameId}`,
        group: '진행 중인 경기',
        label: matchup(game),
        hint: game.leagueName,
        keywords: `${game.leagueName} 기록 진행 timeline`,
        href: routes.gameTimelineOf(game),
        Icon: TimerOutlineIcon,
      })),
      ...GO_KEYS.map(({ key, label, href }) => ({
        id: `go-${key}`,
        group: '이동',
        label,
        hint: `G ${key.toUpperCase()}`,
        href,
        Icon:
          key === 'l'
            ? RewardedAdsIcon
            : key === 'c'
              ? SmsIcon
              : key === 'p'
                ? PersonIcon
                : GroupIcon,
      })),
      {
        id: 'new-league',
        group: '만들기',
        label: '대회 생성',
        keywords: '리그 추가 new league',
        href: routes.leagueCreate,
        Icon: AddIcon,
      },
      {
        id: 'new-player',
        group: '만들기',
        label: '선수 등록',
        keywords: '추가 new player',
        href: routes.playerCreate,
        Icon: AddIcon,
      },
      {
        id: 'new-team',
        group: '만들기',
        label: '팀 생성',
        keywords: '추가 new team',
        href: routes.teamCreate('SOCCER'),
        Icon: AddIcon,
      },
      ...leagues.map((league) => ({
        id: `league-${league.leagueId}`,
        group: '내 대회',
        label: league.name,
        hint: league.leagueProgress,
        keywords: `${league.sportType === 'SOCCER' ? '축구 soccer' : '농구 basketball'} ${league.leagueProgress}`,
        href: routes.league(league.leagueId),
        Icon: RewardedAdsIcon,
      })),
    ],
    [leagues, liveGames],
  );

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      `${item.label} ${item.hint ?? ''} ${item.keywords ?? ''}`.toLowerCase().includes(q),
    );
  }, [items, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setCursor(0);
  }, []);

  const go = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router],
  );

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    let goArmed = false;
    let disarm: ReturnType<typeof setTimeout>;

    const onKey = (e: KeyboardEvent) => {
      if (isKey(e, 'k') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      if (open || e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;

      if (goArmed) {
        const target = GO_KEYS.find((g) => isKey(e, g.key));
        goArmed = false;
        clearTimeout(disarm);
        if (target) {
          e.preventDefault();
          router.push(target.href);
        }
        return;
      }
      if (isKey(e, 'g')) {
        goArmed = true;
        disarm = setTimeout(() => (goArmed = false), 1000);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(disarm);
    };
  }, [open, router]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') return close();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => (matches.length ? (c + 1) % matches.length : 0));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => (matches.length ? (c - 1 + matches.length) % matches.length : 0));
    }
    if (e.key === 'Enter' && matches[cursor]) {
      e.preventDefault();
      go(matches[cursor].href);
    }
  };

  let renderedGroup = '';

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-[var(--z-index-modal)] flex items-start justify-center bg-[var(--color-neutral-900)]/25 px-4 pt-[12vh] backdrop-blur-[2px]"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="빠른 이동"
        className="flex w-full max-w-lg flex-col overflow-hidden rounded-[10px] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] shadow-[0_16px_48px_-12px_rgba(23,24,28,0.28)]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCursor(0);
          }}
          placeholder="어디로 갈까요?"
          className="text-t5 h-11 w-full border-b border-[var(--color-greyscale-50)] px-4 outline-none placeholder:text-[var(--color-neutral-300)]"
        />

        <div ref={listRef} className="max-h-80 overflow-y-auto p-1.5">
          {matches.length === 0 && (
            <p className="text-t6 px-3 py-8 text-center text-[var(--color-neutral-400)]">
              결과가 없어요.
            </p>
          )}

          {matches.map((item, i) => {
            const newGroup = item.group !== renderedGroup;
            renderedGroup = item.group;
            return (
              <div key={item.id}>
                {newGroup && <p className="eyebrow px-2.5 pt-2.5 pb-1">{item.group}</p>}
                <button
                  type="button"
                  data-active={i === cursor}
                  onMouseMove={() => setCursor(i)}
                  onClick={() => go(item.href)}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-[var(--radius-control)] px-2.5 py-1.5 text-left',
                    i === cursor ? 'bg-[var(--color-greyscale-25)]' : 'bg-transparent',
                  )}
                >
                  <item.Icon size={15} className="shrink-0 text-[var(--color-neutral-400)]" />
                  <span className="text-t6 min-w-0 flex-1 truncate text-[var(--color-neutral-800)]">
                    {item.label}
                  </span>
                  {item.hint && (
                    <span className="text-t7 shrink-0 text-[var(--color-neutral-400)]">
                      {item.hint}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <footer className="text-t8 flex items-center gap-3 border-t border-[var(--color-greyscale-50)] bg-[var(--color-greyscale-25)] px-3 py-2 text-[var(--color-neutral-400)]">
          <span className="flex items-center gap-1">
            <kbd className="kbd">↑</kbd>
            <kbd className="kbd">↓</kbd>
            이동
          </span>
          <span className="flex items-center gap-1">
            <kbd className="kbd">↵</kbd>
            열기
          </span>
          <span className="ml-auto flex items-center gap-1">
            <kbd className="kbd">G</kbd>
            <span>+</span>
            <kbd className="kbd">H</kbd>로 바로 이동
          </span>
        </footer>
      </div>
    </div>
  );
};
