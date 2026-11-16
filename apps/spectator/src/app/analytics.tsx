import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights as VercelSpeedInsights } from "@vercel/speed-insights/next";

import { DisplayModeTracker } from "./display-mode-tracker";

export const AnalyticsProvider = () => {
  if (process.env.NODE_ENV === "development") return;

  return (
    <>
      <VercelAnalytics />
      <VercelSpeedInsights />

      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />

      <DisplayModeTracker />
    </>
  );
};
