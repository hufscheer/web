'use client';

import { toast } from '@hcc/ui';
import { useRouter } from 'next/navigation';
import { useSuspenseTeam, useUpdateTeams } from '~/api';
import type { TeamFormType } from '~/api/mutations/useCreateTeams';
import { useImageUpload } from '~/hooks';
import { TeamForm } from '../_components/team-form';

type Props = {
  id: number;
};

export const FormSection = ({ id }: Props) => {
  const router = useRouter();
  const { uploadImage } = useImageUpload();

  const { mutateAsync } = useUpdateTeams();
  const handleSubmit = async (data: TeamFormType) => {
    let imageUrl: string;
    if (data.logoImageUrl instanceof File) {
      imageUrl = await uploadImage(data.logoImageUrl);
    } else {
      imageUrl = data.logoImageUrl;
    }

    try {
      await mutateAsync({ id, ...data, logoImageUrl: imageUrl });
      toast.success('팀이 수정되었어요.');
      router.back();
    } catch (error) {
      console.error(error);
      toast.error('팀 수정에 실패했어요.');
    }
  };

  const { data } = useSuspenseTeam({ id });

  return <TeamForm className="p-5" onSubmit={handleSubmit} initialData={data} />;
};
