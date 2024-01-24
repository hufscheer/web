'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LeagueList() {
  const pathname = usePathname();
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      대회 관리
      <Link href={`${pathname}/1`}>2024 월드컵</Link>
      <Link href={`${pathname}/register`}>신규 대회 추가...</Link>
    </div>
  );
}
