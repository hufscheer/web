'use client';

import AsyncBoundary from '@/components/AsyncBoundary';
import CheerTalkModal from '@/components/cheertalk/Modal/CheerTalkModal';
import Loader from '@/components/Loader';
import Panel from '@/components/Panel';

import Banner from './_components/Banner';
import BannerFallback from './_components/Banner/Error';
import BannerSkeleton from './_components/Banner/Skeleton';
import CheerVS from './_components/CheerVS';
import CheerVSFallback from './_components/CheerVS/Error';
// import * as styles from './page.css';

export default function Game({ params }: { params: { id: string } }) {
  const options = [
    { label: '라인업' },
    { label: '응원댓글' },
    { label: '경기영상' },
    { label: '타임라인' },
  ];

  return (
    <>
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
        <Panel options={options} defaultValue="라인업">
          {({ selected }) => (
            <>
              {selected === '라인업' && (
                <AsyncBoundary
                  errorFallback={() => <div>에러</div>}
                  loadingFallback={<Loader />}
                >
                  <div></div>
                  {/* <FconlineLineupFetcher gameId={params.id}>
                    {({ mergedUserInfo }) => (
                      <FconlineUserLineup userInfos={mergedUserInfo} />
                      // <div className="grid grid-cols-2 py-5 [&>*:first-child>ul]:before:absolute [&>*:first-child>ul]:before:right-0 [&>*:first-child>ul]:before:h-full [&>*:first-child>ul]:before:border-l-2 [&>*:first-child>ul]:before:bg-gray-2">
                      //   <Lineup {...firstTeam} />
                      //   <Lineup {...secondTeam} />
                      // </div>
                    )}
                  </FconlineLineupFetcher> */}
                </AsyncBoundary>
              )}
              {selected === '타임라인' && (
                <AsyncBoundary
                  errorFallback={() => <div>에러</div>}
                  loadingFallback={<Loader />}
                >
                  <div></div>
                  {/* <GameTimelineFetcher gameId={params.id}>
                    {([firstHalf, secondHalf]) => (
                      <div className={styles.timelineSection}>
                        <RecordList {...firstHalf} />
                        <RecordList {...secondHalf} />
                      </div>
                    )}
                  </GameTimelineFetcher> */}
                </AsyncBoundary>
              )}
              {selected === '응원댓글' && <></>}
              {selected === '경기영상' && (
                <AsyncBoundary
                  errorFallback={() => <div>에러</div>}
                  loadingFallback={<Loader />}
                >
                  <div></div>
                  {/* <GameVideoFetcher gameId={params.id}>
                    {data => (
                      <div className={styles.videoSection}>
                        <Video {...data} />
                      </div>
                    )}
                  </GameVideoFetcher> */}
                </AsyncBoundary>
              )}
            </>
          )}
        </Panel>
        <CheerTalkModal gameId={params.id} />
      </section>
    </>
  );
}
