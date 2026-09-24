import { PageHeader } from '~/components/layout/page-header';

import { PlayerForm } from '../_components/player-form';

export default function PlayerCreatePage() {
  return (
    <div className="flex flex-col">
      <PageHeader title="선수 등록" breadcrumb={['선수 관리', '선수 등록']} />
      <div className="max-w-2xl p-6">
        <PlayerForm />
      </div>
    </div>
  );
}
