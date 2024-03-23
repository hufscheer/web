import { GameCheerTalkWithTeamInfo } from '@/types/game';

import CheerTalkFallback from '../Fallback';
import CheerTalkItem from '../Item';

type CheerTalkInRealProps = {
  cheerTalk: GameCheerTalkWithTeamInfo[];
};

export default function CheerTalkOnAir({ cheerTalk }: CheerTalkInRealProps) {
  if (!cheerTalk.length || !cheerTalk.at(-1)) return <CheerTalkFallback />;

  return <CheerTalkItem {...(cheerTalk.at(-1) as GameCheerTalkWithTeamInfo)} />;
}
