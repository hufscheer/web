'use client';

import AlertDialog from '@/components/AlertDialog';
import Layout from '@/components/Layout';

type PageProps = {
  params: { leagueId: string; teamId: string };
};

const DeleteButton = () => {
  return (
    <AlertDialog
      title="삭제한 팀은 다시 복구할 수 없어요"
      description="정말 삭제할까요?"
      primaryActionLabel="삭제"
      secondaryActionLabel="취소"
    >
      <button>팀 삭제</button>
    </AlertDialog>
  );
};

export default function Page({ params }: PageProps) {
  const leagueId: string = params.leagueId;
  const teamId: string = params.teamId;

  return (
    <Layout
      navigationTitle="참가 팀 정보 수정"
      navigationMenu={<DeleteButton />}
    >
      {leagueId} / {teamId}
    </Layout>
  );
}
