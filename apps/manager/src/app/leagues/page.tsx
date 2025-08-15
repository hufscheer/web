import { Typography } from '@hcc/ui';
import Link from 'next/link';
import { Header } from '~/components/layout';
import { ROUTES } from '~/constants/routes';

const LeagueCreateMenu = () => (
  <Typography color="var(--color-neutral-500)" weight="semibold" asChild>
    <Link href={ROUTES.LEAGUE}>대회 생성</Link>
  </Typography>
);

const Page = () => {
  return (
    <>
      <Header title="대회 관리" menu={<LeagueCreateMenu />} arrow />

      <div className="h-full" />
    </>
  );
};

export default Page;
