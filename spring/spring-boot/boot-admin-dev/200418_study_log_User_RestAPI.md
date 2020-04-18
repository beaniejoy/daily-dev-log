> - 200418 study log
> - spring-boot, admin
> - MySQL, IntelliJ

## 🔖 Front와 소통

Header - Data - Paging으로 나누어 Response를 보낸다.


### JSON에 snake case로 데이터 보내기

```java
    // json에 보낼 때 해당 이름으로 지정해준다.
    @JsonProperty("transaction_time") 
    private String transactionTime;
```
위 보다 아래 설정으로 하는 것이 좋다:
```properties
spring.jackson.property-naming-strategy=SNAKE_CASE
```
개발 할 때는 camel case로 하고 데이터를 주고 받을 때는 snake case

### 프로젝트 패키지 구성
```
project
    - controller
        - api
            - [UserApiController.java]
    - interfaces
        - [CrudInterface.java(interface)]
    - model
        - entity
        - network
            - request
                - [UserApiRequest.java]
            - response
                - [UserApiResponse.java]
            Header.java
    - service
        - [UserApiLogicService.java]
```

### Header class 만들기
```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Header<T> {
   
    // api 통신시간
    // ISO, YYYY-MM-DD hh:mm:ss 등 여러가지로 맞출 수 있다.
    private LocalDateTime transactionTime; 
    
    // api 응답코드
    private String resultCode;

    // api 부가 설명
    private String description;

    private T data;

    // OK
    public static <T> Header<T> OK() {
        return (Header<T>) Header.builder()
                .transactionTime(LocalDateTime.now())
                .resultCode("OK")
                .description("OK")
                .build();
    }

    // Data가 있는 OK
    public static <T> Header<T> OK(T data) {
        return (Header<T>) Header.builder()
                .transactionTime(LocalDateTime.now())
                .resultCode("OK")
                .description("OK")
                .data(data)
                .build();
    }

    // Error
    public static <T> Header<T> ERROR(String description) {
        return (Header<T>) Header.builder()
                .transactionTime(LocalDateTime.now())
                .resultCode("ERROR")
                .description(description)
                .build();
    }
}
```
- `private LocalDateTime transactionTime; `: LocalDateTime으로 할 수 있지만 front와 통신할 때는 String  
  하지만 여기선 기본 defalut에 맞출 것이기에 일단 LocalDateTime으로
- Header 클래스는 `header`부분과 `data`부분으로 나뉜다.
- `header`: api 통신시간, api 응답코드, api 부가설명
- `data`: Reqeust, Response에 주고받는 실제 데이터 내용


### Crud Interface Generic으로 구성하기

```java
public class UserApiController implements CrudInterface<UserApiRequest, UserApiReponse> {
}
```
```java
public interface CrudInterface<Req, Res> {

    // todo request object 추가
    Header<Res> create(Header<Req> request);
}
```
이런식으로 CrudInterface를 Generic으로 선언해 다른 ApiController에 다른 형태의 ApiRequest(Response)가 들어와도 선언할 수 있도록 만든다.

<br>
<br>


## 🔖 1. Header **Create** 구성

Create이므로 PostMapping방식:
```java
// UserApiController.java
@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserApiController implements CrudInterface<UserApiRequest, UserApiResponse> {

    @Autowired
    private UserApiLogicService userApiLogicService;

    @Override
    @PostMapping("") // /api/user
    public Header<UserApiResponse> create(@RequestBody Header<UserApiRequest> request) {
        log.info("{}", request);
        return userApiLogicService.create(request);
    }
```
- `@Slf4j`를 통해 log 출력
- `UserApiLogicService`에 보내기 위해 request 객체 형태로 받는다.

```java
// UserApiLogicService.java
    @Override
    public Header<UserApiResponse> create(Header<UserApiRequest> request) {
        // 1. request data
        UserApiRequest userApiRequest = request.getData();

        // 2. user 생성
        User user = User.builder()
                .account(userApiRequest.getAccount())
                .password(userApiRequest.getPassword())
                .status("REGISTERED")
                .email(userApiRequest.getEmail())
                .phoneNumber(userApiRequest.getPhoneNumber())
                .registeredAt(LocalDateTime.now())
                .build();

        User newUser = userRepository.save(user);

        // 3. 생성된 데이터 -> UserApiResponse return
        return response(newUser);
    }
```
1. Request Data
2. User 생성
3. 생성된 데이터 -> UserApiResponse return 하기  

