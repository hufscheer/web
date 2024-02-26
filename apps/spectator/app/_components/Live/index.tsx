import * as styles from './Live.css';

export default function Live() {
  return (
    <div className={styles.root}>
      <div className={styles.redLight} />
      <span className={styles.liveText}>Live</span>
    </div>
  );
}
