'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GameInfoMap() {
  const pathname = usePathname();
  return (
    <>
      4강 1경기
      <Link href={`${pathname}/detail`}>게임 정보</Link>
      <Link href={`${pathname}/lineup`}>라인업</Link>
      <Link href={`${pathname}/score`}>점수</Link>
      <Link href={`${pathname}/timeline`}>타임라인</Link>
      <Link href={`${pathname}/cheertalk`}>응원톡 관리</Link>
    </>
  );
}
