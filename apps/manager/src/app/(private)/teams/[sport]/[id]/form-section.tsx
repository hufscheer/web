'use client';

import type { TeamFormType } from '@hcc/manager-api';

import { useSuspenseTeam, useUpdateTeams } from '@hcc/manager-api';
import { toast } from '@hcc/ui';
import { useRouter } from 'next/navigation';

import { useImageUpload } from '~/hooks';
import { parseHTTPError } from '~/utils/form-util';

import { TeamForm } from '../../_components/team-form';

type Props = {
  id: number;
};

export const FormSection = ({ id }: Props) => {
  const router = useRouter();
  const { uploadImage } = useImageUpload();

  const { mutateAsync } = useUpdateTeams();
  const handleSubmit = async (data: TeamFormType) => {
    const teamPlayers = data.teamPlayers?.map(({ playerId, jerseyNumber }) => ({
      playerId,
      jerseyNumber,
    }));

    try {
      let imageUrl: string;
      if (data.logoImageUrl instanceof File) {
        imageUrl = await uploadImage(data.logoImageUrl);
      } else {
        imageUrl = data.logoImageUrl;
      }

      await mutateAsync({ id, ...data, logoImageUrl: imageUrl, teamPlayers });
      toast.success('팀이 수정되었어요');
      router.back();
    } catch (error) {
      toast.error(await parseHTTPError(error, '팀 수정에 실패했어요'));
    }
  };

  const { data } = useSuspenseTeam({ id });

  return <TeamForm onSubmit={handleSubmit} initialData={data} isEditMode />;
};
