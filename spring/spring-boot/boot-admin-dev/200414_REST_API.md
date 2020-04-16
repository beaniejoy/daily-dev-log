> - 200414 study log
> - spring-boot, admin
> - MySQL, IntelliJ

## 🔖 1. HTTP - GET Method

- 주소창에 파라미터가 노출된다.
- 브라우저에서 주소에 대한 캐시가 이루어지기에 정보를 얻을 때 사용한다.

```java
    @RequestMapping(method = RequestMethod.GET, path = "/getMethod") // localhost:8080/api/getMethod
    public String getRequest() {
        return "Hi getMethod";
    }
```
```java
    @GetMapping("/getParameter") // localhost:8080/api/getParameter?id=1234&password=abcd
    public String getParameter(@RequestParam String id, @RequestParam(name = "password") String pwd) {
        System.out.println("id : " + id);
        System.out.println("password : " + pwd);
        return id + pwd;
    }
```
```java
    // localhost:8080/api/getMultiParameter?account=abcd&email=study@gmail.com&page=30
    @GetMapping("/getMultiParameter")
    public SearchParam getMultiParameter(SearchParam searchParam){
        System.out.println("account : " + searchParam.getAccount());
        System.out.println("email : " + searchParam.getEmail());
        System.out.println("page : " + searchParam.getPage());

        // {"account":"abcd","email":"study@gmail.com","page":30}
        return searchParam;
    }
```
- HTTP 통신 규격에서 JSON을 표준으로 사용하고 있기 때문에 Spring Boot에서 이를 기본적으로 제공
- jackson 라이브러리를 제공해줌

## 🔖 2. HTTP - POST Method

- 주소 창에 파라미터가 노출되지 않는다.
- 주소 창에 사용자 요청 사항이 노출 되지 않는다.
- Get 방식에는 주소 길이 제한이 있지만 POST는 그보다 길게 사용 가능(제한은 존재)
- 브라우저가 주소 캐시를 하지 못하는 특성이 있다.
```java
    // 1. HTTP <form> tag
    // 2. ajax 비동기 검색
    // 3. http post body -> data (post body에 data를 담아서 보낼 때)
    // json, xml, multipart-form / text-plain

    @PostMapping(value = "/postMethod")
    public SearchParam postMethod(@RequestBody SearchParam searchParam) {
        return searchParam;
    }
```

- Chorme - [도구 더보기] - [확장 프로그램] - [Chrome 웹스토어 열기]
- 여기서 REST API Test에 대한 확장프로그램 설치 (Talend API Tester 다운 받음)
- 확장 프로그램을 통해서 POST Method를 실험해볼 수 있다.
- 이외에도 PUT/PATCH 등 수정을 할 수 있는 API도 존재한다.

## 🔖 3. REST API
|HTTP Method|작동|URL|
|:---:|:---:|:---:|
|`GET`|  SELECT(조회)  |`/user/{id}`
|`POST`|  CREATE(생성)  |`/user`
|`PUT/PATCH`|  UPDATE(수정)  |`/user`
|`DELETE`|  DELETE(삭제)  |`/user/{id}`



## 🔖 기타 사항

```java
@RestController
@RequestMapping("/api")
public class PostController {

}

@RestController
@RequestMapping("/api")
public class GetController {

}
```
- Class 단위의 RequestMapping의 주소가 같아도 정상적으로 동작한다.
- Class내의 Method 단위에서 주소가 중복이 되는 것이 있으면 오류가 발생한다.

