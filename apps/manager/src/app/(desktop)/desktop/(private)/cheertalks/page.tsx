import { QueryBoundary } from '~/desktop/components/query-boundary';
import { parseCheerTalkFilter } from '~/desktop/utils/cheer-talk-filter';

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
