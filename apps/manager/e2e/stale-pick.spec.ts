import { expect, test } from '@playwright/test';

import { basketballConsole, expectServerCount, login, reseed } from './helpers';

// 콘솔이 5초마다 다시 받으므로, 고른 선수를 다른 기기가 교체하면 select 가 첫 선수로 바뀐다.
// 그대로 저장하면 엉뚱한 선수에게 득점이 들어가므로 막고 다시 고르게 한다
test('다른 기기가 교체한 선수로는 득점이 저장되지 않는다', async ({ browser, request }) => {
  reseed();
  const open = async () => {
    const page = await (await browser.newContext()).newPage();
    await login(page);
    await page.goto(basketballConsole);
    await expect(page.getByRole('heading', { name: 'E2E 농구 경기' })).toBeVisible();
    return page;
  };
  const recorder = await open();
  const viewer = await open();

  // viewer: 득점 선수로 이서준(lineup 3)을 고른다
  const scorer = viewer.locator('select').first();
  await scorer.selectOption('3');

  // recorder: 이서준을 빼고 정시우(lineup 6)를 넣는다
  await recorder.getByRole('button', { name: '교체', exact: true }).click();
  await recorder.locator('select').nth(0).selectOption('3');
  await recorder.locator('select').nth(1).selectOption('6');
  await recorder.getByRole('button', { name: '교체 기록' }).click();
  await expectServerCount(request, 1, 'BASKETBALL_REPLACEMENT', 1);

  // viewer 화면이 다시 받으면 이서준이 목록에서 빠진다
  await expect(scorer.locator('option[value="3"]')).toHaveCount(0, { timeout: 10_000 });
  await viewer.getByRole('button', { name: '득점 기록' }).click();

  await expect(
    viewer.getByText('고른 선수가 지금 출전 명단에 없어요', { exact: false }),
  ).toBeVisible();
  await expectServerCount(request, 1, 'SCORE', 0);
});
