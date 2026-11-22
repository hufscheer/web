import { CaretRightIcon } from '@hcc/icons';

interface LeagueStatusBadgeProps {
  isLeagueOngoing: boolean;
}

/** RadioCard.Root 안에서 쓴다. 미선택은 회색, 선택 시 부모의 data-checked를 따라 카드와 같은 primary 톤이 된다. */
export const LeagueStatusBadge = ({ isLeagueOngoing }: LeagueStatusBadgeProps) => {
  return (
    <div className="flex items-center rounded-full border border-transparent bg-neutral-200 px-3 py-1 text-xs leading-[1.5] font-semibold tracking-[0%] whitespace-nowrap text-neutral-400 in-data-checked:border-(--color-primary-600) in-data-checked:bg-white in-data-checked:text-(--color-primary-600)">
      {isLeagueOngoing && (
        <span className="mr-2 flex items-center gap-1.5 font-bold text-(--color-danger-700)">
          <span aria-hidden className="size-1.5 rounded-full bg-current" />
          LIVE
        </span>
      )}
      {isLeagueOngoing ? '대회 진행 중' : '대회 진행 예정'}
      <CaretRightIcon />
    </div>
  );
};
