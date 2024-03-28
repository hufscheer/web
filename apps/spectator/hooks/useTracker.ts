import { track } from '@amplitude/analytics-browser';

export default function useTracker() {
  const tracker = (eventName: string, properties: Record<string, unknown>) => {
    track(eventName, properties);
  };

  return { tracker };
}
