import { motion, AnimatePresence } from 'framer-motion';

import { GameCheerTalkWithTeamInfo } from '@/types/game';

import * as styles from './OnAir.css';
import CheerTalkFallback from '../Fallback';
import CheerTalkItem from '../Item';

type CheerTalkInRealProps = {
  cheerTalk: GameCheerTalkWithTeamInfo[];
};

export default function CheerTalkOnAir({ cheerTalk }: CheerTalkInRealProps) {
  if (!cheerTalk.length || !cheerTalk.at(-1)) return <CheerTalkFallback />;

  const transition = {
    type: 'spring',
    stiffness: 200,
    mass: 0.2,
    damping: 20,
  };

  const variants = {
    initial: {
      opacity: 0,
      y: 300,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition,
    },
  };

  return (
    <AnimatePresence initial={false}>
      <ol className={styles.billboard}>
        <motion.div
          key={cheerTalk.at(-1)?.cheerTalkId}
          initial="initial"
          animate="enter"
          variants={variants}
          transition={{
            y: { type: 'spring', stiffness: 200, damping: 20, mass: 0.2 },
            opacity: { duration: 0.2 },
          }}
          layout
        >
          <CheerTalkItem {...(cheerTalk.at(-1) as GameCheerTalkWithTeamInfo)} />
        </motion.div>
      </ol>
    </AnimatePresence>
  );
}
