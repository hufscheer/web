export type OrganizationMeta = {
  id: number;
  displayName: string;
};

// 실제 id는 GET /organizations 응답과 일치해야 한다.
// 새 조직 추가 시 이 배열만 갱신.
export const ORGANIZATIONS: readonly OrganizationMeta[] = [
  { id: 9, displayName: '한국외국어대학교' },
  { id: 11, displayName: '경희대학교' },
] as const;
