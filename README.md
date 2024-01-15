# 훕치치 client ver.2

> yarn 4 workspace를 활용한 모놀리식 훕치치 레포지토리 입니다.

## 시작하기

1. yarn 설치
2. git clone https://github.com/hufscheer/client_v2.git
3. eslint, husky 등의 사용을 위해 <code>yarn</code> 커맨드와 <code>yarn postinstall</code> 1회 실행해줍니다.

PnP 기능을 사용하지 않고 node-modules를 사용하므로 아래 절차는 생략하면 됩니다.

4. ~~<code>yarn dlx @yarnpkg/sdks vscode</code>를 실행해 vscode가 모노레포를 인식하도록 합니다(`npx` === `yarn dlx`).~~
5. ~~아무 타입스크립트 파일이나 열어서 <code>cmd + shift + p</code>로 palette를 열고, `Typescript: Select Typescript Version...`을 누른 뒤 아래 사진처럼 TS 버전을 workspace의 것으로 맞춰줍니다.~~
   ![](https://github.com/kowoohyuk/monorepo-template/assets/87803596/c9f2d16b-a754-45d6-b992-3b4063b9864c)

<details>
  <summary><del>Select Typescript Version이 안보이는 경우:</del></summary>

  <ol>
    <li>
      <div>vscode Workspace에 client_v2를 단독으로 열어주세요. `Add folder to workspace`로 추가할 경우 vscode가 Workspace임을 인식하지 못합니다.</div>
      <a href="https://github.com/yarnpkg/berry/issues/3399">관련 링크: https://github.com/yarnpkg/berry/issues/3399</a>
      <img src="https://github.com/hufscheer/client_v2/assets/87803596/9bec4d80-4c2f-4bbf-9429-02fd9a83e8d9"/>
    </li>
    <li>
      <span>만약 새로운 서브프로젝트를 생성했을 경우 루트 디렉토리의 의존성 버전과 해당 서브프로젝트 의존성 버전이 같은지 확인해주세요.</span>
      <div>e.g. root package.json <code>typescript: ^5.3.3</code> !== project package.json <code>typescript: ^5</code></div>
    </li>
  </ol>

</details>

## 파일 구조

```
- .github
   PR 템플릿, github actions가 담길 디렉토리입니다.
- .husky
   husky 라이브러리 관련 코드가 위치하며, pre-commit을 수행합니다.
- .vscode
   yarn 4 workspace와 vscode 연동 목적의 설정이 담겨있는 디렉토리입니다.
- .yarn
   yarn 프로젝트의 의존성이 위치하는 디렉토리입니다.
----------------------------------------------------------------------------------
- apps
   훕치치 서비스를 모아둔 디렉토리입니다.
  - manager
     매니저 사이드 프로젝트입니다. Next.js
  - spectator
     관객 사이드 프로젝트입니다. Next.js
- packages
   공용 패키지가 모여있는 디렉토리입니다.
  - components
     공용 컴포넌트 프로젝트입니다. Next.js
  - hooks
     공용 훅을 모아둔 프로젝트입니다. Vite
  - utils
     공용 유틸 함수를 모아둔 프로젝트입니다. Vite
----------------------------------------------------------------------------------
- .eslintrc.js, .eslintignore
   lint 규칙은 루트 디렉토리에 통합으로 관리하기 때문에 개별 프로젝트에서는 lint 설정이 존재하지 않습니다.
- .prettierrc, .prettierignore
   prettier 통합 설정 파일입니다.
   lint와 마찬가지로 개별 프로젝트에는 prettier 설정이 존재하지 않습니다.
- .pnp.cjs, .pnp.loader.mjs
   yarn pnp의 의존성 관계가 서술돼있는 파일입니다.
- .yarnrc.yml
   yarn 프로젝트의 설정을 커스터마이즈할 수 있는 파일입니다. 현재 pnp 활성화, enableGlobalCache 비활성화 두 개 옵션이 기입돼있습니다.
- client_v2.code-workspace
   이 프로젝트의 IDE 환경 일관성을 보장해주는 vscode 파일입니다.
   해당 파일을 열고 하단 <code>Open Workspace</code>를 누르면 멀티 루트 워크스페이스가 열립니다.
- lint-staged.config.js, commitlint.config.js
   lint-staged, commitlint 설정입니다.
- package.json
   프로젝트의 주요 의존성 목록, script, workspace 등의 중요 정보가 담긴 파일입니다.
- tsconfig.base.json
   공통 타입스크립트 규칙 설정 파일입니다.
   개별 프로젝트에서 import해 커스터마이즈합니다.
```

<details>
  <summary>
    <h2>사용법</h2>
  </summary>

### 0. 현재 프로젝트 이름은 아래와 같이 작성돼있습니다.

공용 패키지의 경우 확실한 구분을 위해 `@packages` prefix를 붙였습니다.

```markdown
/apps
관객: spectator
매니저: manager

/packages
공용 컴포넌트: @packages/components
공용 훅: @packages/hooks
공용 유틸함수: @packages/utils
```

### 1. 개별 프로젝트의 스크립트는 아래와 같이 사용할 수 있습니다.

```markdown
// 프로젝트 루트에 위치하고 있다면
yarn workspace manager dev
yarn workspace @packages/components add -D typescript

// 혹은 프로젝트 디렉토리로 이동했을 경우(e.g. cd apps/manager)
yarn add -D typescript
```

다만, root의 package.json - script에 등록해놨다면 아래와 같이 요약해 사용할 수 있습니다.

새로운 프로젝트를 생성했다면 root package.json에도 추가해주세요.

```json
"scripts": {
  "spectator": "yarn workspace spectator",
  "manager": "yarn workspace manager",
  "components": "yarn workspace @packages/components",
  "hooks": "yarn workspace @packages/hooks",
  "utils": "yarn workspace @packages/utils",
  ...
}

-> yarn manager build (O)
-> yarn components remove left-pad (O)
```

### 2. 만약 apps 프로젝트에서 packages 프로젝트의 모듈을 가져다 사용하고 싶다면 아래와 같이 참조해야합니다.

```json
"dependencies": {
  "프로젝트 name": "workspace:*",
  "@packages/component": "workspace:*",
  ...
}
```

### 3. eslint

eslint는 루트 디렉토리에만 존재하며 개별 프로젝트에는 생성할 필요가 없습니다.

이렇게 관리하는 이유는 훕치치 코드 특성상 Next.js 앱이 주를 이루기 때문에 각자 관리하기보다 한 곳에서 통일시켜주는 것이 더 낫다 판단했기 때문입니다.

overrides 프로퍼티에 프로젝트별 tsconfig.json 매핑 설정이 존재해 개별 tsconfig.json을 따를 수 있습니다.

```js
// .eslintrc.js
overrides: [
  {
    files: 'apps/spectator/**/*.+(js|jsx|ts|tsx)',
    settings: {
      'import/resolver': {
        typescript: {
          project: path.resolve(`${__dirname}/apps/spectator/tsconfig.json`),
        },
      },
    },
  },
  ...
]
```

### 4. tsconfig

tsconfig 전략은 `/packages tsconfig -> root tsconfig -> /apps tsconfig` 순서 입니다.

위 순서를 보장해야 packages 모듈을 apps 프로젝트에서 import할 때 type information을 제공받을 수 있습니다.

/packages 프로젝트의 tsconfig를 root tsconfig에 참조시키기 위해 references에 매핑하였습니다.

```json
"files": [],
"references": [
  // base config가 참조해야 할 config 목록
  {
    "path": "packages/components"
  },
  {
    "path": "packages/hooks"
  },
  {
    "path": "packages/utils"
  }
],
```

</details>

<details>
  <summary>
    <h2>새로운 프로젝트 추가방법</h2>
  </summary>

1. workspaces 내부에 새로운 폴더를 생성합니다.

2. package.json를 생성합니다.
   - dependencies를 설정합니다.
   - 참조할 프로젝트가 있다면 경로를 dependencies에 추가합니다.
     ```js
       "dependencies": {
         // ...
         "프로젝트명": "workspace:*",
       }
     ```
3. tsconfig.json를 생성합니다.
   - 공통으로 사용하는 tsconfig가 있다면, extends 합니다.
     ```js
     {
       "extends": "../../tsconfig.json",
     }
     ```
4. (필요한 경우) 루트에 위치하는 package.json에 script를 추가합니다.
   ```js
   "scripts": {
       "별칭": "yarn workspace 프로젝트명",
   } // => yarn 별칭 프로젝트scripts
   ```
5. 새로운 프로젝트를 다른 프로젝트가 참조한다면,
   1. 해당 프로젝트의 tsconfig에 composite 및 declartion을 설정합니다.
   2. 참조하는 프로젝트의 dependencies에 해당 프로젝트를 설정합니다.
   3. (필요한 경우) 루트에 위치하는 tsconfig의 references에 경로를 추가합니다.
   ```js
   // 1
   "references": [
     {
       "path": "프로젝트 경로"
     },
   ]
   // 2
   "compilerOptions": {
     "composite": true,
     "declaration": true,
   }
   // 3
   "dependencies": {
     "프로젝트명": "workspace:*",
   }
   ```
6. eslint 설정 파일의 setting/overrides에 해당 프로젝트를 추가합니다.
   ```js
   {
     files: '프로젝트 경로/**/*.+(js|jsx|ts|tsx)',
     settings: {
       'import/resolver': {
         typescript: {
           project: path.resolve(
             `${__dirname}/프로젝트 경로/tsconfig.json`
           ),
         },
       },
     },
   },
   ```
7. lint-staged를 사용한다면, 해당 프로젝트를 추가합니다.
8. yarn install

</details>

## 훕치치 협업 컨벤션

### Commit

| 태그 이름 | 설명                                                  |
| --------- | ----------------------------------------------------- |
| feat      | 새로운 기능 추가                                      |
| fix       | 버그를 고친 경우                                      |
| style     | CSS 등 사용자 UI 디자인 변경                          |
| refactor  | 기능 추가에 해당되지 않는 코드 리팩토링               |
| perf      | 퍼포먼스를 향상시키는 변경사항                        |
| docs      | 문서를 수정한 경우                                    |
| test      | 테스트 관련 변경사항                                  |
| ci        | CI 환경설정과 스크립트에 변화가 있는 경우             |
| build     | 외부 의존성 설치나 빌드 시스템에 영향을 주는 변경사항 |

### git

- github branch 전략 사용(main + create new release)

- `git rebase -i HEAD~n → push`

- `squash and merge` 사용

### Naming

- Type Naming
  - 컴포넌트의 Props = `${컴포넌트명}Props`
  - API
    - 요청 타입 = `${데이터명(단수)}Payload`
      e.g. postComments의 body = CommentPayload
    - 응답 타입 = `${데이터명(단수)}Type`
      e.g. getComments의 response = CommentType
- File Naming
  - 자료구조 = `${data}s`
    e.g. 코드 내에서 쓰일 땐 getComments
  - 파일명 = `${data}List`
    e.g. 파일명에서 쓰일 땐 CommentList.tsx

## References

<ol>
  <li><a href="https://techblog.woowahan.com/7976/">우아한 기술블로그: Yarn berry workspace를 활용한 프론트엔드 모노레포 구축기</a></li>
  <li><a href="https://channel.io/ko/blog/monorepo-in-operation">채널톡: 프론트엔드 프로젝트 최신화 - 2편 : 모노레포</a></li>
  <li><a href="https://www.testbank.ai/42b54c4b-2aa7-4bc7-b29b-b7219c700f22">테스트뱅크: Yarn workspace로 모노레포 알아보기</a></li>
  <li><a href="https://velog.io/@minboykim/Yarn-berry%EB%A1%9C-%EB%AA%A8%EB%85%B8%EB%A0%88%ED%8F%AC-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0">Velog: Yarn berry로 모노레포 구성하기</a></li>
  <li><a href="https://velog.io/@sooran/tsconfig.json-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%95%8C%EA%B3%A0-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0">Velog: { tsconfig.json } 제대로 알고 사용하기</a></li>
</ol>

## TroubleShooting

<ol>
  <li><a href="https://github.com/yarnpkg/berry/issues/5989#issuecomment-1846996967">@typescript-eslint/utils@npm:6.18.1: No candidates found</a></li>
  <li><a href="https://github.com/yarnpkg/yarn/issues/8580">warning Workspaces can only be enabled in private projects.</a></li>
  <li>
    <div>local cache? global cache?</div>
    <ul>
    <li>
      <a href="https://yarnpkg.com/configuration/yarnrc#cacheFolder">cacheFolder</a>
    </li>
    <li>
      <a href="https://yarnpkg.com/configuration/yarnrc#enableGlobalCache">enableGlobalCache</a>
    </li>
    <li>
      <a href="https://yarnpkg.com/configuration/yarnrc#enableMirror">enableMirror</a>
    </li>
    <li>
      <a href="https://yarnpkg.com/configuration/yarnrc#globalFolder">globalFolder</a>
    </li>
    </ul>
  </li>
  <li>
    <a href="https://github.com/yarnpkg/berry/issues/3399">[Bug?]: Multi-folder VSCode workspaces not supported/ Documentation unclear</a>
  </li>
</ol>
