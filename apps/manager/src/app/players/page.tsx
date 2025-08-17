import { Typography } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import Link from 'next/link';
import { Header } from '~/components/layout';
import { ROUTES } from '~/constants/routes';
import { PlayerList } from './_components/player-list';

const PlayerEditButton = ({ edit }: { edit: boolean }) => {
  return (
    <Typography color="var(--color-neutral-500)" weight="semibold" asChild>
      <Link href={`${ROUTES.PLAYER}?edit=${edit ? 'false' : 'true'}`} replace>
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
      <Header title="선수 관리" menu={<PlayerEditButton edit={edit} />} arrow />

      <div className="column mt-1.5 h-full gap-1.5">
        <Suspense clientOnly>
          <PlayerList edit={edit} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
