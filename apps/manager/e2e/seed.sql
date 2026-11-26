-- E2E 시드. Flyway 마이그레이션이 끝난 DB 를 비우고 다시 채운다(여러 번 실행해도 같은 상태). 로그인: e2e@example.com / 1234
SET NAMES utf8mb4;
SET foreign_key_checks = 0;

TRUNCATE TABLE bracket_matches;
TRUNCATE TABLE cheer_talk_bot_filter_history;
TRUNCATE TABLE cheer_talks;
TRUNCATE TABLE game_teams;
TRUNCATE TABLE games;
TRUNCATE TABLE league_statistics;
TRUNCATE TABLE league_teams;
TRUNCATE TABLE league_top_scorers;
TRUNCATE TABLE leagues;
TRUNCATE TABLE lineup_players;
TRUNCATE TABLE members;
TRUNCATE TABLE organizations;
TRUNCATE TABLE pending_cheer_talks;
TRUNCATE TABLE players;
TRUNCATE TABLE push_devices;
TRUNCATE TABLE push_follows;
TRUNCATE TABLE reports;
TRUNCATE TABLE team_players;
TRUNCATE TABLE teams;
TRUNCATE TABLE timelines;
TRUNCATE TABLE units;

INSERT INTO organizations (id, name, student_number_digits) VALUES (1, 'E2E 대학', 9);
INSERT INTO members (id, organization_id, email, password, is_administrator, last_login)
VALUES (1, 1, 'e2e@example.com', '$2a$10$yviVCR3GmaU6cPJT.8vaMOwph9WzbX6wtn9iERu3148ZP8XlKbakO', true, NOW());
INSERT INTO units (id, name, organization_id) VALUES (1, '공과대학', 1), (2, '인문대학', 1);

INSERT INTO leagues (id, administrator_id, organization_id, name, start_at, end_at, max_round, in_progress_round,
                     is_deleted, sport_type)
VALUES (1, 1, 1, 'E2E 농구 대회', '2026-01-01 00:00:00', '2099-12-31 23:59:59', '4강', '4강', false, 'BASKETBALL'),
       (2, 1, 1, 'E2E 축구 대회', '2026-01-01 00:00:00', '2099-12-31 23:59:59', '4강', '4강', false, 'SOCCER');

INSERT INTO teams (id, unit_id, name, team_color, sport_type)
VALUES (1, 1, '농구 홈팀', '#FF0000', 'BASKETBALL'),
       (2, 2, '농구 원정팀', '#0000FF', 'BASKETBALL'),
       (3, 1, '축구 홈팀', '#00AA00', 'SOCCER'),
       (4, 2, '축구 원정팀', '#AA00AA', 'SOCCER');

INSERT INTO league_teams (id, league_id, team_id) VALUES (1, 1, 1), (2, 1, 2), (3, 2, 3), (4, 2, 4);

-- 1, 2 는 같은 팀의 동명이인(김민수)이다
INSERT INTO players (id, name, student_number, organization_id)
VALUES (1, '김민수', '202600001', 1), (2, '김민수', '202600002', 1), (3, '이서준', '202600003', 1),
       (4, '박도윤', '202600004', 1), (5, '최하준', '202600005', 1), (6, '정시우', '202600006', 1),
       (7, '강지호', '202600007', 1),
       (11, '윤건우', '202600011', 1), (12, '장우진', '202600012', 1), (13, '임선우', '202600013', 1),
       (14, '한연우', '202600014', 1), (15, '오유준', '202600015', 1), (16, '서정우', '202600016', 1),
       (21, '신승우', '202600021', 1), (22, '권지환', '202600022', 1), (23, '황승현', '202600023', 1),
       (24, '안준서', '202600024', 1), (25, '송민재', '202600025', 1), (26, '류현우', '202600026', 1),
       (27, '전은우', '202600027', 1),
       (31, '홍지후', '202600031', 1), (32, '고도현', '202600032', 1), (33, '문준혁', '202600033', 1),
       (34, '양태윤', '202600034', 1), (35, '손시윤', '202600035', 1), (36, '배하율', '202600036', 1),
       (37, '조이준', '202600037', 1);

