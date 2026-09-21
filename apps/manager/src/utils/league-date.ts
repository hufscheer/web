const toUtcIso = (date: Date, hour: number, minute = 0, second = 0) =>
  new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, second),
  ).toISOString();

export const toLeagueStartAt = (date: Date) => toUtcIso(date, 0);

export const toLeagueEndAt = (date: Date) => toUtcIso(date, 23, 59, 59);
