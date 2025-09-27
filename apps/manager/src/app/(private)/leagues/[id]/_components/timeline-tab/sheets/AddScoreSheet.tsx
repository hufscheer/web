'use client';
import { Button } from '@hcc/ui';

export default function AddScoreSheet({
  gameId,
  onClose,
}: {
  gameId: number;
  onClose: () => void;
}) {
  // 폼 상태/제출 로직...
  return (
    <div className="space-y-3">
      <div className="text-neutral-500 text-sm">경기 #{gameId} 득점 정보를 입력하세요.</div>
      {/* Input/Select 등… */}
      <div className="flex gap-2">
        <Button variant="ghost" onClick={onClose}>
          취소
        </Button>
        <Button
          color="primary"
          onClick={() => {
            /* submit */ onClose();
          }}
        >
          저장
        </Button>
      </div>
    </div>
  );
}
