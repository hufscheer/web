'use client';

import type { GameFormType } from '~/api';
import { GameForm } from '../_components/game-form';

type Props = {
  leagueId: number;
};

export const FormSection = ({ leagueId }: Props) => {
  const handleSubmit = async (data: GameFormType) => {
    console.log(data);
  };

  return <GameForm leagueId={leagueId} className="p-5" onSubmit={handleSubmit} />;
};
