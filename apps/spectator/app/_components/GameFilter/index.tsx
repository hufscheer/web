import { Fragment } from 'react';

import AsyncBoundary from '@/components/AsyncBoundary';

import LeagueFilter from './LeagueFilter';
import RoundFilter from './RoundFilter';
import SportFilter from './SportFilter';

export default function GameFilter() {
  return (
    <Fragment>
      <AsyncBoundary
        errorFallback={() => <div></div>}
        loadingFallback={<div></div>}
      >
        <LeagueFilter />
      </AsyncBoundary>
      <AsyncBoundary
        errorFallback={() => <div></div>}
        loadingFallback={<div></div>}
      >
        <SportFilter />
      </AsyncBoundary>
      <AsyncBoundary
        errorFallback={() => <div></div>}
        loadingFallback={<div></div>}
      >
        <RoundFilter />
      </AsyncBoundary>
    </Fragment>
  );
}
