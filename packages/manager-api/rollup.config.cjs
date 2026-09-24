const { createRollupConfig } = require('@hcc/rollup-config/base');

// 훅 반환 타입은 react-query 에서 추론된다. rollup-plugin-dts 는 이 타입을 풀면서
// 제네릭 인자를 잃어버리므로(QueryObserverResult<TData, TError>) 선언 파일은 tsc 로 만든다.
module.exports = createRollupConfig().filter(
  (config) => !config.plugins.some((plugin) => plugin && plugin.name === 'dts'),
);
