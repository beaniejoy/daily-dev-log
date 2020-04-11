> - 200411 study log
> - spring-boot, IntelliJ  

## 🔖 1. @RestController

```java
@Controller
@ResponseBody
//@RestController
public class HelloWorldController {

}
```
```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Controller
@ResponseBody
public @interface RestController {
}
```
@RestController에는 @Controller와 @ResponseBody 둘다 포함하고 있다.  
@ResponseBody는 JSON 객체(데이터)를 주고 받기 위해서 사용한다.  
([@ResponseBody, @RequestBody 사용 예시](https://webcoding.tistory.com/entry/Spring-%EC%8A%A4%ED%94%84%EB%A7%81-RequestBody-ResponseBody-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-1))


## 🔖 2. gradlew bootRun을 통한 WAR실행

```bash
$ gradlew bootRun
```
gradle wrapper를 이용한 프로젝트 실행을 할 수 있다.  
bootRun은 WAS서버를 띄운다.  

bootRun 중 에러 발생 가능성
```bash
Description:
Web server failed to start. Port 8080 was already in use.
Action:
Identify and stop the process that's listening on port 8080 or configure this application to listen on another port.
...
> Task :bootRun FAILED
```
```bash
$ netstat -ao |find /i "listening"
...
TCP    0.0.0.0:8080           DESKTOP      LISTENING       20660
...
$ Taskkill /F /IM 20660
성공: 프로세스(PID 20660)가 종료되었습니다.
```
이미 8080포트가 서버작동 중에 있어서 그런 것 같다. 그래서 해당 포트를 kill을 해주어야 WAS를 실행시킬 수 있다.
- [링크참고](https://soye0n.tistory.com/94)


## 🔖 3. MockMvc

```java
@RestController
public class HelloWorldController {
    @GetMapping(value = "/api/helloworld")
    public String helloWorld(){
        return "Hello World Joy!!";
    }
}
```
```java
@SpringBootTest
class HelloWorldControllerTests {

    @Autowired
    private HelloWorldController helloWorldController;

    @Test
    void helloWorld(){
//        System.out.println("test");
        System.out.println(helloWorldController.helloWorld());
        assertEquals(helloWorldController.helloWorld(), "Hello World Joy!!");
    }

}
```
위의 방식은 Controller의 Http GET Method를 아예 무시하고 그냥 @Autowired를 통한 Bean을 주입받아 하나의 객체의 메서드로 사용한 것이다.  
- Http를 사용한 Test: MockMvc Test를 통해 모의 http request, response 객체를 만들어서 test를 진행.

```java
    private MockMvc mockMvc;
    
    @Test
    void mockMvcTest() throws Exception {
        mockMvc = MockMvcBuilders.standaloneSetup(helloWorldController).build();

        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/helloworld")
        )
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().
                        string("Hello World Joy!!"));
    }
```
위의 작업을 아래와 같이 MockMvc를 @Autowired통해 객체생성하는 방법도 있다.
```java
    @Autowired
    private MockMvc mockMvc;
```
@Autowired를 통해 객체를 생성하면 아래 부분은 생략해도 된다.
```java
    mockMvc = MockMvcBuilders.standaloneSetup(helloWorldController).build();
```

## 🔖 4. JpaRepository vs CrudRepository
요약
- CrudRepository : CRUD 관련 기능들을 제공
- PagingAndSortingRepository : 페이징 및 sorting 관련 기능들 제공
- JpaRepository : JPA 관련 특화 기능들 (ex. flushing, 배치성 작업) 등 (+ CrudRepository와 PagingAndSortingRepository의 기능들)
- [Jpa vs Crud Repository 링크](https://blog.naver.com/writer0713/221587319282)






