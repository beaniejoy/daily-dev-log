# Dev Log: cagong-ranking-project
[cagong-ranking-project](https://github.com/hanbinleejoy/cagong-ranking-project) 개발하면서 기록한 일지 

> - Spring Boot
> - Gradle
> - IntelliJ
> - Thymeleaf

## 🏷️ 주요 사항

- [handlebars 기본 사용법 (200412)](https://github.com/hanbinleejoy/daily-dev-log/blob/master/project/cagong-ranking-project/dev-log/200412_dev_log.md)
- thymeleaf를 이용한 front 구성
  - [About thymeleaf](https://github.com/hanbinleejoy/daily-dev-log/tree/master/spring/thymeleaf)
- [Pagination 구성하기 (200425)](https://github.com/hanbinleejoy/daily-dev-log/blob/master/project/cagong-ranking-project/dev-log/200425_dev_log.md)
- [AWS 설정과 관련된 log](https://github.com/hanbinleejoy/daily-dev-log/blob/master/project/cagong-ranking-project/AWS_설정에_대한_정리.md)


## 🏷️ To Do List

- **login**
  - login 처리: token 이용(JWT)
  - submit 버튼, 입력 조건에 맞는 경우만 활성화되도록 수정
- **review**
  - Comment table 분리해 Youtube 댓글 작성 기능처럼 만들기
    - Response, Repository, Service, Controller 완전 분리
    - 현재는 Review의 comment 칼럼을 가지고 접근
- **view**
  - 댓글 0개 일때 처리하는 문제 해결할 것 
  - 댓글리스트 height 댓글 개수에 따라 동적으로 변화하도록 만들 것
- **etc.**
  - controller refactoring을 통해 코드 정리하기
  - CafeNotFound, ScoreSetNotFound 등 Exception에 대한 handling 처리
  - 세련된 design 작업
  - contextPath를 이용한 href(url) 설정하기
  
