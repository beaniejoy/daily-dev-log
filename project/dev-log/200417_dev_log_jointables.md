> - 200417 dev log
> - cagong-ranking-project  
> - spring-boot, MySQL, IntelliJ  


## 🔖 1. Join을 이용한 ERD 구성

> - 본격적으로 join의 foreign key를 이용한 Entity 적용을 위해 ERD 구성부터 진행
> - 추후에 ERD 수정 계획

### ERD 구성 (완성단계 X)
<p><img src="https://user-images.githubusercontent.com/41675375/79569094-f68b0100-80f1-11ea-9d29-e6fb87b29bf1.png" width="800" height="600"></p>
- user : review = 1 : N
- cafe : review = 1 : N
- cafe : cafe_menu = 1 : N
- cafe : score_set = 1 : 1


## 🔖 2. 실제 Entity 구성

Entity 대상으로 다음과 같이 Annotation을 추가: 
```java
@Entity
@Data
@Builder
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@ToString(exclude = {"cafeMenuList", "reviewList"})
public class Cafe {
```
- `@ToString(exclude = {"toString에서 제외할 맴버변수"}}` 추가
- `@Accessors(chain = true)` setter chain pattern을 위한 설정
- `@EntityListeners(AuditingEntityListener.class)` created(updated)_by(date)에 default 설정을 위해 추가

### Cafe Entity
연관관계 설정을 위해 다음과 같이 Annotation과 변수 설정:
``` java
    // Cafe : CafeMenu = 1 : N
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "cafe")
    private List<CafeMenu> cafeMenuList;

    // Cafe : Review = 1 : N
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "cafe")
    private List<Review> reviewList;

    // Cafe : ScoreSet = 1 : 1
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "cafe")
    private ScoreSet scoreSet;
```
### CafeMenu Entity
```java
// CafeMenu : Cafe = N : 1
    @ManyToOne
    private Cafe cafe;
```
### Review Entity
```java
    // Review : Cafe = N : 1
    @ManyToOne
    private Cafe cafe;

    // Review : User = N : 1
    @ManyToOne
    private User user;
```
### ScoreSet Entity
```java
    @OneToOne
    private Cafe cafe;
```

### `@JsonIgnore` 이용

<p><img src="https://user-images.githubusercontent.com/41675375/79571445-2a682580-80f6-11ea-873a-7da5939331cc.png" width="1200" height="300"></p>

- 이렇게 계속해서 table끼리 join이 일어난 것을 json에 그대로 반영한다. (무한 loop같이)
- 이 때 `@JsonIgnore`를 이용하면 된다.
```java
    // Review : Cafe = N : 1
    @JsonIgnore
    @ManyToOne
    private Cafe cafe;

    // Review : User = N : 1
    @JsonIgnore
    @ManyToOne
    private User user;
```

## 🔖 3. thymeleaf에서 사용방법
- join을 사용하지 않고 했던 방법이랑 비슷하다.
- 위에서 바뀐 변수명 대로만 코드작성하면 된다.

```java
<li class="list-group-item" th:each="cafeMenu : *{cafeMenuList}">
```
원래 cafeMenus로 설정했었지만 cafeMenuList로 바뀐 네임을 그대로 사용하면 바로 적용된다.
