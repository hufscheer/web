'use client';

import { useSuspenseQuery } from '@hcc/api-base';

import type { SportType } from '~/app/(desktop)/_types';

import { queryKeys } from '~/api';
import { PageHeader } from '~/app/(desktop)/_components/layout/page-header';
import { routes } from '~/app/(desktop)/_constants/routes';
import { getSportConfig } from '~/constants/sports';

import { TeamForm } from '../../../_components/team-form';

export const TeamCreate = ({ sportType }: { sportType: SportType }) => {
  const { data: units } = useSuspenseQuery(queryKeys.teams.units({ sportType }));

  return (
    <div className="flex flex-col">
      <PageHeader
        title="팀 생성"
        breadcrumb={[
          '팀 관리',
          { label: getSportConfig(sportType).label, href: routes.teams(sportType) },
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
