import { AddCircleIcon, SettingsIcon, TradeIcon } from '@hcc/icons';
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
  Icon,
} from '@hcc/ui';

import * as styles from './TimelineMenu.css';

const BottomMenu = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <BottomSheet>
          <BottomSheetTrigger asChild>
            <button className={styles.controlButton}>
              <Icon source={AddCircleIcon} color="blue" />
              득점 추가
            </button>
          </BottomSheetTrigger>
          <BottomSheetContent>
            <BottomSheetHeader>
              <BottomSheetTitle>득점 추가</BottomSheetTitle>
            </BottomSheetHeader>
            <BottomSheetDescription>
              <p>상황</p>
              <p>득점 상세 정보</p>
            </BottomSheetDescription>
          </BottomSheetContent>
        </BottomSheet>
        <button className={styles.controlButton}>
          <Icon source={TradeIcon} />
          교체 추가
        </button>
        <button className={styles.controlButton}>
          <Icon source={SettingsIcon} color="secondary" />
          상태 변경
        </button>
      </div>
    </div>
  );
};

export default BottomMenu;
