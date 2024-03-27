import { DirectionIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { ActionIcon, Badge, Flex, Text } from '@mantine/core';

import Card from '@/components/Card';
import { GameLineupType } from '@/types/game';

type PlayerCardProps = {
  removable?: boolean;
  player: GameLineupType;
  handleCaptain: (leagueTeamPlayerId: number) => void;
  handleClickAction: (player: GameLineupType) => void;
};

export default function PlayerCard({
  removable = false,
  player,
  handleCaptain,
  handleClickAction,
}: PlayerCardProps) {
  return (
    <Card.Root>
      <Card.Content flex={1} justify="space-between" align="center">
        <Flex gap="xl" align="center">
          <Card.Title>{player.name}</Card.Title>
          <Badge
            style={{ cursor: 'pointer' }}
            color={player.isCaptain ? 'blue' : 'gray'}
            variant="filled"
            onClick={() => handleCaptain(player.leagueTeamPlayerId)}
          >
            주장
          </Badge>
        </Flex>
        <Flex gap="md" align="center">
          <Text>{player.number}</Text>
          <ActionIcon
            variant="subtle"
            color="blue"
            onClick={() => handleClickAction(player)}
          >
            <Icon
              source={DirectionIcon}
              color={removable ? 'error' : 'success'}
              transform={removable ? 'rotate(180)' : 'rotate(0)'}
            />
          </ActionIcon>
        </Flex>
      </Card.Content>
    </Card.Root>
  );
}
