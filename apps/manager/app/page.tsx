import { Input, Uploader } from '@packages/ui';

export default function Page(): JSX.Element {
  return (
    <main>
      매니저 워크스페이스
      <Uploader />
      <Input />
    </main>
  );
}
