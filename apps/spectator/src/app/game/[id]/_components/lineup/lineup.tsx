import { Fragment } from 'react';

import { Candidate } from './candidate';
import { Ground } from './ground';
import * as styles from './styles.css';

type LineupProps = {
  gameId: string;
};

export const Lineup = ({ gameId }: LineupProps) => {
  return (
    <Fragment>
      <Ground gameId={gameId} />
      <hr className={styles.divider} />
      <Candidate gameId={gameId} />
    </Fragment>
  );
};
