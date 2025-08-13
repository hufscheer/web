import { Badge, Button, Input } from '@hcc/ui';

const Page = () => {
  return (
    <div className="column-between h-full p-5">
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

      <form className="column w-full">
        <Input id="email" size="lg" type="email" placeholder="이메일" autoComplete="email" />
        <Input
          id="password"
          className="mt-4"
          size="md"
          type="password"
          placeholder="비밀번호"
          autoComplete="current-password"
        />
        <Button className="mt-6" size="lg" color="black" variant="solid" type="submit">
          로그인
        </Button>
      </form>
    </div>
  );
};

export default Page;
