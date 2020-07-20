# Scheduling에 대한 프로젝트 적용

<br>

## Controller에 Scheduling 적용

```java
@Scheduled(cron = "0 30 16 20 2,5,7,11 *", zone = "Asia/Seoul")
public ResponseEntity<String> bulkUpdate() 
        throws JsonParseException, JsonMappingException, IOException {
    //...
}
```
- 주기적으로 자동 실행하고 싶은 메서드에 `@Scheduled` annotation을 적용
- 그 전에 Spring Boot Container에 Scheduling 기능을 사용하겠다고 알려야 한다.

```java
@SpringBootApplication
@EnableScheduling
public class QuantApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuantApplication.class, args);
	}

}
```
- `@EnableScheduling`를 설정함으로써 Container에게 알려준다.

