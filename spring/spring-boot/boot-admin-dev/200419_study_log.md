> - 200419 study log
> - spring-boot, admin
> - MySQL, IntelliJ

## 🔖 1. Enum Class로 type 유형 강제하기

> - Enum Class로 유형의 수가 정해져 있는 (category성격을 가진) 변수들의 name을 강제할 수 있다.
> - Enum으로 관리하면 유형 name에 대한 오타를 방지할 수 있다.
> - REGISTERED, REGISTER 등 표현에 대해 하나의 표현으로 강제하여 통일성을 가질 수 있다.

<br>

```java
// User.java
    private String status; 
```
본래 User Entity의 status변수는 String type이었다.  
하지만 이 변수의 유형은 정해져 있다. (`REGISTERED`, `UNREGISTERED`, `WAITING` 등등)  
이것을 Enum으로 관리해보자

<br>

```java
// UserStatus.java (enum class)
@Getter
@AllArgsConstructor
public enum UserStatus {

    // index id, title(front 노출), description(상세설명)
    REGISTERED(0, "등록", "사용자 등록상태"),
    UNREGISTERED(1, "해지","사용자 해지상태");

    private Integer id;
    private String title;
    private String description;
}
```
이런 식으로 `REGISTERED`, `UNREGISTERED`에 대해 type을 강제할 수 있다.  

만약 두 개의 type이 아닌 다른 값을 post, update 때 넣으려고 하면 `JSON parse error` 에러가 발생한다.

<br>

```java
    User user = User.builder()
            .account(userApiRequest.getAccount())
            .password(userApiRequest.getPassword())
            .status(UserStatus.REGISTERED)
            .email(userApiRequest.getEmail())
            .phoneNumber(userApiRequest.getPhoneNumber())
            .registeredAt(LocalDateTime.now())
            .build();

    User newUser = userRepository.save(user);
```

여기서 `UserStatus.REGISTERED`를 통해서 해당 값을 넣어줄 수 있다.

<br>

```java
String title = user.getStatus().getTitle()
```
이런 방식으로 UserStatus안에 title, description을 사용할 수 있다.

<br>
<br>

## 🔖 2. **추상화를 통해 Controller Refactoring**

> - Controller마다 반복되는 코드 구문들을 하나로 통합해 코드의 경제성 추구
> - CRUD를 강제해 실수 방지
> - 보기에 상당히 깔끔하고 효율적이다.

```java
// CrudController.java (abstract class with generic)
public abstract class CrudController<Req, Res> implements CrudInterface<Req, Res> {

    protected CrudInterface<Req, Res> baseService;

    @Override
    @PostMapping("")
    public Header<Res> create(@RequestBody Header<Req> request) {
        return baseService.create(request);
    }

    @Override
    @GetMapping("{id}")
    public Header<Res> read(@PathVariable Long id) {
        return baseService.read(id);
    }

    @Override
    @PutMapping("")
    public Header<Res> update(@RequestBody Header<Req> request) {
        return baseService.update(request);
    }

    @Override
    @DeleteMapping("{id}")
    public Header delete(@PathVariable Long id) {
        return baseService.delete(id);
    }
}
```
`CrudInterface`를 상속받는 추상클래스 `CrudController`를 생성한다.

<br>

```java
@RestController
@RequestMapping("/api/item")
public class ItemApiController extends CrudController<ItemApiRequest, ItemApiResponse> {

    @Autowired
    private ItemApiLogicService itemApiLogicService;

    @PostConstruct
    public void init(){
        this.baseService = itemApiLogicService;
    }

}
```
- 실제 구현할 Controller에서는 `CrudInterface`를 implements하는 것이 아니라 추상클래스를 상속받는다.  
- `protected CrudInterface<Req, Res> baseService;` baseService를 Autowired로 주입 받은 실제 Service bean객체로 설정해야 한다.  
- `protected`는 상속받은 class에 대해서만 사용하도록 제한하는 접근한정자(access modifier)다.
- `@PostConstruct`는 static method와 비슷하게 작동하기에 이를 통해 baseService에 실제 Service bean 객체를 주입한다.

<br>
<br>

## 🔖 3. **추상화를 통해 Service Refactoring**

```java
```


