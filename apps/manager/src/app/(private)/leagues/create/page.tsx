'use client';
import { Button, Input, Typography } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import Link from 'next/link';
import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';
import { StepProgress } from '~/components/ui';
import { InputSelect } from '~/components/ui/input-select';
import { InputDate } from '~/components/ui/input-date';

const ROUND_STRINGS = ['32강', '16강', '8강', '4강', '결승'];
const ROUND_OPTIONS = ROUND_STRINGS.map(round => ({
  value: round,
  label: round,
}));
const Page = () => {
  const handleNextStep = () => (
    <Typography color="var(--color-neutral-500)" weight="semibold" asChild>
      <Link href={`/${routes.league}`}>대회 생성</Link>
    </Typography>
  );
  return (
    <>
      <Header title="신규 대회 만들기" arrow />

      <div className="column h-full gap-1.5 bg-white p-5">
        <Suspense clientOnly>
          <div className="w-auto px-10">
            <StepProgress steps={['기본 정보', '참가 팀등록']} currentStep={1} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-semibold text-black text-lg">대회 정보</div>
            <Input name="name" size="xl" type="name" placeholder="대회 이름" autoComplete="name" />
            <InputDate label="시작 일" />
            <InputDate label="종료 일" />
            <InputSelect options={ROUND_OPTIONS} label="라운드" placeholder="32강" />
          </div>
          <Button size="lg" className="w-full" color="primary" onClick={handleNextStep}>
            다음 단계
          </Button>
          <Button size="lg" className="w-full" color="primary">
            대회 생성
          </Button>
        </Suspense>
      </div>
    </>
  );
};

export default Page;
