import Link from 'next/link';

export default function Page(): JSX.Element {
  return (
    <main style={{ display: 'flex', flexDirection: 'column' }}>
      <Link
        href={{ pathname: '/login', query: { redirectPath: 'redirectUrl' } }}
      >
        로그인 페이지로
      </Link>
    </main>
  );
}
