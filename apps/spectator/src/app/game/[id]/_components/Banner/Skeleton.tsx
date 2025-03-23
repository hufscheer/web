import * as styles from './Banner.css';

export default function BannerSkeleton() {
  return (
    <div className={styles.skeleton.root}>
      <div className={styles.skeleton.imageBox}>
        <div className={styles.skeleton.image} />
        <div className={styles.skeleton.teamName} />
      </div>
      <div className={styles.skeleton.center}>
        <div className={styles.skeleton.line} style={{ width: '80%', height: '12px' }} />
        <div className={styles.skeleton.line} style={{ width: '100%', height: '16px' }} />
        <div className={styles.skeleton.line} style={{ width: '85%', height: '12px' }} />
      </div>
      <div className={styles.skeleton.imageBox}>
        <div className={styles.skeleton.image} />
        <div className={styles.skeleton.teamName} />
      </div>
    </div>
  );
}
