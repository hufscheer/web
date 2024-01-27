'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Score() {
  const pathname = usePathname();
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      점수
      <Link href={`${pathname}/1`}>미컴 축구생각</Link>
    </div>
  );
}
