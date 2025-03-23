'use client';
import { useLeagueTeams } from '@hcc/api';
import { AddIcon, ChevronForwardIcon } from '@hcc/icons';
import { Button, Icon } from '@hcc/ui';
import Image from 'next/image';
import Link from 'next/link';

import * as styles from '@/app/league/[leagueId]/team/page.css';
import Layout from '@/components/Layout';

type ComponentProps = {
  leagueId: string;
};

const Component = ({ leagueId }: ComponentProps) => {
  const { data: leagueTeams } = useLeagueTeams(leagueId);
  if (!leagueTeams) return null;

  return (
    <Layout navigationTitle="참가 팀 관리">
      <ul className={styles.list}>
        {leagueTeams.map((team) => (
          <li key={team.teamName} className={styles.item}>
            <span className={styles.teamContainer}>
              <span className={styles.logoContainer}>
                <Image src={team.logoImageUrl} alt={team.teamName} width={32} height={32} />
              </span>
              <span className={styles.content}>
                <h4 className={styles.title}>{team.teamName}</h4>
                <p className={styles.description}>{team.sizeOfLeagueTeamPlayers}명</p>
              </span>
            </span>
            <Link
              className={styles.teamLink}
              href={`/league/${leagueId}/team/${team.leagueTeamId}`}
            >
              <Icon source={ChevronForwardIcon} color="black" size="md" />
            </Link>
          </li>
        ))}
      </ul>
      {leagueTeams.length === 0 && (
        <p className={styles.emptyMessage}>대회에 참가할 팀을 등록해보세요.</p>
      )}

      <Button className={styles.button} colorScheme="secondary" fontWeight="semibold" asChild>
        <Link href={`/league/${leagueId}/register-team`}>
          <Icon source={AddIcon} size="md" color="black" />
          새로운 팀 추가
        </Link>
      </Button>
    </Layout>
  );
};

export default Component;
