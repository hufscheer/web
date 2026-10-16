import { QueryBoundary } from '~/desktop/components/query-boundary';

import { AllCheerTalks } from './_components/cheer-talks-pages';

const CheerTalksPage = () => (
  <QueryBoundary>
    <AllCheerTalks />
  </QueryBoundary>
);

export default CheerTalksPage;
