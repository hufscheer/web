'use client';

import { Spinner, Tabs } from '@hcc/ui';
import { Fragment } from 'react';

import Live from '@/app/_components/Live';
import CheerTalk from '@/app/game/[id]/_components/CheerTalk';
import AsyncBoundary from '@/components/AsyncBoundary';
import { FallbackProps } from '@/components/ErrorBoundary';
import Layout from '@/components/Layout';
import { TABS_CONFIG } from '@/constants/configs';

import Banner from './_components/Banner';
import BannerFallback from './_components/Banner/Error';
import BannerSkeleton from './_components/Banner/Skeleton';
import CheerTalkFallback from './_components/CheerTalk/Fallback';
import CheerVS from './_components/CheerVS';
import CheerVSFallback from './_components/CheerVS/Error';
import CheerVSSkeleton from './_components/CheerVS/Skeleton';
import Highlight from './_components/Highlight';
import HighlightFallback from './_components/Highlight/Fallback';
import Lineup from './_components/Lineup';
import LineupFallback from './_components/Lineup/Fallback';
import Timeline from './_components/Timeline';
import TimelineFallback from './_components/Timeline/Fallback';
import useQueryValidator from './_hooks/useQueryValidator';
import * as styles from './page.css';

const tabs = [
  {
    key: TABS_CONFIG.LINEUP,
    label: '라인업',
    errorUI: (props: FallbackProps) => <LineupFallback {...props} />,
    renderer: (gameId: string) => <Lineup gameId={gameId} />,
  },
  {
    key: TABS_CONFIG.TIMELINE,
    label: '타임라인',
    errorUI: (props: FallbackProps) => <TimelineFallback {...props} />,
    renderer: (gameId: string) => <Timeline gameId={gameId} />,
  },
  {
    key: TABS_CONFIG.HIGHLIGHT,
    label: '경기 영상',
    errorUI: (props: FallbackProps) => <HighlightFallback {...props} />,
    renderer: (gameId: string) => <Highlight gameId={gameId} />,
  },
];

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const tabState = useQueryValidator(
    'tab',
    tabs.map(tab => tab.key),
  );
  const cheerState = !!useQueryValidator('cheer', ['open']);

  return (
    <Layout>
      <AsyncBoundary
        errorFallback={() => <BannerFallback />}
        loadingFallback={<BannerSkeleton />}
      >
        <Banner gameId={id} />
      </AsyncBoundary>

      <AsyncBoundary
        errorFallback={() => <CheerVSFallback />}
        loadingFallback={<CheerVSSkeleton />}
      >
        <CheerVS gameId={id} />
      </AsyncBoundary>

      <section className={styles.cheerTalk.section}>
        <div className={styles.cheerTalk.header}>
          <h2 className={styles.cheerTalk.title}>실시간 응원톡</h2>
          <AsyncBoundary
            errorFallback={() => <Fragment></Fragment>}
            loadingFallback={<Fragment></Fragment>}
          >
            <Live gameId={id} />
          </AsyncBoundary>
        </div>

        <AsyncBoundary
          errorFallback={CheerTalkFallback}
          loadingFallback={<Spinner className={styles.spinner} />}
        >
          <CheerTalk gameId={id} defaultState={cheerState} />
        </AsyncBoundary>
      </section>

      <div className={styles.cheerTalkDivider} />

      <Tabs
        defaultValue={tabState || 'lineup'}
        className={styles.panel.wrapper}
      >
        <Tabs.List className={styles.panel.menu}>
          {tabs.map(tab => (
            <Tabs.Trigger
              key={tab.key}
              value={tab.key}
              className={state => styles.item[state]}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {tabs.map(tab => (
          <Tabs.Content key={tab.key} value={tab.key}>
            <AsyncBoundary
              errorFallback={(props: FallbackProps) => tab.errorUI(props)}
              loadingFallback={<Spinner />}
            >
              {tab.renderer(id)}
            </AsyncBoundary>
          </Tabs.Content>
        ))}
      </Tabs>
    </Layout>
  );
}
