import { ExclamationCircleFillIcon } from '@hcc/icons';
import { Icon, Modal } from '@hcc/ui';
import { ReactNode } from 'react';

import useReportCheerTalkMutation from '@/queries/useReportCheerTalkMutation/query';

import * as styles from './MenuModal.css';

interface CheerTalkMenuModalProps {
  cheerTalkId: number;
  content: string;
  className: string;
  children: ReactNode;
}

const CheerTalkMenuModal = ({
  cheerTalkId,
  content,
  className,
  children,
}: CheerTalkMenuModalProps) => {
  const { mutate, isSuccess } = useReportCheerTalkMutation();

  const handleReportButton = async (payload: { cheerTalkId: number }) => {
    if (isSuccess) {
      alert('이미 신고했습니다!');

      return;
    }

    mutate(payload);
  };

  return (
    <Modal>
      <Modal.Trigger className={className}>{children}</Modal.Trigger>
      <Modal.Content className={styles.container}>
        <p className={styles.content}>{content}</p>
        <Modal.Close
          className={styles.menuBlock}
          onClick={() => handleReportButton({ cheerTalkId })}
        >
          신고하기
          <Icon
            source={ExclamationCircleFillIcon}
            className={styles.menuIcon}
          />
        </Modal.Close>
      </Modal.Content>
    </Modal>
  );
};

export default CheerTalkMenuModal;
