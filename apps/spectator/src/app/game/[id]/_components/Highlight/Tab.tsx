import { useGameVideo, useGame } from '@hcc/api';
import { Tabs, Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import { useEffect, useMemo, useState, useCallback } from 'react';

import * as styles from '../../page.css';

const TOOLTIP_TEXT = {
  FINISHED: '게임의 하이라이트가 등록되었어요',
  IN_PROGRESS: '실시간 경기 영상을 시청하세요!',
} as const;

type TabState = 'active' | 'inactive';

const HighlightTabContent = ({ gameId }: { gameId: string }) => {
  const { data: videoData } = useGameVideo(gameId);
  const { data: gameData } = useGame(gameId);
  const isGameInProgress = gameData?.state === 'PLAYING';
  const hasVideoLink = Boolean(videoData?.videoId);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipKey = useMemo(() => {
    return hasVideoLink ? `highlight_tooltip_${gameId}_${videoData?.videoId}` : '';
  }, [hasVideoLink, gameId, videoData?.videoId]);
  useEffect(() => {
    if (hasVideoLink && tooltipKey) {
      const hasShownTooltip = localStorage.getItem(tooltipKey);
      setShowTooltip(!hasShownTooltip);
    }
  }, [hasVideoLink, tooltipKey]);
  const handleTabClick = useCallback(() => {
    if (showTooltip && tooltipKey) {
      localStorage.setItem(tooltipKey, 'true');
      setShowTooltip(false);
    }
  }, [showTooltip, tooltipKey]);
  return (
    <Tooltip open={showTooltip}>
      <TooltipTrigger asChild onClick={handleTabClick}>
        <div>
          <Tabs.Trigger value="highlight" className={(state: TabState) => styles.item[state]}>
            경기 영상
          </Tabs.Trigger>
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={-12} align="end" alignOffset={32}>
        {isGameInProgress ? TOOLTIP_TEXT.IN_PROGRESS : TOOLTIP_TEXT.FINISHED}
        <TooltipArrow />
      </TooltipContent>
    </Tooltip>
  );
};

const TabsTriggerFallback = () => (
  <Tabs.Trigger value="highlight" className={(state: TabState) => styles.item[state]}>
    경기 영상
  </Tabs.Trigger>
);

export const HighlightTab = ({ gameId }: { gameId: string }) => {
  return (
    <Suspense fallback={<TabsTriggerFallback />}>
      <HighlightTabContent gameId={gameId} />
    </Suspense>
  );
};
