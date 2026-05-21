import type { Metadata } from 'next';

import { redirect } from 'next/navigation';

import type { GameType } from '~/api';

import { fetchGame } from '~/api';
import { routes } from '~/constants/routes';
import { DEFAULT_SPORT, normalizeSportParam } from '~/utils/sport-route';

import { GamePageClient } from './_components/game-page-client';

const validTabs = ['cheer', 'lineup', 'timeline', 'video'];

type Props = {
  searchParams: Promise<{ tab?: string }>;
  params: Promise<{ id: string; sport: string }>;
};

const Page = async ({ searchParams, params }: Props) => {
  const { id: _id, sport: _sport } = await params;
  const id = Number(_id);
  const sportType = normalizeSportParam(_sport);

  if (Number.isNaN(id) || id <= 0) {
    redirect(routes.home({ sport: DEFAULT_SPORT }));
  }

  if (!sportType) {
    redirect(routes.home({ sport: DEFAULT_SPORT }));
  }

  const { tab: _tab } = await searchParams;
  const tab = validTabs.includes(_tab || '') ? _tab : 'cheer';

  if (_tab && !validTabs.includes(_tab)) {
    redirect('?tab=cheer');
  }

  return <GamePageClient gameId={id} sportType={sportType} defaultTab={tab as string} />;
};

export default Page;

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id: _id } = await params;
  const id = Number(_id);

  if (!_id || Number.isNaN(id) || id <= 0) return {};

  const game: GameType = await fetchGame({ gameId: id });
  const teamNames = game.gameTeams.map((t) => t.gameTeamName);
  const title =
    teamNames.length === 2 ? `${game.gameName} - ${teamNames[0]} : ${teamNames[1]}` : game.gameName;

  return {
    title,
    openGraph: { title },
    twitter: { title },
  };
};
