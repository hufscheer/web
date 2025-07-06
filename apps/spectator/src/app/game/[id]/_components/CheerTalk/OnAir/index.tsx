import { AnimatePresence, motion } from 'motion/react';

import { GameCheerTalkWithTeamInfo } from '@/types/game';

import * as styles from './OnAir.css';
import CheerTalkFallback from '../Fallback';
import CheerTalkItem from '../Item';

type CheerTalkInRealProps = {
  cheerTalk: GameCheerTalkWithTeamInfo[];
};

export default function CheerTalkOnAir({ cheerTalk }: CheerTalkInRealProps) {
  if (!cheerTalk.length || !cheerTalk.at(-1)) return <CheerTalkFallback />;

  return (
    <AnimatePresence initial={false}>
      <motion.ul
        key={cheerTalk.at(-1)?.cheerTalkId}
        layout
        initial="initial"
        animate="enter"
        variants={{
          initial: { opacity: 0, y: 20 },
          enter: { opacity: 1, y: 0 },
        }}
        className={styles.billboard}
        transition={{
          y: { type: 'spring', stiffness: 200, damping: 20, mass: 0.2 },
          opacity: { duration: 0.2 },
        }}
      >
        <CheerTalkItem
          className={styles.onAirTalk}
          {...(cheerTalk.at(-1) as GameCheerTalkWithTeamInfo)}
        />
      </motion.ul>
    </AnimatePresence>
  );
}
