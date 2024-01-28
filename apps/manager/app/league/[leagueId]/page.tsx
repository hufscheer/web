'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LeagueInfoMap() {
  const pathname = usePathname();
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      2024 월드컵
      <Link href={`${pathname}/detail`}>대회 정보</Link>
      <Link href={`${pathname}/team`}>대회 팀 관리</Link>
      <Link href={`/game/1`}>대회 게임 관리</Link>
    </div>
  );
}
