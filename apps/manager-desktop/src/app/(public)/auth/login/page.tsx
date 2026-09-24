import { HCCBigLogo } from '~/components/icons';

import { LoginForm } from './_components/login-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[var(--color-canvas)] px-6">
      <div className="flex w-full max-w-100 flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="flex items-end gap-2 text-[var(--color-neutral-900)]">
            <HCCBigLogo width={87} height={26} />
            <span className="text-t5 leading-none font-medium">매니저</span>
          </span>
          <h1 className="text-t2 font-bold">대회 운영자 로그인</h1>
          <p className="text-t6 text-[var(--color-neutral-500)]">
            등록된 운영자 계정으로 로그인해 주세요.
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
