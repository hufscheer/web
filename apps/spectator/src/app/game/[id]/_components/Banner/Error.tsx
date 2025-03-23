import * as styles from './Banner.css';

export default function BannerFallback() {
  return (
    <div className={styles.errorFallback.root}>
      <div className={styles.errorFallback.message}>
        연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.
      </div>
    </div>
  );
}
