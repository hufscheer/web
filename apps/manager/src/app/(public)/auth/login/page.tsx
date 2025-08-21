import { Badge } from '@hcc/ui';
import { LoginForm } from './login-form';

const Page = () => {
  return (
    <div className="column-between h-full bg-white p-5">
      <div className="flex w-full justify-between">
        <h1 className="font-semibold text-neutral-900 text-xl leading-tight">
          Hufscheer
          <br />
          manager
        </h1>
        <Badge className="h-fit" size="sm" variant="primary">
          매니저 용
        </Badge>
      </div>

      <LoginForm />
    </div>
  );
};

export default Page;
