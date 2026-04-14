'use client';

import { Button } from '@hcc/ui';

export default function BasketballAddScoreSheet() {
  return (
    <div className="flex h-full flex-col gap-4 bg-white p-5">
      <div className="text-base font-medium text-black">상황</div>

      <div className="text-base font-medium text-black">득점 상세 정보</div>

      <Button color="black" size="lg">
        타임라인 등록
      </Button>
    </div>
  );
}
