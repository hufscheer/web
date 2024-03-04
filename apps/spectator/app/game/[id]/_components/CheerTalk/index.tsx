import { useState } from 'react';

import CheerTalkModal from '@/app/game/[id]/_components/CheerTalk/Modal';
import CheerTalkOnAir from '@/app/game/[id]/_components/CheerTalk/OnAir';
import useSocket from '@/hooks/useSocket';
import useCheerTalkById from '@/queries/useCheerTalkById';
import useGameById from '@/queries/useGameById';
import { GameCheerTalkType, GameCheerTalkWithTeamInfo } from '@/types/game';

type CheerTalkItemProps = {
  gameId: string;
};

export default function CheerTalk({ gameId }: CheerTalkItemProps) {
  const [socketTalkList, setSocketTalkList] = useState<
    GameCheerTalkWithTeamInfo[]
  >([]);

  const { gameDetail } = useGameById(gameId);
  const getTeamInfo = (gameTeamId: number) => {
    const order = gameDetail.gameTeams.findIndex(
      team => team.gameTeamId === gameTeamId,
    );

    return {
      direction: (['left', 'right'] as const)[order],
      logoImageUrl: gameDetail.gameTeams[order].logoImageUrl,
    };
  };

  const { cheerTalkList, ...rest } = useCheerTalkById(gameId);

  const handleSocketMessage = (cheerTalk: GameCheerTalkType) => {
    if (cheerTalk) {
      const teamInfo = getTeamInfo(cheerTalk.gameTeamId);
      setSocketTalkList(prev => [...prev, { ...cheerTalk, ...teamInfo }]);
    }
  };

  const { connect } = useSocket({
    url: 'wss://api.hufstreaming.site/ws',
    destination: `/topic/games/${gameId}`,
    callback: handleSocketMessage,
  });

  connect();

  return (
    <div>
      <CheerTalkOnAir cheerTalk={socketTalkList[socketTalkList.length - 1]} />
      <CheerTalkModal
        gameId={gameId}
        cheerTalkList={cheerTalkList.pages}
        socketTalkList={socketTalkList}
        {...rest}
      />
    </div>
  );
}
