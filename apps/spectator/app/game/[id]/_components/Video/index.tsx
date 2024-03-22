import { useVideoQuery } from '@/queries/useVideoQuery';

import * as styles from './Video.css';

type VideoProps = {
  gameId: string;
};

export default function Video({ gameId, ...props }: VideoProps) {
  const { data: videoId } = useVideoQuery(gameId);

  return (
    <iframe
      className={styles.video}
      src={`${process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_BASE_SRC}/${videoId}`}
      title="Match Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      {...props}
    ></iframe>
  );
}
