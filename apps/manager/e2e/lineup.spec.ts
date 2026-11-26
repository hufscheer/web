import { expect, test, type Page } from '@playwright/test';

import { API_URL, login, reseed } from './helpers';

type ServerPlayer = { lineupPlayerId: number; state: string; isCaptain: boolean };
type ServerTeam = {
  gameTeamId: number;
  starterPlayers: ServerPlayer[];
  candidatePlayers: ServerPlayer[];
};

const row = (page: Page, name: string) =>
  page.locator('div.flex.items-center.gap-1\\.5').filter({ hasText: name }).last();

test('라인업 저장: 후보 승격, 선발 강등, 주장 변경이 서버와 화면에 남는다', async ({
  page,
  request,
}) => {
  reseed();
  await login(page);
  await page.goto('/desktop/leagues/2/soccer/3');
  await expect(page.getByRole('heading', { name: '라인업' })).toBeVisible();
  const save = page.getByRole('button', { name: '라인업 저장' });
  await expect(save).toBeDisabled();

  // 후보 안준서(54)를 선발로, 선발 황승현(53)을 후보로, 주장은 신승우(51)에서 권지환(52)으로
  await row(page, '안준서').getByRole('button', { name: '후보', exact: true }).click();
  await row(page, '황승현').getByRole('button', { name: '선발', exact: true }).click();
  await row(page, '권지환').getByTitle('주장 지정').click();
  await expect(save).toBeEnabled();
  await save.click();

  await expect(page.getByText('라인업을 저장했어요')).toBeVisible();

  const fetchHome = async () => {
    const res = await request.get(`${API_URL}/games/3/lineup`);
    expect(res.ok()).toBeTruthy();
    const teams = (await res.json()) as ServerTeam[];
    const home = teams.find((t) => t.gameTeamId === 5);
    return {
      starters: (home?.starterPlayers ?? []).map((p) => p.lineupPlayerId).sort((a, b) => a - b),
      candidates: (home?.candidatePlayers ?? []).map((p) => p.lineupPlayerId).sort((a, b) => a - b),
      captain: home?.starterPlayers.find((p) => p.isCaptain)?.lineupPlayerId,
    };
  };
  await expect.poll(fetchHome).toEqual({ starters: [51, 52, 54], candidates: [53], captain: 52 });

  await page.reload();
  await expect(page.getByRole('heading', { name: '라인업' })).toBeVisible();
  await expect(
    row(page, '안준서').getByRole('button', { name: '선발', exact: true }),
  ).toBeVisible();
  await expect(
    row(page, '황승현').getByRole('button', { name: '후보', exact: true }),
  ).toBeVisible();
  await expect(row(page, '권지환').getByTitle('주장 해제')).toBeVisible();
  await expect(save).toBeDisabled();
});
