export class LineupNotRegisteredError extends Error {
  constructor(message = '아직 라인업이 등록되지 않았습니다.') {
    super(message);
    this.name = 'LineupNotRegisteredError';
  }
}
