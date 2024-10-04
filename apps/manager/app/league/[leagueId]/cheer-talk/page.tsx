'use client';
import {
  useLeagueCheerTalk,
  useLeagueCheerTalkReported,
  useUpdateCheerTalkBlock,
} from '@hcc/api';
import { Button, Tabs, toast } from '@hcc/ui';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Suspense } from 'react';

import Layout from '@/components/Layout';

import CheerTalkList from './_components/CheerTalkList';
import * as styles from './page.css';

type PageProps = {
  params: { leagueId: string };
};

export default function Page({ params }: PageProps) {
  const leagueId: string = params.leagueId;

  const { mutate: updateCheerTalkBlock } = useUpdateCheerTalkBlock();
  const BlockButton = (cheerTalkId: number) => {
    return (
      <Button
        colorScheme="red"
        size="xs"
        fullWidth
        onClick={() => {
          updateCheerTalkBlock(
            { leagueId, cheerTalkId },
            {
              onSuccess: () => {
                toast({ title: `응원톡을 가렸어요`, variant: 'destructive' });
              },
            },
          );
        }}
      >
        채팅 가리기
      </Button>
    );
  };

  const AllCheerTalkContent = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
      useLeagueCheerTalk(leagueId);
    return (
      <CheerTalkList
        cheerTalks={data.pages}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        ActionButton={BlockButton}
      />
    );
  };

  const ReportedCheerTalkContent = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
      useLeagueCheerTalkReported(leagueId);
    return (
      <CheerTalkList
        cheerTalks={data.pages}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        ActionButton={BlockButton}
      />
    );
  };

  const tabs = [
    {
      key: 'ALL',
      label: '전체 응원톡',
      renderer: () => <AllCheerTalkContent />,
    },
    {
      key: 'REPORTED',
      label: '신고된 응원톡',
      renderer: () => <ReportedCheerTalkContent />,
    },
  ];

  return (
    <Layout
      navigationTitle="응원톡 관리"
      navigationMenu={
        <Link href={`/league/${leagueId}/cheer-talk/blocked`}>가려진 목록</Link>
      }
    >
      <Tabs className={styles.tab} defaultValue="ALL">
        <Tabs.List className={styles.tabList}>
          {({ value }) => (
            <div className={styles.tabListContainer}>
              <motion.span
                className={styles.tabIndicator}
                initial={{ x: 0 }}
                animate={{ x: value === 'ALL' ? 0 : 'calc(100% + 6px)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />

              {tabs.map(tab => (
                <Tabs.Trigger
                  key={tab.key}
                  value={tab.key}
                  className={state => styles.tabButton({ state })}
                >
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </div>
          )}
        </Tabs.List>

        <Suspense fallback={null}>
          {tabs.map(tab => (
            <Tabs.Content
              key={tab.key}
              value={tab.key}
              className={styles.tabContent}
            >
              {tab.renderer()}
            </Tabs.Content>
          ))}
        </Suspense>
      </Tabs>
    </Layout>
  );
}
