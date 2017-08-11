# memopad_web #

## 1. memopad 에 대하여 ##

### 프로젝트 개요 ###

- React, Redux등의 기술을 이용하여 기록을 위한 서비스를 제공

- SNS와 같이 개인의 의견을 표현할수 있는 서비스

- 개인적인 용도의 기록을 할수 있는 서비스

### 사용 기술 ###

React, Redux, Sass

### 보일러 플레이트 ###

create-react-app

## 2. 환경 ##

### 개발환경 ###

개발 서버는 WebpackDevServer를 사용

개발 서버를 실행시키기 위한 일련의 과정은 아래와 같음

```
1. [ cd memopad_web ]을 입력하여 프로젝트 경로로 들어옵니다.
2. [ npm install ]을 입력하여 의존성을 띠고있는 노드 모듈들을 일괄 설치합니다.
3. [ npm run start ]를 입력하여 실행 스크립트를 호출합니다.
단, 2번 항목의 경우 최근 npm install 수행 이후 package.json에 추가기술된 의존성이 없는 경우 생략 가능
```

### 배포환경 ###

빈플레이트 웹의 배포환경은 아래와 같이 세가지 종류가 있습니다.

1. 개발
2. 베타
3. 라이브

각 배포환경에 대한 실행 스크립트는 아래와 같음.

```
개발 - npm run build
베타 - npm run beta
라이브 - npm run live
```

각각의 스크립트가 수행하는 동작을 간략히 표현하면 아래와 같습니다.

```
1. package.json에 명시된 의존성에 의거하여 어플리케이션 실행이 필요한 일련의 노드 모듈을 설치한다.
2. 웹팩 빌드를 수행하여 [ ${binplate_web}/build ] 위치에 산출물을 생성한다.
3. 기존에 [ ${binplate_web}/dist ] 디렉토리가 있다면 삭제하고, [ ${binplate_web}/build ] 디렉토리의 내용을 [ ${binplate_web}/dist ] 디렉토리로 복사한다.
```

위와 같이 배포 스크립트가 일련의 과정을 수행하고 나면 빈플레이트 웹에 접속할 수 있습니다.

빈플레이트 웹의 nginx 서버는 root 경로를 다음 경로로 바라보도록 설정되어 있습니다.

```
${binplate_web}/dist/index.html
```
