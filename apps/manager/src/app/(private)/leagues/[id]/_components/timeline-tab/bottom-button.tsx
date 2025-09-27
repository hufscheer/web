'use client';
import { AddCircleIcon, ErrorIcon, SettingsIcon, SmsIcon, TradeIcon } from '@hcc/icons';
import { Button } from '@hcc/ui';

export type BottomSheetType = 'addScore' | 'changeStatus' | 'substitute' | 'warning' | 'cheerTalk';

export function BottomButton({ onOpen }: { onOpen: (type: BottomSheetType) => void }) {
  return (
    <div className="flex w-full flex-col gap-2 border-neutral-100 border-t bg-white p-5">
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
          className="flex-1 gap-1 border"
          color="black"
          variant="ghost"
          size="sm"
          onClick={() => onOpen('warning')}
        >
          <ErrorIcon className="text-red-500" /> 경고
        </Button>
        <Button
          className="flex-1 gap-1"
          color="black"
          variant="ghost"
          size="sm"
          onClick={() => onOpen('cheerTalk')}
        >
          <SmsIcon /> 응원톡
        </Button>
      </div>
    </div>
  );
}
