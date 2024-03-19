'use client';

import { CaretDownIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { clsx } from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import useLeagueTeams from '@/queries/useLeagueTeams';

import * as styles from './GameFilter.css';

export default function LeagueTeamFilter({ leagueId }: { leagueId: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { leagueTeams } = useLeagueTeams(leagueId);
  const selectedLeagueTeam = searchParams.get('leagueTeam')?.split(',') || [];

  if (!leagueTeams || !leagueTeams.length) return;

  const handleRouter = (selectedTeamId: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const teamIdParams = current.get('leagueTeam');
    const teamIds = teamIdParams?.split(',').map(Number) || [];

    const hasTeamId = teamIds.includes(selectedTeamId);
    const updatedTeamIds = hasTeamId
      ? teamIds.filter(id => id !== selectedTeamId)
      : [...teamIds, selectedTeamId].sort((a, b) => a - b);

    current.set('leagueTeam', updatedTeamIds.join(','));

    const query = current ? `?${current}` : '';

    router.push(`${pathname}${query}`);
  };

  return (
    <div className={styles.leagueTeam.wrapper}>
      <ul
        className={clsx(
          styles.leagueTeam.list,
          isExpanded && styles.leagueTeam.listExpand,
        )}
      >
        {leagueTeams.map(team => (
          <li key={team.leagueTeamId}>
            <button
              onClick={() => handleRouter(team.leagueTeamId)}
              className={clsx(
                styles.leagueTeam.item,
                selectedLeagueTeam.includes(team.leagueTeamId.toString()) &&
                  styles.leagueTeam.itemFocused,
              )}
            >
              {team.teamName}
            </button>
          </li>
        ))}
      </ul>
      <button
        className={clsx(
          styles.leagueTeam.expandButton,
          isExpanded && styles.leagueTeam.expandButtonFocused,
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Icon
          source={CaretDownIcon}
          className={clsx(
            styles.leagueTeam.expandButtonIcon,
            isExpanded && styles.leagueTeam.expandButtonIconFocused,
          )}
        />
      </button>
    </div>
  );
}
// 'use client';

// import { CaretDownIcon } from '@hcc/icons';
// import { Icon } from '@hcc/ui';
// import { clsx } from 'clsx';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { useState } from 'react';

// import useLeagueTeams from '@/queries/useLeagueTeams';

// import * as styles from './GameFilter.css';

// export default function LeagueTeamFilter({ leagueId }: { leagueId: number }) {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const pathname = usePathname();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const { leagueTeams } = useLeagueTeams(leagueId);
//   const selectedLeagueTeam = Number(searchParams.get('leagueTeam')) || -1;

//   if (!leagueTeams || !leagueTeams.length) return;

//   const handleRouter = (teamId: number) => {
//     const current = new URLSearchParams(Array.from(searchParams.entries()));
//     const currentTeamId = current.get('leagueTeam');

//     if (currentTeamId === teamId.toString()) {
//       current.delete('leagueTeam');
//     } else {
//       current.set('leagueTeam', teamId.toString());
//     }

//     const search = current.toString();
//     const query = search ? `?${search}` : '';

//     router.push(`${pathname}${query}`);
//   };

//   return (
//     <div className={styles.leagueTeam.wrapper}>
//       <ul
//         className={clsx(
//           styles.leagueTeam.list,
//           isExpanded && styles.leagueTeam.listExpand,
//         )}
//       >
//         {leagueTeams.map(team => (
//           <li
//             key={team.leagueTeamId}
//             className={clsx(
//               styles.leagueTeam.item,
//               team.leagueTeamId === selectedLeagueTeam &&
//                 styles.leagueTeam.itemFocused,
//             )}
//           >
//             <button onClick={() => handleRouter(team.leagueTeamId)}>
//               {team.teamName}
//             </button>
//           </li>
//         ))}
//       </ul>
//       <button
//         className={clsx(
//           styles.leagueTeam.expandButton,
//           isExpanded && styles.leagueTeam.expandButtonFocused,
//         )}
//         onClick={() => setIsExpanded(!isExpanded)}
//       >
//         <Icon
//           source={CaretDownIcon}
//           className={clsx(
//             styles.leagueTeam.expandButtonIcon,
//             isExpanded && styles.leagueTeam.expandButtonIconFocused,
//           )}
//         />
//       </button>
//     </div>
//   );
// }
