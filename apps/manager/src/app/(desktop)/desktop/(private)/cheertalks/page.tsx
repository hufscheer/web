import { QueryBoundary } from '~/app/(desktop)/_components/query-boundary';
import { parseCheerTalkFilter } from '~/app/(desktop)/_utils/cheer-talk-filter';

import { AllCheerTalks } from './_components/cheer-talks-pages';

type Props = {
  searchParams: Promise<{ filter?: string | string[] }>;
};

const CheerTalksPage = async ({ searchParams }: Props) => {
  const { filter } = await searchParams;

  return (
    <QueryBoundary>
      <AllCheerTalks initialFilter={parseCheerTalkFilter(filter)} />
    </QueryBoundary>
  );
};

export default CheerTalksPage;