<br>


여기서 User -> UserApiResponse하고 Header에 더해주는 과정 필요:
```java
    private Header<UserApiResponse> response(User user) {
        // user -> userApiResponse
        UserApiResponse userApiResponse = UserApiResponse.builder()
                .id(user.getId())
                .account(user.getAccount())
                .password(user.getPassword()) // todo: 암호화, 길이
                .status(user.getStatus())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .registeredAt(user.getRegisteredAt())
                .unregisteredAt(user.getUnregisteredAt())
                .build();

        // Header + data return
        return Header.OK(userApiResponse);
    }
```
> **정리**
> - 이렇게 하면 Request로 받은 Header(+ data) 정보를 가져오고
> - 받은 Header정보에서 data를 꺼내 DB에 저장하고 다시 Header에 붙여서 반환해준다.


## 🔖 2. Header **Read** 구성


```java
// UserApiLogicService.java
    @Override
    public Header<UserApiResponse> read(Long id) {

        // id -> repository getOne, getById
        Optional<User> optionalUser = userRepository.findById(id);

        // user -> userApiResponse return
        return optionalUser.map(user -> response(user))
                .orElseGet(
                        () -> Header.ERROR("데이터 없음")
                );
    }
```
위에 처럼 Optional로 받아서 있는 경우 response 메서드로 Header를 만들어 반환하거나  
select된 user가 없는 경우 ERROR로 만들어 반환하는 방법이 있다.  

위의 코드를 Refactoring하면 다음과 같다:
```java
    @Override
    public Header<UserApiResponse> read(Long id) {

        return userRepository.findById(id)
                .map(this::response)
                .orElseGet(
                        () -> Header.ERROR("데이터 없음")
                );
    }
```
lambda 함수 부분을 `this::response`로 바꿀 수 있다.


## 🔖 3. Header **Update** 구성

```java
    @Override
    public Header<UserApiResponse> update(Header<UserApiRequest> request) {

        // 1. data get
        UserApiRequest userApiRequest = request.getData();

        // 2. id -> user 데이터 찾기
        Optional<User> optionalUser = userRepository.findById(userApiRequest.getId());

        return optionalUser.map(user -> {
            // 3. update
            user.setAccount(userApiRequest.getAccount())
                    .setPassword(userApiRequest.getPassword())
                    .setStatus(userApiRequest.getStatus())
                    .setEmail(userApiRequest.getEmail())
                    .setPhoneNumber(userApiRequest.getPhoneNumber())
                    .setRegisteredAt(userApiRequest.getRegisteredAt())
                    .setUnregisteredAt(userApiRequest.getUnregisteredAt());

            return user;
        })
                .map(user -> userRepository.save(user)) // 실질적인 update 작동 -> update된 user객체 반환
                .map(updateUser -> response(updateUser)) // userApiResponse 만들어짐
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }
```
1. data를 Header로부터 얻어온다.
2. id를 가지고 Repository에서 data를 가져온다.
3. lambda를 이용해 user가 있으면 setter로 데이터 내용을 바꿔준다.
4. 바꾼 데이터를 save를 통해 넣어준다. 여기서 id가 DB안에 있기 때문에 update를 알아서 수행해준다.
5. save 후 return값을 Response객체로 바꾸고 Header와 합쳐서 반환해준다.
6. 만약 해당 id의 데이터가 없을 경우 ERROR Header객체를 반환한다.



## 🔖 4. Header **Delete** 구성

```java
    @Override
    public Header delete(Long id) {
        // 1. id -> repository : data 찾기
        Optional<User> optionalUser = userRepository.findById(id);

        // 2. repository -> delete
        return optionalUser.map(user -> {
            userRepository.delete(user);
            return Header.OK();
        })
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }
```
1. id를 가지고 Repository에서 data를 가져온다.
2. 가져온 데이터를 delete시켜준다. 그리고 OK Header를 반환한다. (데이터 포함 X)
3. 만약 해당 id의 데이터가 없을 경우 ERROR Header객체를 반환한다.

> **Request와 Response는 구성이 거의 비슷한데 왜 따로 구별지어서 만들어 둔 것일까?**  
> 그 때 그 때 스펙 요구에 따라 Reqeust와 Response 객체의 내용이 바뀌기 때문에 그렇다.  
> 수정을 할 때 손이 가는 것을 방지할 수 있다.