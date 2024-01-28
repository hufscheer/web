import Link from 'next/link';

export default function Page(): JSX.Element {
  return (
    <main style={{ display: 'flex', flexDirection: 'column' }}>
      훕치치 매니저
      <Link href="/league">대회 관리</Link>
      <Link href="/game">게임 관리</Link>
    </main>
  );
}
