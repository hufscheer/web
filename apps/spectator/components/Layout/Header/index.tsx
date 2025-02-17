'use client';

import { ArrowBackIcon, NewHccIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import * as styles from './styles.css';
import Sidebar from '../../Sidebar';

type HeaderProps = {
  arrowVisible: boolean;
};

const Header = ({ arrowVisible }: HeaderProps) => {
  const router = useRouter();

  return (
    <header className={styles.root}>
      <div className={styles.container}>
        {arrowVisible ? (
          <button
            aria-label="이전 페이지로 이동"
            className={styles.previous}
            onClick={() => router.back()}
          >
            <Icon source={ArrowBackIcon} color="black" />
          </button>
        ) : (
          <span />
        )}

        <Link className={styles.home} href="/" aria-label="홈페이지로 이동">
          <Icon
            width="71.5"
            height="21"
            source={NewHccIcon}
            color="primary"
            aria-label="훕치치"
          />
        </Link>

        <Sidebar />
      </div>
    </header>
  );
};

export default Header;
