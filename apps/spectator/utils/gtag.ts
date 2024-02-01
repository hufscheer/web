import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  window.gtag('config', GA_TRACKING_ID as string, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (
  action: Gtag.EventNames,
  { event_category, event_label, value }: Gtag.EventParams,
) => {
  window.gtag('event', action, {
    event_category,
    event_label,
    value,
  });
};

export const useGtag = () => {
  const pathname = usePathname(); // Get current route

  // Save pathname on component mount into a REF
  const savedPathNameRef = useRef(pathname);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;

    const handleRouteChange = (url: URL) => {
      pageview(url);
    };

    if (savedPathNameRef.current !== pathname) {
      handleRouteChange(new URL(pathname, window.location.origin));
      // Update REF
      savedPathNameRef.current = pathname;
    }
  }, [pathname]);
};
