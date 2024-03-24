import { useVideoQuery } from '@/queries/useVideoQuery';

import * as styles from './Highlight.css';

type HighlightProps = {
  gameId: string;
};

export default function Highlight({ gameId, ...props }: HighlightProps) {
  const { data: info } = useVideoQuery(gameId);

  return (
    <iframe
      className={styles.highlight}
      src={`${process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_BASE_SRC}/${info.videoId}`}
      title="Match Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      {...props}
    ></iframe>
  );
}
