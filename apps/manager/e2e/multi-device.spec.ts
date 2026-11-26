import { expect, test } from '@playwright/test';

import { basketballConsole, homeScore, login, reseed } from './helpers';

// 운영(11/23)에서 두 기기가 한 경기를 같이 기록했다. 다른 기기의 기록이 새로고침 없이 보여야 한다
test('다른 기기에서 넣은 득점이 새로고침 없이 보인다', async ({ browser }) => {
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
  await expect(homeScore(viewer)).toHaveText('0');

  await recorder.getByRole('button', { name: '득점 기록' }).click();
  await expect(homeScore(recorder)).toHaveText('2');

  // 콘솔은 5초마다 다시 받는다
  await expect(homeScore(viewer)).toHaveText('2', { timeout: 10_000 });
});