INSERT INTO team_players (id, team_id, player_id, jersey_number)
VALUES (1, 1, 1, 4), (2, 1, 2, 5), (3, 1, 3, 6), (4, 1, 4, 7), (5, 1, 5, 8), (6, 1, 6, 9), (7, 1, 7, 10),
       (11, 2, 11, 4), (12, 2, 12, 5), (13, 2, 13, 6), (14, 2, 14, 7), (15, 2, 15, 8), (16, 2, 16, 9),
       (21, 3, 21, 1), (22, 3, 22, 2), (23, 3, 23, 3), (24, 3, 24, 4), (25, 3, 25, 5), (26, 3, 26, 6),
       (27, 3, 27, 7),
       (31, 4, 31, 1), (32, 4, 32, 2), (33, 4, 33, 3), (34, 4, 34, 4), (35, 4, 35, 5), (36, 4, 36, 6),
       (37, 4, 37, 7);

-- 1: 농구 진행 중(1쿼터), 2: 축구 진행 중(전반전), 3: 축구 경기 전(라인업 저장용)
INSERT INTO games (id, administrator_id, league_id, name, start_time, quarter_changed_at, game_quarter, state, round,
                   is_pk_taken)
VALUES (1, 1, 1, 'E2E 농구 경기', '2026-11-26 10:00:00', '2026-11-26 10:00:00', 'FIRST_QUARTER', 'PLAYING', '4강', false),
       (2, 1, 2, 'E2E 축구 경기', '2026-11-26 10:00:00', '2026-11-26 10:00:00', 'FIRST_HALF', 'PLAYING', '4강', false),
       (3, 1, 2, 'E2E 축구 예정 경기', '2099-01-01 10:00:00', '2099-01-01 10:00:00', 'PRE_GAME', 'SCHEDULED', '4강', false);

INSERT INTO game_teams (id, game_id, team_id, cheer_count, score, pk_score)
VALUES (1, 1, 1, 0, 0, 0), (2, 1, 2, 0, 0, 0),
       (3, 2, 3, 0, 0, 0), (4, 2, 4, 0, 0, 0),
       (5, 3, 3, 0, 0, 0), (6, 3, 4, 0, 0, 0);

-- 농구: 선발 5 + 후보. 축구: 선발 5(테스트용으로 작게) + 후보
INSERT INTO lineup_players (id, game_team_id, player_id, jersey_number, is_captain, state, is_playing)
VALUES (1, 1, 1, 4, true, 'STARTER', true), (2, 1, 2, 5, false, 'STARTER', true),
       (3, 1, 3, 6, false, 'STARTER', true), (4, 1, 4, 7, false, 'STARTER', true),
       (5, 1, 5, 8, false, 'STARTER', true), (6, 1, 6, 9, false, 'CANDIDATE', false),
       (7, 1, 7, 10, false, 'CANDIDATE', false),
       (11, 2, 11, 4, true, 'STARTER', true), (12, 2, 12, 5, false, 'STARTER', true),
       (13, 2, 13, 6, false, 'STARTER', true), (14, 2, 14, 7, false, 'STARTER', true),
       (15, 2, 15, 8, false, 'STARTER', true), (16, 2, 16, 9, false, 'CANDIDATE', false),
       (21, 3, 21, 1, true, 'STARTER', true), (22, 3, 22, 2, false, 'STARTER', true),
       (23, 3, 23, 3, false, 'STARTER', true), (24, 3, 24, 4, false, 'STARTER', true),
       (25, 3, 25, 5, false, 'STARTER', true), (26, 3, 26, 6, false, 'CANDIDATE', false),
       (27, 3, 27, 7, false, 'CANDIDATE', false),
       (31, 4, 31, 1, true, 'STARTER', true), (32, 4, 32, 2, false, 'STARTER', true),
       (33, 4, 33, 3, false, 'STARTER', true), (34, 4, 34, 4, false, 'STARTER', true),
       (35, 4, 35, 5, false, 'STARTER', true), (36, 4, 36, 6, false, 'CANDIDATE', false),
       (51, 5, 21, 1, true, 'STARTER', true), (52, 5, 22, 2, false, 'STARTER', true),
       (53, 5, 23, 3, false, 'STARTER', true), (54, 5, 24, 4, false, 'CANDIDATE', false),
       (61, 6, 31, 1, true, 'STARTER', true), (62, 6, 32, 2, false, 'STARTER', true),
       (63, 6, 33, 3, false, 'CANDIDATE', false);

SET foreign_key_checks = 1;
