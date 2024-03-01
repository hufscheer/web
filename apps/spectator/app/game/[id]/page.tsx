'use client';

import Live from '@/app/_components/Live';
import AsyncBoundary from '@/components/AsyncBoundary';
import CheerTalkModal from '@/components/cheertalk/Modal/CheerTalkModal';
import Loader from '@/components/Loader';
import Panel from '@/components/Panel';

import Banner from './_components/Banner';
import BannerFallback from './_components/Banner/Error';
import BannerSkeleton from './_components/Banner/Skeleton';
import CheerTalkInReal from './_components/CheerTalk/OnAir';
import CheerVS from './_components/CheerVS';
import CheerVSFallback from './_components/CheerVS/Error';
import Timeline from './_components/Timeline';
import * as styles from './page.css';

export default function Page({ params }: { params: { id: string } }) {
  const options = [
    { label: '라인업' },
    { label: '응원댓글' },
    { label: '경기영상' },
    { label: '타임라인' },
  ];

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
          <CheerTalkInReal gameId={params.id} />
        </AsyncBoundary>
      </section>

      <Panel options={options} defaultValue="라인업">
        {({ selected }) => (
          <>
            {selected === '라인업' && (
              <AsyncBoundary
                errorFallback={() => <div>에러</div>}
                loadingFallback={<Loader />}
              >
                <div></div>
              </AsyncBoundary>
            )}
            {selected === '타임라인' && (
              <AsyncBoundary
                errorFallback={() => <div>에러</div>}
                loadingFallback={<Loader />}
              >
                <Timeline gameId={params.id} />
              </AsyncBoundary>
            )}
            {selected === '응원댓글' && <></>}
            {selected === '경기영상' && (
              <AsyncBoundary
                errorFallback={() => <div>에러</div>}
                loadingFallback={<Loader />}
              >
                <div></div>
              </AsyncBoundary>
            )}
          </>
        )}
      </Panel>
      <CheerTalkModal gameId={params.id} />
    </section>
  );
}
