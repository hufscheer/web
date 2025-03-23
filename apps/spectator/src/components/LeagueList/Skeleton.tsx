import * as styles from './LeagueList.css';

export default function LeagueListSkeleton() {
  return (
    <div className={styles.skeleton.root}>
      <div className={styles.skeleton.title} />
      <div className={styles.skeleton.list}>
        <div className={styles.skeleton.description} />
        <div className={styles.skeleton.description} />
        <div className={styles.skeleton.description} />
        <div className={styles.skeleton.description} />
      </div>
      <div className={styles.skeleton.title} />
      <div className={styles.skeleton.list}>
        <div className={styles.skeleton.description} />
        <div className={styles.skeleton.description} />
      </div>
    </div>
  );
}
