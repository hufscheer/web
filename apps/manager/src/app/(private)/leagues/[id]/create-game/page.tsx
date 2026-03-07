import { notFound } from 'next/navigation';

import { Header } from '~/components/layout';

import { FormSection } from './form-section';

type Props = {
  params: Promise<{ id: number }>;
};

const Page = async ({ params }: Props) => {
  const { id: _id } = await params;

  if (!_id || Number.isNaN(Number(_id))) notFound();
  const id = Number(_id);

  return (
    <>
      <Header title="경기 생성" arrow />

      <div className="column-between h-full overflow-hidden">
        <FormSection leagueId={id} />
      </div>
    </>
  );
};

export default Page;
