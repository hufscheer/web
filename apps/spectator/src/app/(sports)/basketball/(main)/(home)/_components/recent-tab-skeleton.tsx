import { Skeleton } from '~/components/skeleton';

export const RecentTabSkeleton = () => {
  return (
    <div className="flex flex-1 px-5">
      <div className="flex flex-1 flex-col gap-3">
        <Skeleton className="h-px rounded-none p-0" />

        <div className="row-between py-1">
          <div className="center-y gap-3">
            <Skeleton className="h-5 w-32 p-0" />
            <Skeleton className="h-6 w-20 rounded-full p-0" />
          </div>
          <Skeleton className="h-6 w-6 rounded-full p-0" />
        </div>

        <Skeleton className="h-px rounded-none p-0" />

        <div className="column gap-4 p-2">
          <div className="row-between">
            <Skeleton className="h-4 w-28 p-0" />
            <Skeleton className="h-6 w-16 rounded-full p-0" />
          </div>

          <div className="flex gap-4">
            <div className="column flex-1 gap-2">
              <TeamSkeleton />
              <TeamSkeleton />
            </div>

            <Skeleton className="w-px rounded-none p-0" />

            <div className="column center-y gap-2 self-center pt-2">
              <Skeleton className="h-7 w-12 p-0" />
              <Skeleton className="h-7 w-12 p-0" />
            </div>
          </div>
        </div>

        <Skeleton className="h-9 p-0" />
      </div>
    </div>
  );
};

const TeamSkeleton = () => {
  return (
    <div className="center-y flex-1 justify-between">
      <div className="center-y gap-2">
        <Skeleton className="h-7 w-7 rounded-full p-0" />
        <Skeleton className="h-5 w-28 p-0" />
      </div>
      <Skeleton className="h-5 w-5 p-0" />
    </div>
  );
};
