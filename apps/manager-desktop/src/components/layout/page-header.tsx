import type { ReactNode } from 'react';

import Link from 'next/link';

import { routes } from '~/constants/routes';

export type Crumb = string | { label: string; href: string };

type Props = {
  title: string;
  description?: string;
  breadcrumb?: Crumb[];
  actions?: ReactNode;
};

const ROOT_HREF: Record<string, string> = {
  '대회 관리': routes.leagues,
  '응원톡 관리': routes.cheertalks,
  '선수 관리': routes.players,
  '팀 관리': routes.teams(),
};

const toCrumb = (crumb: Crumb) =>
  typeof crumb === 'string' ? { label: crumb, href: ROOT_HREF[crumb] } : crumb;

/** 마지막 breadcrumb 조각이 제목과 같으면 지운다 */
export const PageHeader = ({ title, description, breadcrumb, actions }: Props) => {
  const crumbs = (breadcrumb ?? [])
    .map(toCrumb)
    .filter((c, i, all) => !(i === all.length - 1 && c.label === title));

  return (
    <header className="sticky top-0 z-10 flex h-(--spacing-topbar) shrink-0 items-center gap-2 border-b border-[var(--color-greyscale-50)] bg-[var(--color-canvas)]/85 px-4 backdrop-blur">
      <nav className="flex min-w-0 items-center gap-1.5" aria-label="현재 위치">
        {crumbs.map(({ label, href }) => (
          <span key={label} className="flex shrink-0 items-center gap-1.5">
            {href ? (
              <Link
                href={href}
                className="text-t6 max-w-40 truncate rounded-[var(--radius-chip)] px-1 py-0.5 text-[var(--color-neutral-400)] transition-colors hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-neutral-800)]"
              >
                {label}
              </Link>
            ) : (
              <span className="text-t6 max-w-40 truncate text-[var(--color-neutral-400)]">
                {label}
              </span>
            )}
            <span className="text-[var(--color-neutral-300)]">/</span>
          </span>
        ))}
        <h1 className="text-t4 truncate font-bold text-[var(--color-neutral-900)]">{title}</h1>
      </nav>

      {description && (
        <p className="text-t7 hidden min-w-0 truncate border-l border-[var(--color-greyscale-50)] pl-2.5 text-[var(--color-neutral-400)] lg:block">
          {description}
        </p>
      )}

      {actions && <div className="ml-auto flex shrink-0 items-center gap-1.5">{actions}</div>}
    </header>
  );
};
