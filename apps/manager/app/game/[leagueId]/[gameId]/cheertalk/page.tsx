'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CheerTalk() {
  const pathname = usePathname();
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      응원톡 관리
      <Link href={`${pathname}/1`}>와 진짜 ㅈㄴ 못하네</Link>
    </div>
  );
}
