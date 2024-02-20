import { ExclamationCircleFillIcon } from '@hcc/icons';
import { Icon, Modal } from '@hcc/ui';

import useReportCheerTalkMutation from '@/queries/useReportCheerTalkMutation/query';

import * as styles from './CheerTalkMenuModal.css';

interface CheerTalkMenuModalProps {
  cheerTalkId: number;
  content: string;
  isOpen: boolean;
  onClose: () => void;
}

const CheerTalkMenuModal = ({
  cheerTalkId,
  content,
  isOpen,
  onClose,
}: CheerTalkMenuModalProps) => {
  const { mutate, isSuccess } = useReportCheerTalkMutation();

  const handleReportButton = (payload: { cheerTalkId: number }): void => {
    if (isSuccess) {
      alert('이미 신고했습니다!');
      return;
    }

    mutate(payload);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <p className={styles.content}>{content}</p>
        <button
          className={styles.menuBlock}
          onClick={() => handleReportButton({ cheerTalkId })}
        >
          신고하기
          <Icon
            source={ExclamationCircleFillIcon}
            className={styles.menuIcon}
          />
        </button>
      </div>
    </Modal>
  );
};

export default CheerTalkMenuModal;
