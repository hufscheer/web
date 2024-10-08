import * as styles from './styles.css';

export default function CheerVSSkeleton() {
  return (
    <div className={styles.skeleton.root}>
      <div className={styles.skeleton.box} />
      <div className={styles.skeleton.empty}>
        <div className={styles.skeleton.vs}>VS</div>
      </div>
      <div className={styles.skeleton.box} />
    </div>
  );
}
