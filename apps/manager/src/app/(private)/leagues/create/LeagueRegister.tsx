'use client';
import { Button, Input } from '@hcc/ui';
import { Suspense } from '@suspensive/react';

type Props = {
  onPrev: () => void;
};
const LeagueRegister = ({ onPrev }: Props) => {
  return (
    <div className="column h-full gap-1.5 bg-white p-5">
      <Suspense clientOnly>
        <div className="flex flex-col gap-4">
          <div className="font-semibold text-black text-lg">참가 팀</div>
        </div>

        <Button size="lg" className="w-full" color="primary" onClick={onPrev}>
          이전 단계
        </Button>
        <Button size="lg" className="w-full" color="primary">
          대회 생성
        </Button>
      </Suspense>
    </div>
  );
};

export default LeagueRegister;
