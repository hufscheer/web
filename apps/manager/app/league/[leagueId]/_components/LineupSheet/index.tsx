import {
  useGameLineup,
  useGameLineupPlaying,
  GameTeamPlayerType,
  useUpdateLineupStarter,
  useUpdateLineupCandidate,
  useUpdateLineupCaptainRegister,
  useUpdateLineupCaptainRevoke,
  useGame,
} from '@hcc/api';
import {
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
  CaptainIcon,
} from '@hcc/icons';
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
  Icon,
  useToast,
} from '@hcc/ui';
import { useState } from 'react';

import Divider from '@/components/Divider';

import * as styles from './styles.css';
import LineupBadge from '../LineupBadge';

type LineupUpdateSheetProps = {
  gameId: string;
  teamId: string;
};

const LineupSheet = ({ gameId, teamId }: LineupUpdateSheetProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);

  const { data: game } = useGame(gameId);
  const { data: lineupList } = useGameLineup(gameId);
  const { data: lineupPlayingList } = useGameLineupPlaying(gameId);

  const teamName: string =
    game?.gameTeams.find(gameTeam => gameTeam.gameTeamId === Number(teamId))
      ?.gameTeamName || '';

  const currentLineup = lineupList?.find(
    lineup => lineup.gameTeamId === Number(teamId),
  );

  const currentPlayingLineup: GameTeamPlayerType[] =
    lineupPlayingList?.find(lineup => lineup.gameTeamId === Number(teamId))
      ?.gameTeamPlayers || [];

  const candidateLineup: GameTeamPlayerType[] =
    currentLineup?.gameTeamPlayers.filter(
      player => !currentPlayingLineup.some(p => p.id === player.id),
    ) || [];

  const {
    mutate: updateLineupCaptainRegister,
    isPending: isCaptainRegisterPending,
  } = useUpdateLineupCaptainRegister();
  const {
    mutate: updateLineupCaptainRevoke,
    isPending: isCaptainRevokePending,
  } = useUpdateLineupCaptainRevoke();
  const handleChangeCaptain = (playerId: number, isCaptain: boolean) => {
    if (isCaptain) {
      if (isCaptainRevokePending)
        return toast({
          title: '주장 해제 중입니다. 잠시만 기다려주세요.',
          variant: 'destructive',
        });

      updateLineupCaptainRevoke(
        { gameId, lineupPlayerId: playerId },
        {
          onSuccess: () =>
            toast({ title: '라인업 수정 완료', variant: 'destructive' }),
        },
      );
    } else {
      if (isCaptainRegisterPending)
        return toast({
          title: '주장 등록 중입니다. 잠시만 기다려주세요.',
          variant: 'destructive',
        });

      updateLineupCaptainRegister(
        { gameId, lineupPlayerId: playerId },
        {
          onSuccess: () =>
            toast({ title: '라인업 수정 완료', variant: 'destructive' }),
          onError: () =>
            toast({
              title: '주장은 한 명만 선택 가능해요',
              variant: 'destructive',
            }),
        },
      );
    }
  };

  const { mutate: updateLineupStarter, isPending: isLineupStarterPending } =
    useUpdateLineupStarter();
  const handleChangePlaying = (playerId: number) => {
    if (isLineupStarterPending)
      return toast({
        title: '선발 등록 중입니다. 잠시만 기다려주세요.',
        variant: 'destructive',
      });

    updateLineupStarter(
      { gameId, lineupPlayerId: playerId },
      {
        onSuccess: () =>
          toast({ title: '라인업 수정 완료', variant: 'destructive' }),
      },
    );
  };

  const { mutate: updateLineupCandidate, isPending: isLineupCandidatePending } =
    useUpdateLineupCandidate();
  const handleChangeCandidate = (playerId: number) => {
    if (isLineupCandidatePending)
      return toast({
        title: '선발 해제 중입니다. 잠시만 기다려주세요.',
        variant: 'destructive',
      });

    updateLineupCandidate(
      { gameId, lineupPlayerId: playerId },
      {
        onSuccess: () =>
          toast({ title: '라인업 수정 완료', variant: 'destructive' }),
      },
    );
  };

  const handleAllCandidatesToStarting = () => {
    Promise.all(
      candidateLineup.map(player =>
        updateLineupStarter({ gameId, lineupPlayerId: player.id }),
      ),
    )
      .then(() => toast({ title: '라인업 수정 완료', variant: 'destructive' }))
      .catch(() => {
        toast({
          title: '라인업 수정 중 오류가 발생했습니다',
          variant: 'destructive',
        });
      });
  };

  return (
    <BottomSheet open={open} onOpenChange={setOpen}>
      <BottomSheetTrigger
        asChild
        onClick={e => {
          e.stopPropagation();
          setOpen(prev => !prev);
        }}
      >
        <button className={styles.triggerBadgeContainer} type="button">
          <LineupBadge checked={currentPlayingLineup.length > 0} />
        </button>
      </BottomSheetTrigger>
      <BottomSheetContent className={styles.content}>
        <BottomSheetHeader
          className={styles.header}
          style={{ display: 'flex' }}
        >
          <div className={styles.headerInfo}>
            <BottomSheetTitle className={styles.title}>
              라인업 수정
            </BottomSheetTitle>
            <BottomSheetDescription className={styles.description}>
              {teamName}
            </BottomSheetDescription>
          </div>
          <button className={styles.editButton} onClick={() => setOpen(false)}>
            완료
          </button>
        </BottomSheetHeader>
        <Divider height={1} />

        <section className={styles.section}>
          <h3 className={styles.division}>선발</h3>
          <ul className={styles.playerList}>
            {currentPlayingLineup.map(player => (
              <li className={styles.playerItem} key={player.id}>
                <div className={styles.card}>
                  <button
                    onClick={() =>
                      handleChangeCaptain(player.id, player.isCaptain)
                    }
                  >
                    <Icon
                      role="button"
                      source={CaptainIcon}
                      width={24}
                      height={24}
                      color={player.isCaptain ? 'orange' : 'lightgray'}
                    />
                  </button>
                  {player.playerName}
                </div>
                <div className={styles.backNumber}>{player.number}</div>

                <button onClick={() => handleChangeCandidate(player.id)}>
                  <Icon
                    role="button"
                    source={ArrowCircleDownIcon}
                    width={24}
                    height={24}
                    color="gray"
                  />
                </button>
              </li>
            ))}
          </ul>

          <Divider height={6} />

          <div className={styles.division}>
            <h3>후보</h3>
            <button
              className={styles.selectAllButton}
              onClick={handleAllCandidatesToStarting}
            >
              모두 선발로 올리기
            </button>
          </div>
          <ul className={styles.playerList}>
            {candidateLineup.map(player => (
              <li className={styles.playerItem} key={player.id}>
                <div className={styles.card}>{player.playerName}</div>
                <div className={styles.backNumber}>{player.number}</div>

                <button onClick={() => handleChangePlaying(player.id)}>
                  <Icon
                    role="button"
                    source={ArrowCircleUpIcon}
                    width={24}
                    height={24}
                    color="green"
                  />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </BottomSheetContent>
    </BottomSheet>
  );
};

export default LineupSheet;
