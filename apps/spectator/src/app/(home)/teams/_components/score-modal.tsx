import { Modal } from '@hcc/ui';

import type { TeamPlayerType } from '~/api';

import { useSuspenseTeamsPlayers } from '~/api/queries/useTeamPlayers';

type Row = TeamPlayerType & {
  rank: number;
};

export type TopScorersModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamId: number;
  teamName: string;
};

export function ScorersModal({ open, onOpenChange, teamName, teamId }: TopScorersModalProps) {
  const { data: players } = useSuspenseTeamsPlayers({ id: teamId });
  const rows: Row[] = (() => {
    const sorted = [...(players ?? [])].sort((a, b) => b.totalGoalCount - a.totalGoalCount);

    let prevGoals: number | null = null;
    let rank = 0;

    return sorted.slice(0, 20).map((s, idx) => {
      if (prevGoals === null || s.totalGoalCount !== prevGoals) {
        rank = idx + 1;
        prevGoals = s.totalGoalCount;
      }
      return { ...s, rank };
    });
  })();

  const formatStudentNumber = (num: string | null | undefined) => {
    if (!num || num.length < 4) return '-';
    return num.substring(2, 4);
  };
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
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
          <h2 className="text-center text-base font-medium text-neutral-900">
            {teamName} <span className="font-semibold">득점왕</span> ⚽
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <div className="max-h-[360px] overflow-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 z-10 bg-white">
                <tr className="border-b border-neutral-200">
                  <th className="px-3 py-2 text-center text-[13px] font-bold text-blue-600">
                    순위
                  </th>
                  <th className="px-3 py-2 text-center text-[13px] text-blue-600">학번</th>
                  <th className="px-3 py-2 text-center text-[13px] font-bold text-blue-600">
                    이름
                  </th>
                  <th className="px-3 py-2 text-center text-[13px] font-bold text-blue-600">
                    득점
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r) => {
                  const isTopThree = r.rank <= 3;
                  const fontWeightClass = isTopThree ? 'font-semibold bg-gray-100' : 'font-medium';

                  return (
                    <tr key={r.playerId} className="border-b border-neutral-100">
                      <td className={`px-3 py-2 text-center text-neutral-900 ${fontWeightClass}`}>
                        {r.rank}
                      </td>
                      <td className={`px-3 py-2 text-center text-neutral-900 ${fontWeightClass}`}>
                        {formatStudentNumber(r.studentNumber)}
                      </td>
                      <td className={`px-3 py-2 text-center text-neutral-900 ${fontWeightClass}`}>
                        {r.name}
                      </td>
                      <td className={`px-3 py-2 text-center text-neutral-900 ${fontWeightClass}`}>
                        {r.totalGoalCount}
                      </td>
                    </tr>
                  );
                })}

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
        <div className="py-3 text-center text-xs text-neutral-500">
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
