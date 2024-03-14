import { HoldIcon, RestoreIcon, UnholdIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { useMemo } from 'react';

import Card from '@/components/Card';
import useBlockReportMutation from '@/hooks/mutations/useBlockReportMutation';
import useRestoreReportMutation from '@/hooks/mutations/useRestoreReportMutation';
import useReportsQuery from '@/hooks/queries/useReportsQuery';

import * as styles from './CardList.css';
import MenuModal from '../MenuModal';

type CardListProps = {
  type: 'pending' | 'isBlocked';
  caption?: string;
};

export default function CardList({ type, caption }: CardListProps) {
  const { data: reports, refetch } = useReportsQuery();
  const { mutate: blockReportMutation } = useBlockReportMutation();
  const { mutate: restoreReportMutation } = useRestoreReportMutation();

  const filteredReports = useMemo(
    () => (type === 'pending' ? reports?.pending : reports?.isBlocked),
    [type, reports],
  );

  const handleBlock = async (cheerTalkId: number) => {
    blockReportMutation({ cheerTalkId }, { onSuccess: () => refetch() });
  };

  const handleRestore = async (cheerTalkId: number) => {
    restoreReportMutation({ cheerTalkId }, { onSuccess: () => refetch() });
  };

  return (
    <section>
      <p className={styles.title}>
        {type === 'pending' ? '보류 중' : '차단됨'}
      </p>
      {filteredReports &&
        filteredReports.map(({ reportInfo, gameInfo }) => (
          <div key={reportInfo.cheerTalkId} className={styles.wrapper}>
            <Card.Root paddingVertical="sm">
              <div className={styles.card.container}>
                <Card.Content>
                  <div className={styles.card.content}>
                    <Card.Title text="semibold">
                      {reportInfo.content}
                    </Card.Title>
                    <Card.SubContent>
                      {`${gameInfo.leagueName} > ${gameInfo.gameName}`}
                    </Card.SubContent>
                  </div>
                </Card.Content>
                <div className={styles.card.menu}>
                  <MenuModal
                    type={'restore'}
                    content={reportInfo.content}
                    onPositiveClick={() =>
                      handleRestore(reportInfo.cheerTalkId)
                    }
                  >
                    <Icon
                      source={type === 'pending' ? UnholdIcon : RestoreIcon}
                      color={type === 'pending' ? 'primary' : 'gray'}
                      size="xs"
                    />
                  </MenuModal>
                  {type === 'pending' && (
                    <MenuModal
                      type="block"
                      content={reportInfo.content}
                      onPositiveClick={() =>
                        handleBlock(reportInfo.cheerTalkId)
                      }
                    >
                      <Icon source={HoldIcon} size="xs" color="error" />
                    </MenuModal>
                  )}
                </div>
              </div>
            </Card.Root>
          </div>
        ))}
      {caption && <p className={styles.caption}>{caption}</p>}
    </section>
  );
}
