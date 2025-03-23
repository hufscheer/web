import { Skeleton } from '@hcc/ui';

export default function GameListLoading() {
  return (
    <>
      <div>
        <Skeleton width={36} height={36} radius="md" />
      </div>
    </>
  );
}
