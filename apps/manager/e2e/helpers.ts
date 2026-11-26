import { expect, type APIRequestContext, type Page } from '@playwright/test';
import { execSync } from 'node:child_process';

export const API_URL = process.env.E2E_API_URL ?? 'http://localhost:8080';

const DEFAULT_SEED_CMD =
  'docker exec -i desk-qa-mysql mysql -uroot -proot --default-character-set=utf8mb4 hcc < e2e/seed.sql';

/** 시드를 다시 넣어 DB 를 깨끗한 상태로 되돌린다. CI 는 E2E_SEED_CMD 로 같은 SQL 을 넣는다 */
export const reseed = () => {
  execSync(process.env.E2E_SEED_CMD ?? DEFAULT_SEED_CMD, {
    cwd: process.cwd(),
    stdio: 'pipe',
    shell: '/bin/bash',
  });
};

export const login = async (page: Page) => {
  await page.goto('/desktop/auth/login');
  await page.locator('input[type=email]').fill('e2e@example.com');
  await page.locator('input[type=password]').fill('1234');
  await page.locator('input[type=password]').press('Enter');
  await page.waitForURL(/\/desktop\/?$/);
};

export const basketballConsole = '/desktop/leagues/1/basketball/1/timeline';

type TimelineItem = { type: string; recordId: number };

/** 서버가 가진 경기 타임라인(최신순) */
export const serverTimeline = async (request: APIRequestContext, gameId: number) => {
  const res = await request.get(`${API_URL}/games/${gameId}/timeline`);
  expect(res.ok()).toBeTruthy();
  const body = (await res.json()) as { timelines: { records: TimelineItem[] }[] };
  return body.timelines.flatMap((quarter) => quarter.records);
};

/** 서버 타임라인에서 한 종류의 기록 수가 기대값이 될 때까지 기다린다 */
export const expectServerCount = async (
  request: APIRequestContext,
  gameId: number,
  type: string,
  count: number,
) => {
  await expect
    .poll(async () => (await serverTimeline(request, gameId)).filter((t) => t.type === type).length)
    .toBe(count);
};

type PlayingTeam = { gameTeamId: number; gameTeamPlayers: { lineupPlayerId: number }[] };

/** 서버가 출전 중이라고 내려 주는 선수의 lineupPlayerId (팀 gameTeamId 기준) */
export const playingIds = async (
  request: APIRequestContext,
  gameId: number,
  gameTeamId: number,
) => {
  const res = await request.get(`${API_URL}/games/${gameId}/lineup/playing`);
  expect(res.ok()).toBeTruthy();
  const teams = (await res.json()) as PlayingTeam[];
  const team = teams.find((t) => t.gameTeamId === gameTeamId);
  return (team?.gameTeamPlayers ?? []).map((p) => p.lineupPlayerId);
};

/** 상단 스코어보드의 홈 점수 */
export const homeScore = (page: Page) => page.locator('.text-score').first();

export const openTab = (page: Page, name: string) =>
  page.getByRole('button', { name, exact: true }).click();
