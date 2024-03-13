import MenuModal from '@/app/league/report/_components/MenuModal';
import Card from '@/components/Card';

import * as styles from './CheerTalkCard.css';

type CheerTalkCardProps = {
  type: 'pending' | 'isBlocked';
  caption?: string;
};

export default function CheerTalkCard({ type, caption }: CheerTalkCardProps) {
  // const { data: reports } = useReportQuery();

  return (
    <>
      <p className={styles.title}>{type === 'pending' ? '보류' : '차단'}</p>
      <div className={styles.wrapper}>
        <Card.Root paddingVertical="sm">
          <div className={styles.card.container}>
            <Card.Content>
              <div className={styles.card.content}>
                <Card.Title text="semibold">타이틀</Card.Title>
                <Card.SubContent>서브타이틀</Card.SubContent>
              </div>
            </Card.Content>
            <MenuModal
              className={styles.card.menu}
              cheerTalkId={1}
              type="restore"
              content="내용"
            >
              복구
            </MenuModal>
            <MenuModal
              className={styles.card.menu}
              cheerTalkId={1}
              type="block"
              content="내용"
            >
              차단
            </MenuModal>
          </div>
        </Card.Root>
      </div>
      {caption && <p className={styles.caption}>{caption}</p>}
    </>
  );
}
