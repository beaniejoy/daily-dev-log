# JPA(Java Persistence API)

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

```gradle
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
```

## 🔖 ORM
- Object Oriented Mapping

<br>

## 🔖 JPA

- Java ORM 기술에 대한 API 표준 명세
- ORM을 사용하기 위한 인터페이스 모음(라이브러리)
- Java Application에서 RDBMs(관계형 데이터베이스)를 사용하는 방식을 정의한 인터페이스
- 여러 구현체들이 존재: Hibernate, OpenJPA, EclipseLink, DataNucleus, TopLink 등이 존재(Hibernate를 주로 이용)
- 
<p><img src="https://user-images.githubusercontent.com/41675375/80363173-c9dba400-88be-11ea-91dc-f9720912d9ae.png" width="600" height="250"></p>

### 장점
- 객체 지향적인 코드 -> 더 직관적이고 business logic에 집중할 수 있다.


### 단점
- 어렵기 때문에 학습에 시간을 필요로 한다.

<br>

## 🔖 Hibernate
- JPA에서 가장 유명한 라이브러리
- Spring Data JPA를 활용해 더욱 쉽게 사용

<br>

## 🔖 JPA 사용방법

> - Entity(table) -> Repository(Query)
> - Repository -> Service(Business Logic) -> Controller(View)

### ▶ Entity

```java
@Entity
@Data
@Builder
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class Cafe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    private String name;

    private String address;

    private String imgUrl;

    private LocalTime opertimeStart;

    private LocalTime opertimeEnd;

    private String phoneNumber;
}
```
- `@Entity`: 설정을 통해 Entity임을 설정(table 설정)
- `@Id`: 고유 number를 부여(primary key 적용)
- `@GeneratedValue`: Auto Incremental(1씩 자동 증가)설정


### ▶ Service


### ▶ Controller


### ▶ Repository

```java
Optional<Cafe> findById(Long id);
```
- Id 칼럼을 기준으로 SELECT 조회하겠다.
- primary key를 기준으로 하기에 하나의 객체만 반환한다.
- 해당 데이터가 없는 경우가 있기 때문에 `Optional`부여
- `SELECT * FROM Cafe WHERE id = ?1`처럼 작동

```java
Page<Cafe> findAllByNameContaining(String phrase, Pageable pageable);
```


```java
List<ScoreSet> findTop5ByOrderByMoodDesc();
```

```java
@Query(value = "SELECT avg(mood), avg(light), avg(price), avg(taste) FROM review r WHERE r.cafe_id = ?1",
        nativeQuery = true)
Object findAverageByCafeId(Long cafeId);
```
- 평균값 계산 결과 데이터를 반환
- `Object`로 반환한다(**`Object[]`는 에러가 발생 <- 왜그런지 알아볼 것**)

```java
Object result = reviewRepository.findAverageByCafeId(1L);
Object[] out = (Object[]) result;

log.info(String.valueOf(out[0]));
log.info(String.valueOf(out[1]));
log.info(String.valueOf(out[2]));
log.info(String.valueOf(out[3]));
```
- 이런 식으로 `Object[]`로 casting한 후 각각 칼럼에 대해 추출하면 된다.

<br>

## 🔖 JPA 참고 링크
- [Spring Data JPA docs](https://docs.spring.io/spring-data/jpa/docs/2.2.6.RELEASE/reference/html/#reference)
- [JPA 개념](https://gmlwjd9405.github.io/2019/08/04/what-is-jpa.html)