import { defineConfig, devices } from '@playwright/test';

/**
 * 데스크탑 경기 기록 스모크. 로컬 서버(spectator-server) + 시드(e2e/seed.sql) + 매니저 프로덕션 빌드를
 * 미리 띄워 두고 실행한다. 순서와 명령은 e2e/README.md
 */
export default defineConfig({
  testDir: './e2e',
  // 시드 하나를 여러 테스트가 같이 쓴다. 기록 순서가 섞이지 않게 한 줄로 돈다
  workers: 1,
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  timeout: 60_000,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:3000',
    viewport: { width: 1440, height: 900 },
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
  ],
});
