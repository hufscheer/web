import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { Pretendard } from './_fonts';
import '~/styles/globals.css';

export const metadata: Metadata = {
  title: '훕치치',
  description: '한국외대 스포츠 플랫폼 훕치치',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko">
      <body className={Pretendard.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
