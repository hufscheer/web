'use client';

import { Button } from '@hcc/ui';

import { AlertDialog } from '~/components/ui';

import { ActionOption } from './ActionOption';
import { useStatusChangeForm } from './use-status-change-form';

type Props = {
  leagueId: number;
  gameId: number;
  onClose: () => void;
};

export default function StatusChangeSheet({ leagueId, gameId, onClose }: Props) {
  const form = useStatusChangeForm({ leagueId, gameId, onSubmitted: onClose });

  return (
    <div className="flex h-full flex-col gap-4 bg-white p-5">
      <div className="text-base font-medium text-black">상태</div>

      <div className="flex flex-col gap-2">
        {form.actions.map((action) => (
          <ActionOption
            key={`${action.quarter}-${action.gameProgressType}`}
            label={action.displayName}
            selected={form.isSelected(action)}
            onClick={() => form.onSelect(action)}
          />
        ))}
      </div>

      <AlertDialog
        title={`${form.selected?.displayName} 처리 할게요`}
        description="변경된 상태는 수정이 불가할 수 있어요"
        primaryTitle="등록"
        onPrimaryClick={form.onSubmit}
      >
        <Button
          color="black"
          size="lg"
          disabled={!form.selected || form.isPending}
          loading={form.isPending}
        >
          타임라인 등록
        </Button>
      </AlertDialog>
    </div>
  );
}
