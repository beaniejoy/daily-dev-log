> - 200413 study log
> - spring-boot, IntelliJ  

## 🔖 1. Lombok을 통한 test 정결하게 진행하기

```java
@Entity
public class Person {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private int age;
}
```
```java
@SpringBootTest
class PersonRepositoryTests {

    @Autowired
    private PersonRepository personRepository;

    @Test
    void crud() {
        Person person = new Person();
        personRepository.save(person);
        System.out.println(personRepository.findAll());
    }
}
```
1. println에서 객체의 Hash값이 출력
2. Person에는 setter or parameter constructor 존재 X
3. 자동화된 Test X

위 세 가지 문제점 발생
```java
// Person.java
    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
```
- 1번 문제 해결

```java
@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Person {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private int age;

    private String hobby;

    private String bloodType;

    private String address;
    
    // 원래는 Date birthday를 이용 -> 7이후 LocalDate 이용
    private LocalDate birthday;
}
```
- 2번 문제 
- @Getter, @Setter, @ToString, @NoArgsConstructor, @AllArgsConstructor의 Lombok을 활용해 쉽게 해결
- 맴버변수가 더 추가된다해도 추가적인 수정사항 발생X

```java
    @Test
    void crud() {
        Person person = new Person();
        person.setName("Joy");
        person.setAge(20);

        personRepository.save(person);
        
        List<Person> people = personRepository.findAll();

        assertEquals(people.size(), 1);
        assertEquals(people.get(0).getName(), "Joy");
        assertEquals(people.get(0).getAge(), 20);
    }
```
- 3번 문제 해결
- 직접 콘솔에서 확인하지 않아도 일치여부에 따라 test통과 여부가 결정되기에 성공, 실패만 확인하면 된다.


```
// application.yml
spring:
  jpa:
    show-sql: true
```
```console
Hibernate: call next value for hibernate_sequence
Hibernate: insert into person (age, name, id) values (?, ?, ?)
Hibernate: select person0_.id as id1_0_, person0_.age as age2_0_, 
person0_.name as name3_0_ from person person0_

```
- show-sql: true 설정하면 test시 실행한 sql을 보여준다.

## 🔖 2. Lombok 추가 사항
```java
@ToString(exclude = "address")
```
```java
    @ToString.Exclude
    private String job;
```
- 이런 식으로 toString 메서드에서 제외하고 싶은 맴버 변수를 지정할 수 있다.
- 위에 class에서 exclude 지정하는 것보다 직접 제외하고픈 변수에 @ToString.Exclude를 지정하는 것이 좋다.

```java
@NoArgsConstructor
@AllArgsConstructor
```
- 위 두개의 생성자 방식 지정 가능

```java
@RequiredArgsConstructor
public class Person {
    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    private String name;

    @NonNull
    private int age;
}
```
- @RequiredArgsConstructor를 이용해 생성자에서 원하는 변수에 한정한 생성방식도 만들 수 있다.

```java
@EqualsAndHashCode
```
```java
    @Test
    void hashCodeAndEquals(){
        Person person1 = new Person("Joy",20);
        Person person2 = new Person("Joy",20);

        assertEquals(person1.equals(person2), true);

        Map<Person, Integer> map = new HashMap<>();
        map.put(person1, person1.getAge());

        System.out.println(map.get(person2));
    }
```
- @EqualsAndHashCode를 지정하면 hashCode, equals Overriding을 알아서 해준다.

```java
 * @see Getter
 * @see Setter
 * @see RequiredArgsConstructor
 * @see ToString
 * @see EqualsAndHashCode
 
 @Data
```
- @Data 는 위 5개의 Annotation을 모두 포괄
- 잘못된 side effect가 있을 수 있어서 사용하는데 주의


