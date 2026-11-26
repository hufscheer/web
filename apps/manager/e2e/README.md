# 매니저 데스크탑 E2E

실제 spectator-server 와 MySQL 에 붙어 도는 스모크 테스트다. CI 는 `.github/workflows/manager-test.yml` 이 같은 순서로 돌린다.

## 로컬에서 돌리기

1. MySQL 8.4 컨테이너

   ```bash
   docker run -d --name desk-qa-mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=hcc -p 13306:3306 mysql:8.4
   ```

2. 서버(spectator-server, 워크플로의 `SERVER_SHA` 커밋). be-config 서브모듈은 필요 없다

   ```bash
   mkdir -p build/generated-snippets && ./gradlew bootJar -x test -x asciidoctor
   java -jar build/libs/server-0.0.1-SNAPSHOT.jar --spring.profiles.active=local \
     --spring.datasource.url='jdbc:mysql://127.0.0.1:13306/hcc?serverTimezone=Asia/Seoul&characterEncoding=UTF-8' \
     --spring.datasource.username=root --spring.datasource.password=root \
     --spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   ```

3. 매니저 프로덕션 빌드(레포 루트). 서버 local 프로필의 CORS 가 `localhost:3000` 만 허용해서 3000 번으로 띄운다

   ```bash
   API_BASE_URL=http://localhost:8080 pnpm turbo build --filter manager
   cd apps/manager && API_BASE_URL=http://localhost:8080 pnpm exec next start --port 3000
   ```

4. 테스트(`apps/manager`). 처음 한 번 `pnpm exec playwright install chromium`

   ```bash
   pnpm test:e2e
   ```

## 환경 변수

- `E2E_SEED_CMD`: 시드를 넣는 셸 명령. 없으면 `desk-qa-mysql` 컨테이너에 `e2e/seed.sql` 을 넣는다
- `E2E_BASE_URL`: 매니저 주소(기본 `http://localhost:3000`)
- `E2E_API_URL`: 서버 주소(기본 `http://localhost:8080`). 테스트가 저장 결과를 서버에서 다시 확인할 때 쓴다

## 시드

`e2e/seed.sql` 은 테이블을 비우고 다시 채운다. 테스트마다 다시 넣는다. 로그인은 `e2e@example.com` / `1234`. 서버 Flyway 스키마가 바뀌면 시드와 워크플로의 `SERVER_SHA` 를 함께 올린다.
