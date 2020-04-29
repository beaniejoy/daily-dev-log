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

### ORM
- Object Oriented Mapping



## JPA

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


## Hibernate

### JPA 사용방법
- Repository


```java
Optional<Cafe> findById(Long id);
```

```java
Page<Cafe> findAllByNameContaining(String phrase, Pageable pageable);
```


```java
List<ScoreSet> findTop5ByOrderByMoodDesc();
```

### (Spring Data JPA)


## JPA 참고 링크
- [Spring Data JPA docs](https://docs.spring.io/spring-data/jpa/docs/2.2.6.RELEASE/reference/html/#reference)
- [JPA 개념](https://gmlwjd9405.github.io/2019/08/04/what-is-jpa.html)