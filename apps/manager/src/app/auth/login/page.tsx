import { Badge } from '@hcc/ui';

const Page = () => {
  return (
    <div className="column-between h-full p-5">
      <div className="flex w-full justify-between">
        <h1 className="font-semibold text-neutral-900 text-xl leading-tight">
          Hufscheer
          <br />
          manager
        </h1>
        <Badge className="h-fit" size="small" variant="success">
          매니저 용
        </Badge>
      </div>
      <div className="column w-full" />
    </div>
  );
};

export default Page;
