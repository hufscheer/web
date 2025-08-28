import { Header } from '~/components/layout';
import { CalendarMenu } from './_components/calendar-menu';

const Page = () => {
  return (
    <>
      <Header menu={<CalendarMenu />} />
      <div className="column-between h-full w-full overflow-hidden">{/* TODO */}</div>
    </>
  );
};

export default Page;
