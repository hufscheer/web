import { ExclamationCircleFillIcon } from '@hcc/icons';
import { Icon, Dialog } from '@hcc/ui';
import { ReactNode } from 'react';

import useReportCheerTalkMutation from '@/queries/useReportCheerTalkMutation/query';

import * as styles from './CheerTalkMenuModal.css';

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

  const handleReportButton = (payload: { cheerTalkId: number }): void => {
    if (isSuccess) {
      alert('이미 신고했습니다!');

      return;
    }

    mutate(payload);
  };

  return (
    <Dialog>
      <Dialog.Trigger className={className}>{children}</Dialog.Trigger>
      <Dialog.Content className={styles.container}>
        <p className={styles.content}>{content}</p>
        <Dialog.Close
          className={styles.menuBlock}
          onClick={() => handleReportButton({ cheerTalkId })}
        >
          신고하기
          <Icon
            source={ExclamationCircleFillIcon}
            className={styles.menuIcon}
          />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog>
  );
};

export default CheerTalkMenuModal;
