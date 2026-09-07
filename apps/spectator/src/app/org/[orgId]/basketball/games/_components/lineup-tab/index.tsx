'use client';

import type { PropsWithChildren } from 'react';

import { colors, Typography } from '@hcc/ui';
import { ErrorBoundary } from '@suspensive/react';

import { LineupNotRegisteredError } from '~/api';

import { CandidateList } from './candidate-list';
import { PlayerList } from './player-list';

type Props = {
  gameId: number;
};

export const LineupTab = ({ gameId }: Props) => (
  <ErrorBoundary
    shouldCatch={LineupNotRegisteredError}
    fallback={({ error }) => <ErrorMessage>{error.message}</ErrorMessage>}
  >
    <div className="bg-white pb-5">
      <PlayerList gameId={gameId} />
      <CandidateList gameId={gameId} />
    </div>
  </ErrorBoundary>
);

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <Typography className="p-5 text-center" color={colors.neutral500} fontSize={14} weight="medium">
      {children}
    </Typography>
  );
};
