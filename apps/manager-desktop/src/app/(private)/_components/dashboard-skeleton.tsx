import { Bar } from '~/components/skeleton';

const COLUMNS = [
  {
    id: 'games',
    panels: [
      { id: 'today', rows: 4 },
      { id: 'upcoming', rows: 3 },
    ],
  },
  {
    id: 'manage',
    panels: [
      { id: 'reported', rows: 3 },
      { id: 'leagues', rows: 3 },
    ],
  },
];

/** 실제 대시보드와 치수를 맞춘다. 다르면 로딩이 끝나는 순간 화면이 튄다 */
export const DashboardSkeleton = () => (
  <div className="flex flex-col" aria-busy="true" aria-label="불러오는 중">
    <header className="flex h-(--spacing-topbar) shrink-0 items-center border-b border-[var(--color-greyscale-50)] px-4">
      <Bar className="h-3 w-28" />
    </header>

    <div className="flex flex-col gap-5 px-6 py-5">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <Bar className="h-5 w-56" />
        <Bar className="h-4 w-96" />
      </div>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        {COLUMNS.map(({ id, panels }) => (
          <div key={id} className="flex min-w-0 flex-col gap-5">
            {panels.map((panel) => (
              <section
                key={panel.id}
                className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)]"
              >
                <header className="flex h-11 shrink-0 items-center border-b border-[var(--color-greyscale-50)] px-4">
                  <Bar className="h-3 w-20" />
                </header>
                {Array.from({ length: panel.rows }, (_, row) => (
                  <div
                    key={row}
                    className="flex h-12 items-center gap-4 border-b border-[var(--color-hairline)] px-4 last:border-b-0"
                  >
                    <Bar className="h-3 w-9 shrink-0" />
                    <Bar className="h-3 min-w-0 flex-1" />
                    <Bar className="h-3 w-12 shrink-0" />
                  </div>
                ))}
              </section>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);
