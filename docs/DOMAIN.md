# Domain vocabulary

훕치치 코드에 등장하는 도메인 명사의 정의. 변수명·타입명·API 응답·라우트에 아래 영문 표기가 그대로 쓰이므로, 해당 용어가 포함된 작업은 이 문서를 먼저 확인한다. 임의 축약(예: `LTP`)이나 재명명을 하지 않는다.

## Actors (사용자 역할)

| 용어 | 설명 | 주요 코드 위치 |
| --- | --- | --- |
| **매니저 (Manager)** | 대회·게임을 관리·주최하는 액터. | `apps/manager` |
| **관객 (Spectator)** | 게임을 관람·응원하는 액터. | `apps/spectator` |

## League (대회 영역)

| 용어 | 설명 |
| --- | --- |
| **대회 (League)** | 매니저가 생성하는 게임들의 집합. 하나의 리그 하위에 여러 Game이 존재. |
| **대회팀 (LeagueTeam)** | 대회에 등록되는 팀. 게임에 참여할 수 있는 모집단. |
| **대회팀선수 (LeagueTeamPlayer)** | 대회팀에 소속되는 선수. 특정 Game의 라인업이 아닌 "대회 단위 로스터". |

## Game (게임 영역)

| 용어 | 설명 |
| --- | --- |
| **게임 (Game)** | n개의 대회팀이 참여하여 진행하는 단일 경기. 종목(soccer / basketball 등)별 라우트 분기. |
| **게임팀 (GameTeam)** | 특정 Game에 참여하는 LeagueTeam 인스턴스. 한 LeagueTeam이 여러 Game에서 각각 다른 GameTeam이 됨. |
| **라인업 (Lineup)** | 특정 Game에 출전하는 LineupPlayer의 집합. |
| **라인업 선수 (LineupPlayer)** | GameTeam 소속으로 Game에 실제 출전하는 선수. LeagueTeamPlayer에서 선택되어 라인업에 편성된다. |

## Spectator interaction (관객 상호작용)

| 용어 | 설명 |
| --- | --- |
| **응원톡 (CheerTalk)** | 관객이 GameTeam을 응원하기 위해 남기는 메시지. 라우트: `.../cheertalks/`. |
| **응원횟수 (CheerCount)** | 관객이 GameTeam 응원을 위해 클릭하는 숫자 카운트. |
| **신고 (Report)** | 관객이 부적절한 응원톡을 신고하는 액션. 신고된 CheerTalk는 차단 대상이 될 수 있다. |

## Timeline (매니저 기록)

| 용어 | 설명 |
| --- | --- |
| **타임라인 (Timeline)** | 매니저가 Game에 남긴 기록(점수, 교체, 경고 등)을 시간 순으로 조회한 결과. 라우트: `.../timeline/`. |

## Entity relationships

```
Manager ──(creates / manages)──▶ League
                                   │
                                   ├── LeagueTeam ──▶ LeagueTeamPlayer
                                   │       │
                                   │       └─(participates in)─▶ GameTeam
                                   │
                                   └── Game ──▶ GameTeam ──▶ Lineup ──▶ LineupPlayer
                                        │
                                        └──▶ Timeline (매니저가 기록)

Spectator ──(views / reacts to)──▶ Game
                                     │
                                     ├──▶ CheerTalk ──(targets)──▶ GameTeam
                                     ├──▶ CheerCount ─(targets)──▶ GameTeam
                                     └──▶ Report ───(targets)───▶ CheerTalk
```

## 작업 가이드

- 코드·타입·라우트에서 위 영문명을 그대로 쓴다. 임의 축약 금지.
- 신규 도메인 개념을 추가하면 **코드 변경 전**에 이 문서부터 업데이트한다.
- 관계도에 없는 새 관계(예: `LineupPlayer` ↔ `CheerTalk` 연결)가 생기면 다이어그램을 함께 갱신한다.
- 종목(sportType: soccer, basketball, …)은 상위 Game에 속한 공통 속성으로 라우트가 분기된다. 종목별 전용 로직은 라우트 분기 지점에서 분리한다.
