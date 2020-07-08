# ajax 비동기 처리


## jQuery를 이용한 ajax

### jQuery ajax 기본 뼈대

```js
$.ajax({
            type: ['GET' or 'POST'],
            url: [Request할 URL],
            async: true,
            data: [서버에 보낼 data],
            contentType: [header에 담아 보낼 contentType 지정]
            dataType: [서버에서 반환해줄 데이터 형식],
            beforeSend: function () {
              [ajax 통신 전 처리할 코드]
            },
            complete: function () {
              [ajax 통신 완료 후 처리할 코드]
            },            
            success: function (data) {
              [통신 성공 시 처리할 코드]
            },
            error: function(error) {
              [통신 실패시 처리할 코드]
            }
        })
```
- `type`: 요청할 형태, `'GET'`,`'POST'`등이 많이 사용.
- `url`: 요청을 보낼 URL
- `async`: 비동기 통신 flag, 기본값 `true`(비동기 통신), `false로` 설정시 동기 처리가 될 수 있음에 주의
- `data`: 서버에 보낼 data. 
- `contentType`: 서버에 데이터를 보낼 때 사용하는 데이터 형식 지정.
  - 기본 값은 `application/x-www-form-urlencoded; charset=UTF-8`
- `dataType`: 서버에서 반환되는 데이터 형식을 지정
  - `xml`: XML 문서 형태
  - `html`: html문서를 텍스트 데이터로 처리
  - `script`: javascript 코드가 텍스트 데이터로 반환, cache 옵션을 따로 설정하지 않으면 자동 비활성화
  - `json`: JSON 형식 데이터로 평가하고 javascript 객체로 반환
  - **`jsonp`**: JSONP 요청을 부르고 callback 매개 변수에 지정된 함수 회수 값을 JSON 데이터로 처리 (jQuery 1.2 추가) (**다시 볼 것**)
  - `text`: 일반 텍스트
- `beforeSend`: ajax 요청이 전송되기 전에 호출되는 함수, 반환 값을 `false로` 하면 ajax 전송을 취소할 수 있음
- `complete`: ajax 요청이 완료된 후 호출되는 함수, `success`/`error`가 호출된 이후 호출된다.
- `success`: 요청이 성공할 경우 호출할 함수 설정
- `error`: 요청이 실패할 경우 호출할 함수 설정

### JSONP의 개념

`JSONP`: JSON with Padding  

<br>

javascript는 서로 다른 도메인에 대한 요청을 보안상 제한한다. 이 정책을 `동일근원정책(Same-Origin Policy, SOP)` 정책이라고 하며, 이러한 정책으로 인해 생기는 이슈를 `cross-domain` 문제라고 합니다. 하지만 개발하면서 다른 도메인으로부터 데이터를 가져와야하는 상황이 발생할 수 있다. cross-domain 이슈를 해결하기 위해 JSONP(JSON with Padding)를 사용한다.


## 참고 링크

- [jQuery 옵션 정리 블로그](https://m.blog.naver.com/PostView.nhn?blogId=software705&logNo=220969995944&proxyReferer=https:%2F%2Fwww.google.com%2F)
- [JSONP의 개념 정리](https://kingbbode.tistory.com/26)
