import { AddIcon } from '@hcc/icons';
import { Button, Spinner, Typography } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import Link from 'next/link';
import { Fragment } from 'react';
import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';
import { PlayerList } from './_components/player-list';

const PlayerEditMenu = ({ edit }: { edit: boolean }) => {
  return (
    <Typography color="var(--color-neutral-500)" weight="semibold" asChild>
      <Link href={`/${routes.player}?edit=${edit ? 'false' : 'true'}`} replace>
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
    <Fragment>
      <Header title="선수 관리" menu={<PlayerEditMenu edit={edit} />} arrow />

      <div className="column h-full overflow-hidden bg-white px-5">
        <Suspense
          fallback={
            <div className="center p-5">
              <Spinner size="lg" color="neutral" />
            </div>
          }
          clientOnly
        >
          <PlayerList edit={edit} />
        </Suspense>

        <div className="fixed bottom-5 w-full max-w-[calc(var(--app-max-width)-40px)] gap-0.5">
          <Button className="w-full" variant="subtle" color="black" size="lg" asChild>
            <Link href={`/${routes.player_create}`}>
              <AddIcon className="mr-0.5" size={24} /> 새로운 선수 추가
            </Link>
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Page;
