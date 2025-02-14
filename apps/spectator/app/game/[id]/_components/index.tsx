'use client';
import { Spinner, Tabs } from '@hcc/ui';

import Live from '@/app/_components/Live';
import AsyncBoundary from '@/components/AsyncBoundary';
import { FallbackProps } from '@/components/ErrorBoundary';
import { TABS_CONFIG } from '@/constants/configs';

import Banner from './Banner';
import * as styles from '../page.css';
import BannerFallback from './Banner/Error';
import BannerSkeleton from './Banner/Skeleton';
import CheerTalk from './CheerTalk';
import CheerTalkFallback from './CheerTalk/Fallback';
import CheerVS from './CheerVS';
import CheerVSFallback from './CheerVS/Error';
import CheerVSSkeleton from './CheerVS/Skeleton';
import Highlight from './Highlight';
import HighlightFallback from './Highlight/Fallback';
import Lineup from './Lineup';
import LineupFallback from './Lineup/Fallback';
import Timeline from './Timeline';
import TimelineFallback from './Timeline/Fallback';

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

type GameDetailProps = {
  id: string;
  tabState: string;
  cheerState: boolean;
};

export const GameDetail = ({ id, tabState, cheerState }: GameDetailProps) => {
  return (
    <>
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
          <AsyncBoundary errorFallback={() => <></>} loadingFallback={<></>}>
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
    </>
  );
};
