import { Badge, Button, Input, Typography } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import Link from 'next/link';
import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';
import { LeagueOverview } from '../_components/league-overview';
import { SwitchCase } from '~/components/feature';
import { StepProgress } from '~/components/ui';

// const LeagueCreateMenu = () => (
//   <Typography color="var(--color-neutral-500)" weight="semibold" asChild>
//     <Link href={`/${routes.league}`}>대회 생성</Link>
//   </Typography>
// );

const Page = () => {
  return (
    <>
      <Header title="신규 대회 만들기" arrow />

      <div className="column h-full gap-1.5 bg-white p-5">
        <Suspense clientOnly>
          <div className="w-auto px-10">
            <StepProgress steps={['기본 정보', '참가 팀등록']} currentStep={1} />
          </div>
          <div>
            <div className="font-semibold text-black text-lg">대회 정보</div>
          </div>
          <Button size="lg" className="w-full" color="primary">
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
