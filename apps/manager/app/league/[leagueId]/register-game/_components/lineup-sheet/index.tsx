// ! LineupSheet를 사용할 때 주석 제거해서 에러 없애기

// import { useLeagueTeamDetail } from '@hcc/api';
// import { CheckIcon } from '@hcc/icons';
// import {
//   BottomSheet,
//   BottomSheetContent,
//   BottomSheetDescription,
//   BottomSheetHeader,
//   BottomSheetTitle,
//   BottomSheetTrigger,
//   Button,
//   Icon,
//   ScrollArea,
// } from '@hcc/ui';
// import { ReactNode, useState } from 'react';
// import { UseFormReturn } from 'react-hook-form';

// import Divider from '@/components/Divider';

// import * as styles from './styles.css';
// import { RegisterGameFormSchema } from '../../page';

// type LineupSheetProps = {
//   methods: UseFormReturn<RegisterGameFormSchema>;
//   teamId: string;
//   children: ReactNode;
// };

// export default function LineupSheet({
//   methods,
//   teamId,
//   children,
// }: LineupSheetProps) {
//   const [open, setOpen] = useState(false);
//   const { data: teamDetail } = useLeagueTeamDetail(teamId);

//   const addPlayer = (playerId: string) => {
//     methods.setValue('playersOfTeam1', [
//       ...methods.getValues('playersOfTeam1'),
//       playerId,
//     ]);
//   };

//   return (
//     <BottomSheet open={open}>
//       <BottomSheetTrigger
//         asChild
//         onClick={e => {
//           e.stopPropagation();
//           setOpen(prev => !prev);
//         }}
//       >
//         {children}
//       </BottomSheetTrigger>
//       <BottomSheetContent className={styles.content}>
//         <BottomSheetHeader
//           className={styles.header}
//           style={{ display: 'flex' }}
//         >
//           <div className={styles.headerInfo}>
//             <BottomSheetTitle className={styles.title}>
//               라인업 수정
//             </BottomSheetTitle>
//             <BottomSheetDescription className={styles.description}>
//               {teamDetail.teamName}
//             </BottomSheetDescription>
//           </div>
//           <button className={styles.editButton}>편집</button>
//         </BottomSheetHeader>

//         <ScrollArea className={styles.scrollArea}>
//           <div className={styles.block}>
//             <h3 className={styles.division}>선발</h3>
//             <ul className={styles.playerList}>
//               {teamDetail.leagueTeamPlayers.map(player => (
//                 <li key={player.id}>
//                   <div className={styles.card}>{player.name}</div>
//                   <div className={styles.backNumber}>{player.number}</div>

//                   <Button asChild onClick={() => addPlayer(`${player.id}`)}>
//                     <Icon
//                       role="button"
//                       source={CheckIcon}
//                       width={24}
//                       height={24}
//                     />
//                   </Button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <Divider height={6} />

//           <div className={styles.block}>
//             <h3 className={styles.division}>후보</h3>
//             <ul className={styles.playerList}></ul>
//           </div>
//         </ScrollArea>
//       </BottomSheetContent>
//     </BottomSheet>
//   );
// }
