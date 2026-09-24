'use client';

import type { SportType } from '@hcc/manager-api';

import { notFound, useParams } from 'next/navigation';

import { Header } from '~/components/layout';

import { FormSection } from './form-section';

const SPORT_MAP: Record<string, SportType> = {
  soccer: 'SOCCER',
  basketball: 'BASKETBALL',
};

const Page = () => {
  const { sport } = useParams<{ sport: string }>();
  const sportType = SPORT_MAP[sport];
  if (!sportType) notFound();

  return (
    <>
      <Header title="참가 팀 생성" arrow />

      <div className="column-between h-full overflow-hidden">
        <FormSection sportType={sportType} />
      </div>
    </>
  );
};

export default Page;
