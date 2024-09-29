import { AddCircleIcon, SettingsIcon, TradeIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';

import * as styles from './styles.css';
import { ScoreForm, ReplacementForm, ProgressForm } from '../Form';
import FormBottomSheet from '../FormBottomSheet';

type BottomMenuProps = {
  gameId: string;
};

const BottomMenu = ({ gameId }: BottomMenuProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <FormBottomSheet
          title="득점 추가"
          icon={<Icon source={AddCircleIcon} color="blue" />}
          form={<ScoreForm gameId={gameId} />}
        />
        <FormBottomSheet
          title="교체 추가"
          icon={<Icon source={TradeIcon} />}
          form={<ReplacementForm gameId={gameId} />}
        />
        <FormBottomSheet
          title="상태 변경"
          icon={<Icon source={SettingsIcon} color="secondary" />}
          form={<ProgressForm gameId={gameId} />}
        />
      </div>
    </div>
  );
};

export default BottomMenu;
