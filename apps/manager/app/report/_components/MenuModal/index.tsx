import { Modal } from '@hcc/ui';
import { clsx } from 'clsx';
import { ReactNode } from 'react';

import useReportBlockMutation from '@/hooks/mutations/useReportBlockMutation';

import * as styles from './MenuModal.css';

type MenuModalProps = {
  className: string;
  cheerTalkId: number;
  type: 'block' | 'restore';
  content: string;
  children: ReactNode;
};

export default function MenuModal({
  className,
  cheerTalkId,
  type,
  content,
  children,
}: MenuModalProps) {
  const { mutate: reportBlockMutation } = useReportBlockMutation();

  const handleReportButton = async (payload: { cheerTalkId: number }) => {
    reportBlockMutation(payload);
  };

  const handleRestoreButton = async (payload: { cheerTalkId: number }) => {
    reportBlockMutation(payload);
  };

  return (
    <Modal>
      <Modal.Trigger
        className={className}
        aria-label={`${type === 'block' ? '차단' : '복구'}모달 열기`}
      >
        {children}
      </Modal.Trigger>
      <Modal.Content key="cheer-talk-menu" className={styles.container}>
        <p className={styles.content}>{content}</p>
        <div className={clsx(styles.content, styles.alert)}>
          <p
            dangerouslySetInnerHTML={{
              __html:
                type === 'block'
                  ? '차단된 응원톡은 추후 복구할 수 있습니다.<br/>위 응원톡을 차단하시겠습니까?'
                  : '복구된 응원톡은 화면에 드러납니다.<br/>위 응원톡을 복구하시겠습니까?',
            }}
          />
          <div className={styles.menuContainer}>
            <Modal.Close
              style={{ flex: '1' }}
              onClick={() =>
                type === 'block'
                  ? handleReportButton({ cheerTalkId })
                  : handleRestoreButton({ cheerTalkId })
              }
            >
              <div className={styles.positiveMenu}>예</div>
            </Modal.Close>
            <Modal.Close style={{ flex: '1' }}>
              <div className={styles.negativeMenu}>아니오</div>
            </Modal.Close>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
}
