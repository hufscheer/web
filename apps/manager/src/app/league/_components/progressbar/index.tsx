import * as styles from './style.css';

type ProgressBarProps = {
  currentStep: number;
  step1Completed: boolean;
  step2Completed: boolean;
  step3Completed: boolean;
  step1Active: boolean;
  step2Active: boolean;
  step3Active: boolean;
  onStepClick?: (step: number) => void;
};

export default function ProgressBar({
  currentStep,
  step1Completed,
  step2Completed,
  step3Completed,
  step1Active,
  step2Active,
  step3Active,
  onStepClick,
}: ProgressBarProps) {
  const handleStepClick = (step: number) => {
    if (onStepClick) {
      onStepClick(step);
    }
  };

  return (
    <div className={styles.progressBar}>
      <div
        className={styles.progressBarItem}
        onClick={() => handleStepClick(1)}
        style={{ cursor: 'pointer' }}
      >
        <div
          className={
            step1Completed
              ? `${styles.progressBarItemCircle} ${styles.completed}`
              : step1Active
                ? `${styles.progressBarItemCircle} ${styles.active}`
                : currentStep === 1
                  ? `${styles.progressBarItemCircle} ${styles.current}`
                  : styles.progressBarItemCircle
          }
        >
          {step1Completed ? '✓' : '1'}
        </div>
        <div>경기정보 & 팀선택</div>
      </div>
      <div
        className={styles.progressBarItem}
        onClick={() => handleStepClick(2)}
        style={{ cursor: 'pointer' }}
      >
        <div
          className={
            step2Completed
              ? `${styles.progressBarItemCircle} ${styles.completed}`
              : step2Active
                ? `${styles.progressBarItemCircle} ${styles.active}`
                : currentStep === 2
                  ? `${styles.progressBarItemCircle} ${styles.current}`
                  : styles.progressBarItemCircle
          }
        >
          {step2Completed ? '✓' : '2'}
        </div>
        <div>라인업등록</div>
      </div>
      <div
        className={styles.progressBarItem}
        onClick={() => handleStepClick(3)}
        style={{ cursor: 'pointer' }}
      >
        <div
          className={
            step3Completed
              ? `${styles.progressBarItemCircle} ${styles.completed}`
              : step3Active
                ? `${styles.progressBarItemCircle} ${styles.active}`
                : currentStep === 3
                  ? `${styles.progressBarItemCircle} ${styles.current}`
                  : styles.progressBarItemCircle
          }
        >
          {step3Completed ? '✓' : '3'}
        </div>
        <div>경기영상등록</div>
      </div>
    </div>
  );
}
