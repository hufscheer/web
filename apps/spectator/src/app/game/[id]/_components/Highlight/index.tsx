import { useGameVideo } from '@hcc/api';

import * as styles from './Highlight.css';

type HighlightProps = {
  gameId: string;
};

export default function Highlight({ gameId, ...props }: HighlightProps) {
  const { data } = useGameVideo(gameId);

  if (!data || !data.videoId)
    return <p className={styles.message}>경기 하이라이트가 등록되지 않았어요.</p>;

  return (
    <iframe
      className={styles.highlight}
      src={data.videoId.replace('watch?v=', 'embed/').replace('live', 'embed')}
      title="Match Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      {...props}
    ></iframe>
  );
}
