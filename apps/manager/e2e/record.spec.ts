import { expect, test } from '@playwright/test';

import {
  basketballConsole,
  expectServerCount,
  homeScore,
  login,
  openTab,
  playingIds,
  reseed,
  serverTimeline,
} from './helpers';

test.beforeEach(async ({ page }) => {
  reseed();
  await login(page);
  await page.goto(basketballConsole);
  await expect(page.getByRole('heading', { name: 'E2E 농구 경기' })).toBeVisible();
});

test('득점: 홈팀 득점이 점수판, 기록 목록, 서버에 남는다', async ({ page, request }) => {
  await expect(homeScore(page)).toHaveText('0');

  await page.getByRole('button', { name: '득점 기록' }).click();

  await expect(homeScore(page)).toHaveText('2');
  await expect(page.getByText('1건')).toBeVisible();
  await expectServerCount(request, 1, 'SCORE', 1);

  await page.reload();
  await expect(homeScore(page)).toHaveText('2');
  await expect(page.getByText('1건')).toBeVisible();
  await expectServerCount(request, 1, 'SCORE', 1);
});

test('득점 취소: 가장 최근 기록을 지우면 점수가 되돌아온다', async ({ page, request }) => {
  const record = page.getByRole('button', { name: '득점 기록' });

  await record.click();
  await expectServerCount(request, 1, 'SCORE', 1);
  await expect(record).toBeEnabled();
  await record.click();
  await expectServerCount(request, 1, 'SCORE', 2);
  await expect(homeScore(page)).toHaveText('4');
  await expect(page.getByText('2건')).toBeVisible();

  // 저장이 끝나 서버 기록으로 바뀌면 삭제 버튼이 눌린다
  await expect(page.getByRole('button', { name: '삭제할 수 없는 기록' })).toHaveCount(0);
  await page.getByRole('button', { name: '기록 삭제' }).first().click();
  const dialog = page.getByRole('alertdialog', { name: '이 기록을 지울까요?' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: '삭제', exact: true }).click();

  await expect(dialog).toBeHidden();
  await expect(homeScore(page)).toHaveText('2');
  await expect(page.getByText('1건')).toBeVisible();
  await expectServerCount(request, 1, 'SCORE', 1);
});

test('교체: 나간 선수는 출전 중이 아니고 들어간 선수는 출전 중이다', async ({ page, request }) => {
  await openTab(page, '교체');
  await page.locator('#out').selectOption('1');
  await page.locator('#in').selectOption('6');
  await page.getByRole('button', { name: '교체 기록' }).click();

  await expectServerCount(request, 1, 'BASKETBALL_REPLACEMENT', 1);
  await expect
    .poll(async () => {
      const ids = await playingIds(request, 1, 1);
      return { out: ids.includes(1), in: ids.includes(6) };
    })
    .toEqual({ out: false, in: true });

  await page.reload();
  await expect(page.getByText('1건')).toBeVisible();
  await expect(page.getByText('정시우')).not.toHaveCount(0);
  await openTab(page, '교체');
  // 교체 뒤에는 나간 선수가 투입 후보 목록에 있다
  await expect(page.locator('#in option[value="1"]')).toHaveCount(1);
  await expect(page.locator('#out option[value="6"]')).toHaveCount(1);
  expect((await serverTimeline(request, 1)).length).toBe(1);
});

test('파울: 동명이인도 선수별 반칙 수가 따로 센다', async ({ page, request }) => {
  await openTab(page, '파울');
  const target = page.locator('#target');
  const record = page.getByRole('button', { name: '파울 기록' });

  const foul = async (lineupPlayerId: string, total: number) => {
    await target.selectOption(lineupPlayerId);
    await record.click();
    await expectServerCount(request, 1, 'FOUL', total);
    await expect(record).toBeEnabled();
  };
  await foul('1', 1);
  await foul('1', 2);
  await foul('2', 3);

  await expect(target.locator('option[value="1"]')).toHaveText('4 김민수 · 2반칙');
  await expect(target.locator('option[value="2"]')).toHaveText('5 김민수 · 1반칙');
});
