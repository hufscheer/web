import { colors, Typography } from '@hcc/ui';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';

import { GameCheerTalkTabs } from '../../../_components/game-cheertalk/cheertalk-tabs';

type Props = {
  params: Promise<{ id: string; gameId: string }>;
};

const Page = async ({ params }: Props) => {
  const { id: _id, gameId: _gameId } = await params;

  if (!_id || Number.isNaN(Number(_id))) notFound();
  if (!_gameId || Number.isNaN(Number(_gameId))) notFound();
  const id = Number(_id);
  const gameId = Number(_gameId);

  const BlockedTalkMenu = () => (
    <Typography color={colors.neutral500} weight="semibold" asChild>
      <Link href={`/${routes.game_cheertalk_block(id, gameId, 'BASKETBALL')}`}>가려진 목록</Link>
    </Typography>
  );

  return (
    <>
      <Header title="응원톡 관리" menu={<BlockedTalkMenu />} arrow />

      <div className="column h-full gap-2 overflow-hidden bg-white px-5 py-4">
        <GameCheerTalkTabs gameId={gameId} />
      </div>
    </>
  );
};

export default Page;
