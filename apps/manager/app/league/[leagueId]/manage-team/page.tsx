import { ChevronRightIcon, PlusIcon } from '@hcc/icons';
import { Button, Icon } from '@hcc/ui';
import Image from 'next/image';
import Link from 'next/link';

import Layout from '@/components/Layout';

import * as styles from './page.css';

type PageProps = {
  params: { leagueId: string };
};

const EditButton = () => {
  return <button>편집</button>;
};

export default function Page({ params }: PageProps) {
  const leagueId: string = params.leagueId;

  return (
    <Layout navigationTitle="대회 내 경기 관리" navigationMenu={<EditButton />}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <span className={styles.teamContainer}>
            <span className={styles.logoContainer}>
              <Image
                src="https://images.hufstreaming.site/test.png"
                alt="팀명"
                width={32}
                height={32}
              />
            </span>
            <span className={styles.content}>
              <h4 className={styles.title}>팀명</h4>
              <p className={styles.description}>00명</p>
            </span>
          </span>
          <Link href={`/league/${leagueId}/register-game`}>
            <Icon source={ChevronRightIcon} color="black" height={12} />
          </Link>
        </li>
        <li className={styles.item}>
          <span className={styles.teamContainer}>
            <span className={styles.logoContainer}>
              <Image
                src="https://images.hufstreaming.site/test.png"
                alt="팀명"
                width={32}
                height={32}
              />
            </span>
            <span className={styles.content}>
              <h4 className={styles.title}>팀명</h4>
              <p className={styles.description}>00명</p>
            </span>
          </span>
          <Link href={`/league/${leagueId}/register-game`}>
            <Icon source={ChevronRightIcon} color="black" height={12} />
          </Link>
        </li>
      </ul>
      <Button className={styles.button} colorScheme="secondary" asChild>
        <Link href={`/league/${leagueId}/register-team`}>
          <Icon source={PlusIcon} />
          새로운 팀 추가
        </Link>
      </Button>
    </Layout>
  );
}
