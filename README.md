# trip & pace #

## 1. 프로젝트 에 대하여

### 프로젝트 개요

- 여행, 장소에 대한 정보, 후기 공유 기록 (일기장 처럼 쓰였으면 좋겠다)

- 개인적인 용도 + SNS 용도

## 2. 환경

개발 서버를 실행시키기 위한 일련의 과정은 아래와 같음

```
1. [ cd memopad_web ]을 입력하여 프로젝트 경로로 들어옵니다.
2. [ yarn install ]을 입력하여 의존성을 띠고있는 노드 모듈들을 일괄 설치합니다.
3. [ yarn start ]를 입력하여 실행 스크립트를 호출합니다.
```
단, 2번 항목의 경우 최근 npm install 수행 이후 package.json에 추가기술된 의존성이 없는 경우 생략 가능

### 배포환경

배포 스크립트는 아래와 같음.

```
yarn build
```

trip & place 웹의 nginx 서버는 root 경로를 다음 경로로 바라보도록 설정되어 있습니다.

```
memopad_web/build/index.html
```