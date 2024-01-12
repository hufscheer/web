// 프로젝트의 변동이 있을 때, 해당 파일에서 lint-staged를 수정하게 됩니다.
module.exports = {
  '*.+(ts|tsx)': [() => 'yarn tsc -p tsconfig.base.json --noEmit'],

  'apps/spectator/**/*.+(ts|tsx)': [
    () => 'yarn tsc -p apps/spectator/tsconfig.json --noEmit',
  ],
  'apps/manager/**/*.+(ts|tsx)': [
    () => 'yarn tsc -p apps/manager/tsconfig.json --noEmit',
  ],
  'packages/components/**/*.+(ts|tsx)': [
    () => 'yarn tsc -p packages/components/tsconfig.json --noEmit',
  ],
  'packages/hooks/**/*.+(ts|tsx)': [
    () => 'yarn tsc -p packages/hooks/tsconfig.json --noEmit',
  ],
  'packages/utils/**/*.+(ts|tsx)': [
    () => 'yarn tsc -p packages/utils/tsconfig.json --noEmit',
  ],

  '**/*.+(ts|tsx|js|jsx)': ['yarn lint'],
};
