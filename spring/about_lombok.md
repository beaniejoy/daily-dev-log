# Lombok

## Setting
> **Maven**
```xml
<dependency>
  <groupId>org.projectlombok</groupId>
  <artifactId>lombok</artifactId>
  <version>1.18.12</version>
</dependency>
```
> **Gradle**
```gradle
implementation 'org.projectlombok:lombok:1.18.12'
```

## `@Getter` & `@Setter`

> - `@Getter` -> Class 변수를 기준으로 getter를 생성
> - `@Setter` -> Class 변수를 기준으로 setter를 생성
> - Class 변수가 아주 많아지는 경우에 효과적으로 사용


```java
public class Person() {

    private String name;

    private String address;
}
```
위와 같은 Class를 가정하고 setter/getter를 작성하면 아래와 같다:

```java
public class Person() {

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }     
}
```
<br>
위의 코드를 Annotation을 사용한다면 아주 간결하게 표현 가능:

```java
@Getter
@Setter
public class Person() {
    private String name;

    private String address;
}
```
<br>

원하는 변수에 대해서만 한정해서 getter/setter 지정하고 싶을 땐 변수에 직접 설정하면 된다:

```java
public class Person() {

    @Getter
    @Setter
    private String name;

    private String address;
}
```
이 때는 name에 대해서만 getter/setter가 적용된다.


## `@ToString`

> - `toString()`메서드를 overriding하고자 할 때 사용
> - `@ToString(exclude = {"[변수이름"})`을 통해 toString메서드에서 제외할 변수를 지정



## `@EqualsAndHashCode`

> - `equals`,`hashCode` overriding하고자 할 때 사용


## `@Data`

> - `@Getter`, `@Setter`, `@ToString`, `@EqualsAndHashCode`, 

## `@NoArgsConstructor` & `@AllArgsConstructor` & `@RequiredArgsConstructor`

> - 생성자 형태와 관련된 Lombok

## `@Builder`

> - Builder Pattern을 설정해주는 Lombok

