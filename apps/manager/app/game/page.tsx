'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Game() {
  const pathname = usePathname();
  return (
    <>
      대회 게임 관리
      <Link href={`${pathname}/1`}>2024 월드컵</Link>
    </>
  );
}
