import { AddIcon } from '@hcc/icons';
import { Button, Typography } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import Link from 'next/link';
import { TeamList } from '~/app/teams/_components/team-list';
import { Header } from '~/components/layout';
import { ROUTES } from '~/constants/routes';

const TeamEditMenu = ({ edit }: { edit: boolean }) => {
  return (
    <Typography color="var(--color-neutral-500)" weight="semibold" asChild>
      <Link href={`${ROUTES.TEAM}?edit=${edit ? 'false' : 'true'}`} replace>
        {edit ? '완료' : '편집'}
      </Link>
    </Typography>
  );
};

type Props = {
  searchParams: Promise<{ edit?: string }>;
};

const Page = async ({ searchParams }: Props) => {
  const { edit: _edit } = await searchParams;
  const edit = _edit === 'true';

  return (
    <>
      <Header title="참가 팀 관리" menu={<TeamEditMenu edit={edit} />} arrow />

      <div className="column h-full overflow-hidden bg-white px-5">
        <Suspense clientOnly>
          <TeamList />
        </Suspense>

        <div className="fixed bottom-5 w-full max-w-[calc(var(--app-max-width)-40px)] gap-0.5">
          <Button className="w-full" variant="subtle" color="black" size="lg" asChild>
            <Link href={ROUTES.TEAM_CREATE}>
              <AddIcon className="mr-0.5" size={24} /> 새로운 팀 추가
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Page;
