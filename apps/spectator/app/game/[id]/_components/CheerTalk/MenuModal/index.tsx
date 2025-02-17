import { useCreateCheerTalkReport } from '@hcc/api';
import { ExclamationCircleFillIcon } from '@hcc/icons';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  Icon,
} from '@hcc/ui';
import { ReactNode } from 'react';

import * as styles from './MenuModal.css';

type CheerTalkMenuModalProps = {
  cheerTalkId: number;
  content: string;
  className: string;
  children: ReactNode;
};

const CheerTalkMenuModal = ({
  cheerTalkId,
  content,
  className,
  children,
}: CheerTalkMenuModalProps) => {
  const { mutate, isSuccess } = useCreateCheerTalkReport();

  const handleReportButton = async (payload: { cheerTalkId: number }) => {
    if (isSuccess) {
      alert('이미 신고했습니다!');
      return;
    }
    mutate(payload);
  };

  return (
    <Dialog>
      <DialogOverlay />
      <DialogTrigger className={className} aria-label="응원톡 모달 열기">
        {children}
      </DialogTrigger>
      <DialogContent className={styles.container} aria-describedby={undefined}>
        <DialogTitle>{content}</DialogTitle>
        <DialogClose className={styles.menuClose} />
        <DialogClose asChild>
          <button
            className={styles.menuBlock}
            onClick={() => handleReportButton({ cheerTalkId })}
          >
            신고하기
            <Icon
              source={ExclamationCircleFillIcon}
              className={styles.menuIcon}
              aria-label="응원톡 신고"
            />
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default CheerTalkMenuModal;
