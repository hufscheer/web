'use client';
import { useLeagueTeams } from '@hcc/api';
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

  const { data: leagueTeams } = useLeagueTeams(leagueId);
  if (!leagueTeams) return null;

  return (
    <Layout navigationTitle="대회 내 경기 관리" navigationMenu={<EditButton />}>
      <ul className={styles.list}>
        {leagueTeams.map(team => (
          <li key={team.teamName} className={styles.item}>
            <span className={styles.teamContainer}>
              <span className={styles.logoContainer}>
                <Image
                  src={team.logoImageUrl}
                  alt={team.teamName}
                  width={32}
                  height={32}
                />
              </span>
              <span className={styles.content}>
                <h4 className={styles.title}>{team.teamName}</h4>
                <p className={styles.description}>00명</p>
              </span>
            </span>
            <Link href={`/league/${leagueId}/register-game`}>
              <Icon source={ChevronRightIcon} color="black" height={12} />
            </Link>
          </li>
        ))}
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
