import { WhistlingIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';

import { errorFallback } from './styles.css';

function GameListErrorFallback({ message }: { message: string }) {
  return (
    <div className={errorFallback.root}>
      <Icon source={WhistlingIcon} size="lg" />
      <span className={errorFallback.message}>{message}</span>
    </div>
  );
}

export function PlayingGameListErrorFallback() {
  return <GameListErrorFallback message="진행 중인 경기를 불러오는데 실패했어요." />;
}

export function ScheduledGameListErrorFallback() {
  return <GameListErrorFallback message="예정된 경기를 불러오는데 실패했어요." />;
}

export function FinishedGameListErrorFallback() {
  return <GameListErrorFallback message="종료된 경기를 불러오는데 실패했어요." />;
}

export function GameCardErrorFallback() {
  return <GameListErrorFallback message="경기 정보를 불러오는데 실패했어요." />;
}
