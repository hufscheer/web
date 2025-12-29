import { Modal } from '@hcc/ui';

type TopScorer = {
  studentNo?: string | number;
  name: string;
  goals: number;
};

type Row = TopScorer & {
  rank: number;
};

export type TopScorersModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamName: string;
  scorers: TopScorer[];
};

export function ScorersModal({ open, onOpenChange, teamName, scorers }: TopScorersModalProps) {
  // ✅ 공동 순위 포함해서 rank 계산 + 최대 20명
  const rows: Row[] = (() => {
    const sorted = [...(scorers ?? [])].sort((a, b) => b.goals - a.goals);

    let prevGoals: number | null = null;
    let rank = 0;

    return sorted.slice(0, 20).map((s, idx) => {
      if (prevGoals === null || s.goals !== prevGoals) {
        rank = idx + 1;
        prevGoals = s.goals;
      }
      return { ...s, rank };
    });
  })();

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      {/* Close 버튼 */}

      <Modal.Content className="relative max-h-[min(640px,calc(100vh-64px))] w-[min(560px,calc(100vw-32px))] overflow-hidden rounded-2xl bg-white px-4 pt-12 pb-4 shadow-xl">
        <Modal.Close asChild>
          <button
            type="button"
            className="absolute top-2 right-3 h-9 w-9 rounded-full text-2xl text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
          >
            ×
          </button>
        </Modal.Close>
        <VisuallyHidden>
          <Modal.Title>{teamName} 득점왕</Modal.Title>
        </VisuallyHidden>
        <VisuallyHidden>
          <Modal.Description>
            {teamName} 팀의 득점왕 순위 목록입니다. 최대 20명까지 표시됩니다.
          </Modal.Description>
        </VisuallyHidden>

        <div className="mb-3 rounded-xl bg-neutral-100 px-4 py-3">
          <h2 className="text-center font-medium text-base text-neutral-900">
            {teamName} <span className="font-semibold">득점왕</span> ⚽
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <div className="max-h-[360px] overflow-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 z-10 bg-white">
                <tr className="border-neutral-200 border-b">
                  <th className="px-3 py-2 text-center font-bold text-[13px] text-blue-600">
                    순위
                  </th>
                  <th className="px-3 py-2 text-center text-[13px] text-blue-600">학번</th>
                  <th className="px-3 py-2 text-center font-bold text-[13px] text-blue-600">
                    이름
                  </th>
                  <th className="px-3 py-2 text-center font-bold text-[13px] text-blue-600">
                    득점
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r, idx) => (
                  <tr
                    key={`${r.studentNo ?? 'na'}-${r.name}-${idx}`}
                    className="border-neutral-100 border-b"
                  >
                    <td className="px-3 py-2 text-center text-neutral-900">{r.rank}</td>
                    <td className="px-3 py-2 text-center text-neutral-900">{r.studentNo ?? '-'}</td>
                    <td className="px-3 py-2 font-semibold text-neutral-900">{r.name}</td>
                    <td className="px-3 py-2 text-right font-bold text-neutral-900">{r.goals}</td>
                  </tr>
                ))}

                {rows.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-3 py-10 text-center text-neutral-500">
                      표시할 데이터가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer note */}
        <div className="py-3 text-center text-neutral-500 text-xs">
          <p>* 득점왕 순위는 최대 20명까지 표시합니다.</p>
          <p>** 모든 통계 기록은 리그가 종료된 이후 업데이트 됩니다.</p>
        </div>
      </Modal.Content>
    </Modal>
  );
}

export const VisuallyHidden = ({ children }: { children: React.ReactNode }) => {
  return (
    <span
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: '0',
      }}
    >
      {children}
    </span>
  );
};
