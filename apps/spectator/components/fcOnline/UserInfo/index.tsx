import { divisionMap } from '@/constants/divisionRank';
import { FconlineLineupType } from '@/queries/useFconlineLineupById/Fetcher';

import * as styles from './UserInfo.css';

export default function FconlineUserLineup({
  userInfos,
}: {
  userInfos: FconlineLineupType[];
}) {
  return (
    <div className={styles.FconlineUserLineup.frame}>
      {userInfos.map(info => (
        <div key={info.accessId} className={styles.FconlineUserLineup.frame}>
          <div className={styles.FconlineUserLineup.playerName}>
            <span style={{ fontWeight: 700 }}>{info.teamName}</span>
            <span>선수 👊</span>
          </div>
          <div className={styles.FconlineUserLineup.element}>
            <span className={styles.FconlineUserLineup.elementTitle}>
              NICKNAME
            </span>
            <div>{info.nickname}</div>
          </div>
          <div className={styles.FconlineUserLineup.element}>
            <span className={styles.FconlineUserLineup.elementTitle}>
              LEVEL
            </span>
            <div>LV. {info.level}</div>
          </div>
          <div className={styles.FconlineUserLineup.element}>
            <span className={styles.FconlineUserLineup.elementTitle}>RANK</span>
            <div>{divisionMap.get(info.division)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
