'use client';

import { useSuspenseQuery } from '@hcc/api-base';
import { queryKeys } from '@hcc/manager-api';

import type { SportType } from '~/types';

import { PageHeader } from '~/components/layout/page-header';
import { routes } from '~/constants/routes';
import { SPORT_LABEL } from '~/constants/sports';

import { TeamForm } from '../../../_components/team-form';

export const TeamCreate = ({ sportType }: { sportType: SportType }) => {
  const { data: units } = useSuspenseQuery(queryKeys.teams.units({ sportType }));

  return (
    <div className="flex flex-col">
      <PageHeader
        title="팀 생성"
        breadcrumb={[
          '팀 관리',
          { label: SPORT_LABEL[sportType], href: routes.teams(sportType) },
          '팀 생성',
        ]}
        description="선수 관리에 등록된 선수만 검색돼요."
      />
      <div className="p-6">
        <TeamForm sportType={sportType} units={units} />
      </div>
    </div>
  );
};
