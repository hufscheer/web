'use client';
import Link from 'next/link';

import * as styles from './not-found.css';

export default function NotFoundPage() {
  return (
    <div className={styles.layout}>
      <p className={styles.branding}>
        Hufscheers
        <br />
        manager
      </p>

      <div className={styles.errorContainer}>
        <h1 className={styles.errorCode}>404</h1>
        <p className={styles.errorMessage}>
          요청하신 페이지를 찾을 수 없습니다.
        </p>
      </div>

      <div className={styles.homeLinkContainer}>
        <div className={styles.homeLinkWrapper}>
          <Link className={styles.homeLink} href="/">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
