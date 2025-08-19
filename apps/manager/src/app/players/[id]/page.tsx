import { Spinner } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import { notFound } from 'next/navigation';
import { PlayerDeleteMenu } from '~/app/players/[id]/player-delete-menu';
import { Header } from '~/components/layout';
import { TipBanner } from '../_components/tip-banner';
import { FormSection } from './form-section';

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
      <Header title="선수 수정" menu={<PlayerDeleteMenu id={id} />} arrow />

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
        <TipBanner />
      </div>
    </>
  );
};

export default Page;
