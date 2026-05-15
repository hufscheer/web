'use client';

import { toast } from '@hcc/ui';
import { useRouter } from 'next/navigation';

import type { TeamFormType } from '~/api';
import type { SportType } from '~/api/types';

import { useCreateTeams } from '~/api';
import { useImageUpload } from '~/hooks';
import { parseHTTPError } from '~/utils/form-util';

import { TeamForm } from '../../_components/team-form';

export function FormSection({ sportType }: { sportType: SportType }) {
  const router = useRouter();
  const { mutateAsync: createTeam } = useCreateTeams();
  const { uploadImage } = useImageUpload();

  const handleSubmit = async (data: TeamFormType) => {
    try {
      let imageUrl: string;
      if (data.logoImageUrl instanceof File) {
        imageUrl = await uploadImage(data.logoImageUrl);
      } else {
        imageUrl = data.logoImageUrl;
      }

      await createTeam({ ...data, logoImageUrl: imageUrl });
      toast.success('팀이 생성되었어요');
      router.back();
    } catch (error) {
      toast.error(await parseHTTPError(error, '팀 생성에 실패했어요'));
    }
  };

  return <TeamForm onSubmit={handleSubmit} initialData={{ sportType }} />;
}
