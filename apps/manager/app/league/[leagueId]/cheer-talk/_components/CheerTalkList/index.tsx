import { CheerTalkType } from '@hcc/api';
import { ReactNode, useEffect, useRef } from 'react';

import * as styles from './CheerTalkList.css';
import CheerTalkCard from '../CheerTalkCard';

type CheerTalkListProps = {
  cheerTalks: CheerTalkType[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  ActionButton: (cheerTalkId: number) => ReactNode;
};

const CheerTalkList = ({
  cheerTalks,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  ActionButton,
}: CheerTalkListProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { rootMargin: '100px' },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {cheerTalks.map((cheerTalk, index) => (
        <div key={cheerTalk.cheerTalkId} className={styles.cardContainer}>
          <CheerTalkCard cheerTalk={cheerTalk} />
          {ActionButton(cheerTalk.cheerTalkId)}

          {cheerTalks.length - 1 !== index && (
            <hr className={styles.cardDivider} />
          )}
        </div>
      ))}

      <div ref={observerRef}>
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </>
  );
};

export default CheerTalkList;
