## `manager-desktop`

대회 운영자를 위한 데스크탑(PC) 매니저. 모바일 매니저(`apps/manager`)와 같은 서버·같은 API 훅(`@hcc/manager-api`)을 쓴다.

```bash
pnpm dev:manager-desktop   # http://localhost:11115
```

`API_BASE_URL` 로 붙을 서버를 정한다. 브라우저 요청은 `/api/*` 리라이트로 같은 출처에서 나간다.
