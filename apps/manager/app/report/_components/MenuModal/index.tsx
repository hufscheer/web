import { Modal } from '@hcc/ui';
import { ReactNode } from 'react';

import * as styles from './MenuModal.css';

type MenuModalProps = {
  type: 'block' | 'restore';
  content: string;
  onPositiveClick: () => void;
  children: ReactNode;
};

function useModalLabels(type: 'block' | 'restore') {
  const labels = {
    block: {
      ariaLabel: '차단모달 열기',
      alertMessage:
        '차단된 응원톡은 추후 복구할 수 있습니다. 위 응원톡을 차단하시겠습니까?',
    },
    restore: {
      ariaLabel: '복구모달 열기',
      alertMessage:
        '복구된 응원톡은 화면에 드러납니다. 위 응원톡을 복구하시겠습니까?',
    },
  };

  return labels[type];
}

export default function MenuModal({
  type,
  content,
  onPositiveClick,
  children,
}: MenuModalProps) {
  const { ariaLabel, alertMessage } = useModalLabels(type);

  return (
    <Modal>
      <Modal.Trigger aria-label={ariaLabel}>{children}</Modal.Trigger>
      <Modal.Content key="report-menu" className={styles.container}>
        <p className={styles.content}>{content}</p>
        <div className={styles.alert}>
          <p>{alertMessage}</p>
          <div className={styles.menuContainer}>
            <Modal.Close
              className={styles.positiveMenu}
              onClick={onPositiveClick}
            >
              예
            </Modal.Close>
            <Modal.Close className={styles.negativeMenu}>아니오</Modal.Close>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
}
