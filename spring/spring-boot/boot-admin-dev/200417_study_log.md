> - 200417 study log
> - spring-boot, admin
> - MySQL, IntelliJ

## 🔖 1. ERD에 따라 Entity와 Repository 구성

```
entity
    - AdminUser
    - Category
    - Item
    - OrderDetail
    - Partner
    - User
repository
    - AdminUserRepository
    - CategoryRepository
    - ItemRepository
    - OrderDetailRepository
    - PartnerRepository
    - UserRepository
```

이렇게 DB Table에 맞춰서 entity와 repository 인터페이스를 만든다.

<br>
<br>


## 🔖 2. AuditorAware로 createdAt, createdBy (update 포함) 자동 설정하기

```
com.project.ex
    - component
        - LoginUserAuditorAware.java
    - config
        - JpaConfig.java

```
이런 식으로 패키지를 구성하고 그 안에 Config class와 AuditorAware에 대한 class를 생성한다.
<br>

```java
@Configuration
@EnableJpaAuditing
public class JpaConfig {

}
```
JpaConfig를 통해 Jpa에 대한 Auditing(일종의 감시자)를 설정한다.
<br>


```java
@Component
public class LoginUserAuditorAware implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.of("AdminServer");
    }
}
```
이렇게 AuditorAware interface를 상속받는 class를 생성하고 String type으로 지정해준다.  
그리고 Overriding을 통해 메서드를 상속받아 defualt return값을 설정한다.

<br>


```java
@Entity
@EntityListeners(AuditingEntityListener.class)
public class AdminUser {
    @CreatedDate
    private LocalDateTime createdAt;

    @CreatedBy
    private String createdBy;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @LastModifiedBy
    private String updatedBy;
}
```
- `@EntityListeners`를 통해 AuditingEntityListener를 사용하겠다고 설정한다.
- 그리고 `@CreatedDate(By)`와 `@LastModifiedDate(By)`를 설정하면 위의 `LoginUserAuditorAware`의 관리를 받는다.
- 관리 대상인 변수들을 생성할 때 **default 값으로 String에는 "AdminServer"가 DateTime에는 저장한 Time을 자동적으로 저장한다.**
<br>

```java
    @Test
    public void create() {

        AdminUser adminUser = new AdminUser();

        adminUser.setAccount("AdminUser02");
        adminUser.setPassword("AdminUser02");
        adminUser.setStatus("REGISTERED");
        adminUser.setRole("PARTNER");

        AdminUser newAdminUser = adminUserRepository.save(adminUser);
        assertNotNull(newAdminUser);

        newAdminUser.setStatus("Updated");
        adminUserRepository.save(newAdminUser);
    }
```
- 처음 save에서 새로운 row에 데이터를 저장하고 그 반환값에 Status값을 변경한다.
- 변경한 `newAdminUser`를 다시 save하면 update query가 실행된다.
- **update하게 되면 `@LastModifiedDate(By)`에 의해 수정된 날짜 및 default return값이 들어가게 된다.**

<br>
<br>


## 🔖 3. Builder/Chain Pattern

<br>

### Builder Pattern으로 객체 생성하기

```java
@Builder
```
```java
User user = User.builder()
    .account("Test")
    .password("aaaa")
    .status("REGISTERED")
    .email("Test@example.com")
    .build()
```
이런 builder pattern을 이용하면 원하는 데이터로만 구성된 변수들로 객체를 생성할 수 있다.
<br>


### Chain Pattern으로 update시 데이터 변경하기

```java
@Accessors(chain = true)
```
```java
User user = UserRepository.findById(1L);

user.setEmail("Test@example.com")
    .setPhoneNumber("010-1111-1111")
    .setStatus("REGISTERED");
```
chain pattern을 이용해 update할 때 set을 가지고 꼬리지어서(chain) 데이터를 바꿔줄 수 있다.
<br>

```java
User user = new User.setEmail("Test@example.com")
                    .setPhoneNumber("010-1111-1111")
                    .setStatus("REGISTERED");
```
이런식으로 chain을 이용해 생성자 설정을 해줄 수 있다.

