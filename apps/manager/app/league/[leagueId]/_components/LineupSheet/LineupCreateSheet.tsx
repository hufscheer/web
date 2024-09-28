import { useLeagueTeamDetail } from '@hcc/api';
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
import { ReactNode, useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import Divider from '@/components/Divider';

import * as styles from './styles.css';
import { GameFormSchema } from '../../_components/GameForm';

type LineupCreateSheetProps = {
  methods: UseFormReturn<GameFormSchema>;
  teamId: string;
  fieldName: 'playersOfTeam1' | 'playersOfTeam2';
  children: ReactNode;
};

export const LineupCreateSheet = ({
  methods,
  teamId,
  fieldName,
  children,
}: LineupCreateSheetProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const { data: teamDetail } = useLeagueTeamDetail(teamId);

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: fieldName,
  });

  const handleSelectAll = () => {
    teamDetail.leagueTeamPlayers
      .filter(p => !fields.some(selected => selected.name === p.name))
      .forEach(player => {
        append({
          name: player.name,
          number: player.number.toString(),
          isCaptain: false,
        });
      });
  };

  const handleCaptainToggle = (index: number) => {
    const currentCaptain = fields.find(field => field.isCaptain);

    if (currentCaptain && !fields[index].isCaptain) {
      toast({ title: '주장은 한 명만 선택 가능해요.', variant: 'destructive' });
      return;
    }

    const updatedFields = fields.map((field, i) => {
      if (i === index) return { ...field, isCaptain: !field.isCaptain };
      return field;
    });
    methods.setValue(fieldName, updatedFields);
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
        {children}
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
              {teamDetail.teamName}
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
            {fields.map((player, index) => (
              <li className={styles.playerItem} key={player.name}>
                <div className={styles.card}>
                  <button onClick={() => handleCaptainToggle(index)}>
                    <Icon
                      role="button"
                      source={CaptainIcon}
                      width={24}
                      height={24}
                      color={player.isCaptain ? 'orange' : 'lightgray'}
                    />
                  </button>
                  {player.name}
                </div>
                <div className={styles.backNumber}>{player.number}</div>

                <button
                  onClick={() => {
                    remove(fields.findIndex(f => f.name === player.name));
                  }}
                >
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
              onClick={handleSelectAll}
            >
              모두 선발로 올리기
            </button>
          </div>
          <ul className={styles.playerList}>
            {teamDetail.leagueTeamPlayers
              .filter(p => !fields.some(selected => selected.name === p.name))
              .map(player => (
                <li className={styles.playerItem} key={player.name}>
                  <div className={styles.card}>{player.name}</div>
                  <div className={styles.backNumber}>{player.number}</div>

                  <button
                    onClick={() => {
                      append({
                        name: player.name,
                        number: player.number.toString(),
                        isCaptain: false,
                      });
                    }}
                  >
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
