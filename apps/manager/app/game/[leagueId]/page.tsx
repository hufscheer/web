'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GameList({
  params: { leagueId },
}: {
  params: { leagueId: number };
}) {
  const pathname = usePathname();
  const gameData = leagueId;
  return (
    <>
      2024 월드컵
      <Link href={`${pathname}/${gameData}`}>4강 1경기</Link>
    </>
  );
}
