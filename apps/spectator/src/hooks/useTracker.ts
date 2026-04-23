import { sendGAEvent } from '@next/third-parties/google';

type TrackerParams = { category: string };
type GAEventParams = {
  action: 'click' | 'view' | string;
  value: string;
};

export const useTracker = ({ category }: TrackerParams) => {
  return ({ action, value }: GAEventParams) =>
    sendGAEvent('event', action, { event_category: category, event_label: value });
};
