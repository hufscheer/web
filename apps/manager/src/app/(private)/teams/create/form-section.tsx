'use client';

import { toast } from '@hcc/ui';
import { useRouter } from 'next/navigation';
import type { TeamFormType } from '~/api';
import { useCreateTeams } from '~/api';
import { TeamForm } from '../_components/team-form';

export function FormSection() {
  const router = useRouter();
  const { mutateAsync: createTeam } = useCreateTeams();

  const handleSubmit = async (data: TeamFormType) => {
    try {
      await createTeam(data);
      toast.success('팀이 성공적으로 생성되었습니다!');
      router.back();
    } catch (error) {
      console.error('팀 생성 실패:', error);
      toast.error('팀 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return <TeamForm className="p-5" onSubmit={handleSubmit} />;
}
