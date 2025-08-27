import { Spinner } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import { notFound } from 'next/navigation';
import { Header } from '~/components/layout';
import { FormSection } from './form-section';
import { TeamDeleteMenu } from './team-delete-menu';

type Props = {
  params: Promise<{ id: number }>;
};

const Page = async ({ params }: Props) => {
  const { id: _id } = await params;

  if (!_id || Number.isNaN(_id)) {
    notFound();
  }

  const id: number = Number(_id);

  return (
    <>
      <Header title="참가 팀 수정" menu={<TeamDeleteMenu id={id} />} arrow />

      <div className="column-between h-full overflow-hidden">
        <Suspense
          fallback={
            <div className="center p-5">
              <Spinner size="lg" color="neutral" />
            </div>
          }
          clientOnly
        >
          <FormSection id={id} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
