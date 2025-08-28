import { redirect } from 'next/navigation';
import { CalendarMenu } from '~/app/(public)/_components/calendar-menu';
import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const { id: _id } = await params;
  const id = Number(_id);

  if (!_id || Number.isNaN(id) || id <= 0) {
    redirect(`/${routes.home}`);
  }

  return (
    <>
      <Header arrow />
      <div className="h-full w-full">{id}</div>
    </>
  );
};

export default Page;
