'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LeagueTeamList() {
  const pathname = usePathname();
  return (
    <>
      2024 월드컵
      <Link href={`${pathname}/1`}>미컴 축구생각</Link>
      <Link href={`${pathname}/2`}>경영 야생마</Link>
    </>
  );
}
