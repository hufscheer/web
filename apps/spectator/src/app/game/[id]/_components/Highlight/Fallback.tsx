import * as styles from './Highlight.css';

export default function HighlightFallback() {
  return (
    <div className={styles.errorFallback.wrapper}>
      <span className={styles.errorFallback.message}>경기 하이라이트가 등록되지 않았어요.</span>
    </div>
  );
}
