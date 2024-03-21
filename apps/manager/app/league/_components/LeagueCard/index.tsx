import { CaretDownIcon, SubtractIcon } from '@hcc/icons';
import { Icon, Modal } from '@hcc/ui';
import { Box, Flex, Title } from '@mantine/core';
import Link from 'next/link';

import Card from '@/components/Card';
import useDeleteLeagueMutation from '@/hooks/mutations/useDeleteLeagueMutation';
import useLeagueQuery from '@/hooks/queries/useLeagueQuery';
import { StateType, stateMap } from '@/types/game';
import { formatTime } from '@/utils/time';

import * as styles from './LeagueCard.css';

type LeagueCardProps = {
  state: StateType;
  edit: boolean;
};

const alertMessage =
  '삭제된 대회는 이후 복구할 수 없습니다.\n삭제하시겠습니까?';

export default function LeagueCard({ state, edit }: LeagueCardProps) {
  const { data: leagues, refetch } = useLeagueQuery();

  const { mutate: mutateDeleteLeague } = useDeleteLeagueMutation();

  const handleDelete = async (leagueId: number) => {
    mutateDeleteLeague(
      { leagueId },
      {
        onSuccess: () => refetch(),
      },
    );
  };

  return (
    <>
      <Title order={2} className={styles.title}>
        {stateMap[state]}
      </Title>
      {!leagues?.[state] ? (
        <Box>{stateMap[state]} 경기가 없습니다.</Box>
      ) : (
        <Flex direction="column" gap="xs">
          {leagues[state].map(league => (
            <Card.Root key={league.leagueId}>
              {edit ? (
                <Card.Content>
                  <div className={styles.content}>
                    <Card.Title text="semibold">{league.name}</Card.Title>
                    <Card.SubContent>
                      {formatTime(league.startAt, 'YYYY.MM.DD')}-
                      {formatTime(league.endAt, 'YYYY.MM.DD')}
                    </Card.SubContent>
                  </div>

                  <Modal>
                    <Modal.Trigger>
                      <Icon source={SubtractIcon} color="error" />
                    </Modal.Trigger>
                    <Modal.Content
                      key="report-menu"
                      className={styles.modalContainer}
                    >
                      <div className={styles.modalContent}>
                        <p className={styles.leagueName}>{league.name}</p>
                        <p className={styles.leagueDate}>
                          {formatTime(league.startAt, 'YYYY.MM.DD')}-
                          {formatTime(league.endAt, 'YYYY.MM.DD')}
                        </p>
                      </div>
                      <div className={styles.alert}>
                        <p>{alertMessage}</p>
                        <div className={styles.menuContainer}>
                          <Modal.Close
                            className={styles.positiveMenu}
                            onClick={() => handleDelete(league.leagueId)}
                          >
                            예
                          </Modal.Close>
                          <Modal.Close className={styles.negativeMenu}>
                            아니오
                          </Modal.Close>
                        </div>
                      </div>
                    </Modal.Content>
                  </Modal>
                </Card.Content>
              ) : (
                <Card.Content
                  component={Link}
                  href={`/league/${league.leagueId}`}
                >
                  <div className={styles.content}>
                    <Card.Title text="semibold">{league.name}</Card.Title>
                    <Card.SubContent>
                      {formatTime(league.startAt, 'YYYY.MM.DD')}-
                      {formatTime(league.endAt, 'YYYY.MM.DD')}
                    </Card.SubContent>
                  </div>
                  <Icon source={CaretDownIcon} className={styles.caret} />
                </Card.Content>
              )}
            </Card.Root>
          ))}
        </Flex>
      )}
    </>
  );
}
