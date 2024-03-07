'use client';

import { Tabs } from '@hcc/ui';

import Live from '@/app/_components/Live';
import CheerTalk from '@/app/game/[id]/_components/CheerTalk';
import AsyncBoundary from '@/components/AsyncBoundary';
import Loader from '@/components/Loader';

import Banner from './_components/Banner';
import BannerFallback from './_components/Banner/Error';
import BannerSkeleton from './_components/Banner/Skeleton';
import CheerVS from './_components/CheerVS';
import CheerVSFallback from './_components/CheerVS/Error';
import Lineup from './_components/Lineup';
import Timeline from './_components/Timeline';
import * as styles from './page.css';

const tabs = [
  {
    label: '라인업',
    renderer: (gameId: string) => <Lineup gameId={gameId} />,
  },
  {
    label: '타임라인',
    renderer: (gameId: string) => <Timeline gameId={gameId} />,
  },
  {
    label: '경기영상',
    renderer: (gameId: string) => <div>{gameId} 경기영상</div>,
  },
];

export default function Page({ params }: { params: { id: string } }) {
  return (
    <section>
      <AsyncBoundary
        errorFallback={() => <BannerFallback />}
        loadingFallback={<BannerSkeleton />}
      >
        <Banner gameId={params.id} />
      </AsyncBoundary>

      <AsyncBoundary
        errorFallback={() => <CheerVSFallback />}
        loadingFallback={<Loader />}
      >
        <CheerVS gameId={params.id} />
      </AsyncBoundary>

      <section className={styles.cheerTalk.section}>
        <div className={styles.cheerTalk.header}>
          <h2 className={styles.cheerTalk.title}>실시간 응원톡</h2>
          <Live />
        </div>

        <AsyncBoundary
          errorFallback={() => <div>에러</div>}
          loadingFallback={<div>로딩</div>}
        >
          <CheerTalk gameId={params.id} />
        </AsyncBoundary>
      </section>

      <Tabs defaultValue="라인업" className={styles.panel.wrapper}>
        <Tabs.List className={styles.panel.menu}>
          {tabs.map(tab => (
            <Tabs.Trigger
              key={tab.label}
              value={tab.label}
              className={state => styles.item[state]}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {tabs.map(tab => (
          <Tabs.Content key={tab.label} value={tab.label}>
            <AsyncBoundary
              errorFallback={() => <div>에러</div>}
              loadingFallback={<Loader />}
            >
              {tab.renderer(params.id)}
            </AsyncBoundary>
          </Tabs.Content>
        ))}
      </Tabs>

      <CheerTalkModal gameId={params.id} />
    </section>
  );
}
