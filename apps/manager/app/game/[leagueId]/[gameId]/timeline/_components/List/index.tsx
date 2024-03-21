import { theme } from '@hcc/styles';
import { Box, Flex, Text } from '@mantine/core';
import { Fragment } from 'react';

import { useTimelineQuery } from '@/hooks/queries/useTimelineQuery';

import ReplacementItem from '../ReplacementItem';
import ScoreItem from '../ScoreItem';

type TimelineListProps = {
  gameId: string;
};

export default function TimelineList({ gameId }: TimelineListProps) {
  const { data: timelines, isLoading, error } = useTimelineQuery(gameId);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) throw new Error('문제가 발생했어요. 잠시 후 다시 시도해주세요!');

  return (
    <ul>
      {timelines?.map(timeline => (
        <li key={timeline.gameQuarter}>
          <Text mt="lg" mb="xs" c={theme.colors.gray[4]}>
            {timeline.gameQuarter}
          </Text>
          <Flex component="ul" direction="column" gap="xs">
            {!timeline.records.length ? (
              <Box
                component="li"
                key={timeline.gameQuarter + 'none'}
                w="100%"
                ta="center"
              >
                등록된 타임라인이 없습니다.
              </Box>
            ) : (
              timeline.records.map(record => (
                <Fragment key={record.recordId}>
                  {record.type === 'SCORE' && (
                    <ScoreItem quarter={timeline.gameQuarter} {...record} />
                  )}
                  {record.type === 'REPLACEMENT' && (
                    <ReplacementItem
                      quarter={timeline.gameQuarter}
                      {...record}
                    />
                  )}
                </Fragment>
              ))
            )}
          </Flex>
        </li>
      ))}
    </ul>
  );
}
