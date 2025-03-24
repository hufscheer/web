import * as styles from './Tip.css';

type TipProps = {
  title: string;
  description: string;
};

const Tip = ({ title, description }: TipProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.innerContainer}>
        <div className={styles.title}>{title}</div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default Tip;
