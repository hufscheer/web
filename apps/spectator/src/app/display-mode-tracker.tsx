"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useEffect } from "react";

type DisplayMode = "standalone" | "browser";

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

const detectDisplayMode = (): DisplayMode => {
  const nav = window.navigator as Navigator & { standalone?: boolean };

  const installedModes = ["standalone", "minimal-ui", "fullscreen"];
  const matchesInstalled = installedModes.some(
    (mode) => window.matchMedia?.(`(display-mode: ${mode})`).matches,
  );

  const isInstalled =
    matchesInstalled || nav.standalone === true || document.referrer.startsWith("android-app://");

  return isInstalled ? "standalone" : "browser";
};

/**
 * 사용자가 PWA(설치본)로 접속했는지 모바일 브라우저로 접속했는지 GA4에 기록한다.
 * - user_properties.display_mode: 이후 모든 이벤트의 커스텀 차원으로 붙는다.
 * - app_environment 이벤트: 세션별 최초 유입 환경 집계용.
 */
export const DisplayModeTracker = () => {
  useEffect(() => {
    const displayMode = detectDisplayMode();

    const w = window as GtagWindow;
    w.dataLayer = w.dataLayer || [];
    if (typeof w.gtag === "function") {
      w.gtag("set", "user_properties", { display_mode: displayMode });
    } else {
      w.dataLayer.push(["set", "user_properties", { display_mode: displayMode }]);
    }

    sendGAEvent("event", "app_environment", { display_mode: displayMode });
  }, []);

  return null;
};
