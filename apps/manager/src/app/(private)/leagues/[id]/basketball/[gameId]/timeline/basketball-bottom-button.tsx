'use client';

import { AddCircleIcon, ErrorIcon, SettingsIcon, SmsIcon, TradeIcon } from '@hcc/icons';
import { Button } from '@hcc/ui';
import { useRouter } from 'next/navigation';

import { routes } from '~/constants/routes';

export type BasketballBottomSheetType = 'addScore' | 'changeStatus' | 'substitute' | 'foul';

export function BasketballBottomButton({
  leagueId,
  gameId,
  onOpen,
}: {
  leagueId: number;
  gameId: number;
  onOpen: (type: BasketballBottomSheetType) => void;
}) {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col gap-2 border-t border-neutral-100 bg-white p-5">
      <div className="row-between gap-2">
        <Button
          className="flex-1 gap-1"
          color="primary"
          size="sm"
          onClick={() => onOpen('addScore')}
        >
          <AddCircleIcon size={20} /> 득점 추가
        </Button>
        <Button
          className="flex-1 gap-1"
          color="primary"
          size="sm"
          onClick={() => onOpen('changeStatus')}
        >
          <SettingsIcon size={20} /> 상태 변경
        </Button>
      </div>
      <div className="row-between gap-2">
        <Button
          className="flex-1 gap-1 border border-black"
          color="black"
          variant="ghost"
          size="sm"
          onClick={() => onOpen('substitute')}
        >
          <TradeIcon /> 교체
        </Button>
        <Button
          className="flex-1 gap-1 border border-orange-400 text-orange-500"
          color="black"
          variant="ghost"
          size="sm"
          onClick={() => onOpen('foul')}
        >
          <ErrorIcon color="#FFDF2A" /> 파울
        </Button>
        <Button
          className="flex-1 gap-1"
          color="black"
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/${routes.game_cheertalks(leagueId, gameId, 'BASKETBALL')}`)}
        >
          <SmsIcon /> 응원톡
        </Button>
      </div>
    </div>
  );
}
