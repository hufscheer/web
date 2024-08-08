'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { leagueFormSchema } from '@/app/league/_components/LeagueForm';
import Layout from '@/components/Layout';

import {
  teamDefaultValues,
  TeamForm,
  TeamFormSchema,
} from '../_components/TeamForm';

type PageProps = {
  params: { leagueId: string };
};

export default function Page({ params }: PageProps) {
  const leagueId: string = params.leagueId;

  const methods = useForm<TeamFormSchema>({
    resolver: zodResolver(leagueFormSchema),
    defaultValues: teamDefaultValues,
  });

  alert(leagueId);

  return (
    <Layout navigationTitle="새로운 팀 추가">
      <TeamForm methods={methods} />
    </Layout>
  );
}
